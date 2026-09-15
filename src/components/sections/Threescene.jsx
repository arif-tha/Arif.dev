import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * ThreeScene — lazy loaded, self-contained Three.js background
 * - 120 mixed geometric meshes (Icosahedron, Octahedron, Torus)
 * - Blue + cyan emissive glow via MeshStandardMaterial
 * - Two orbiting PointLights (blue + purple)
 * - Mouse parallax: camera shifts ±4deg following cursor
 * - Full cleanup on unmount (dispose geometry, material, renderer)
 * - Disabled on mobile (< 768px) to save performance
 */
export default function ThreeScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    // Skip on mobile
    if (window.innerWidth < 768) return

    const mount = mountRef.current
    if (!mount) return

    // ── Renderer ────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ── Scene + Camera ───────────────────────────────────────
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.z = 5

    // ── Lights ───────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.15))

    const blueLight   = new THREE.PointLight(0x3b82f6, 4, 20)
    const purpleLight = new THREE.PointLight(0x8b5cf6, 3, 18)
    blueLight.position.set(3, 3, 2)
    purpleLight.position.set(-3, -2, 2)
    scene.add(blueLight, purpleLight)

    // ── Meshes ───────────────────────────────────────────────
    const geometries = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TorusGeometry(0.6, 0.25, 8, 16),
    ]

    const colors   = [0x3b82f6, 0x06b6d4, 0x8b5cf6, 0x60a5fa]
    const meshList = []

    for (let i = 0; i < 120; i++) {
      const geo = geometries[i % 3].clone()
      const mat = new THREE.MeshStandardMaterial({
        color:     colors[i % colors.length],
        emissive:  colors[i % colors.length],
        emissiveIntensity: 0.25,
        wireframe: i % 4 === 0,
        transparent: true,
        opacity: 0.55 + Math.random() * 0.35,
        roughness: 0.6,
        metalness: 0.3,
      })
      const mesh = new THREE.Mesh(geo, mat)
      const s = 0.04 + Math.random() * 0.18
      mesh.scale.setScalar(s)
      mesh.position.set(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6 - 1,
      )
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
      // Store random drift speeds
      mesh.userData = {
        rotX: (Math.random() - 0.5) * 0.008,
        rotY: (Math.random() - 0.5) * 0.008,
        rotZ: (Math.random() - 0.5) * 0.005,
        driftX: (Math.random() - 0.5) * 0.001,
        driftY: (Math.random() - 0.5) * 0.001,
      }
      scene.add(mesh)
      meshList.push(mesh)
    }

    // ── Mouse parallax ───────────────────────────────────────
    const mouse = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    const onMouseMove = e => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Resize ───────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // ── Animation loop ───────────────────────────────────────
    let animId
    let lightAngle = 0

    const animate = () => {
      animId = requestAnimationFrame(animate)

      // Mesh drift + rotation
      meshList.forEach(m => {
        m.rotation.x += m.userData.rotX
        m.rotation.y += m.userData.rotY
        m.rotation.z += m.userData.rotZ
        m.position.x += m.userData.driftX
        m.position.y += m.userData.driftY
        // Wrap around
        if (Math.abs(m.position.x) > 8) m.userData.driftX *= -1
        if (Math.abs(m.position.y) > 6) m.userData.driftY *= -1
      })

      // Orbit lights
      lightAngle += 0.005
      blueLight.position.x   =  Math.sin(lightAngle) * 5
      blueLight.position.y   =  Math.cos(lightAngle) * 3
      purpleLight.position.x = -Math.sin(lightAngle) * 5
      purpleLight.position.y = -Math.cos(lightAngle) * 3

      // Smooth camera parallax
      target.x += (mouse.x * 0.07 - target.x) * 0.05
      target.y += (mouse.y * 0.04 - target.y) * 0.05
      camera.rotation.y = target.x
      camera.rotation.x = -target.y

      renderer.render(scene, camera)
    }
    animate()

    // ── Cleanup ──────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)

      meshList.forEach(m => {
        m.geometry.dispose()
        m.material.dispose()
      })
      geometries.forEach(g => g.dispose())
      renderer.dispose()

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />
}