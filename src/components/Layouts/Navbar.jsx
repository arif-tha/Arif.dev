import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { label: "About",      href: "#about" },
  { label: "Services",   href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
];

/* ─── Magnetic nav link ─────────────────────────────────────── */
function MagLink({ label, href, active, onClick }) {
  const ref     = useRef(null);
  const textRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const el   = ref.current;
    const text = textRef.current;
    if (!el) return;

    const onMove = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - left - width  / 2) * 0.3;
      const y = (e.clientY - top  - height / 2) * 0.3;
      gsap.to(el,   { x, y, duration: 0.35, ease: "power2.out" });
      gsap.to(text, { x: x * 0.5, y: y * 0.5, duration: 0.35, ease: "power2.out" });
      gsap.to(glowRef.current, { opacity: 1, duration: 0.2 });
    };
    const onLeave = () => {
      gsap.to([el, text], { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
      gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      className="relative flex items-center justify-center px-4 py-2 rounded-lg will-change-transform group"
    >
      {/* Hover bg glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-lg opacity-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at center,rgba(59,130,246,0.12),transparent 70%)" }}
      />

      {/* Active indicator dot */}
      {active && (
        <span
          className="absolute top-1 right-1 w-1 h-1 rounded-full bg-blue-400"
          style={{ boxShadow: "0 0 6px #3b82f6" }}
        />
      )}

      <span
        ref={textRef}
        className={`relative text-sm font-medium font-['Inter'] will-change-transform transition-colors duration-300 ${
          active ? "text-white" : "text-gray-500 group-hover:text-white"
        }`}
      >
        {label}
      </span>
    </a>
  );
}

/* ─── Main Navbar ───────────────────────────────────────────── */
export default function Navbar() {
  const navRef      = useRef(null);
  const pillRef     = useRef(null);
  const logoRef     = useRef(null);
  const ctaRef      = useRef(null);
  const [active, setActive]   = useState("");
  const [menuOpen, setMenu]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  /* ── Intro animation ── */
  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.6 });
    tl.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "expo.out" }
    );
    tl.fromTo(logoRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, ease: "expo.out" },
      "-=0.6"
    );
    tl.fromTo(pillRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" },
      "-=0.4"
    );
    tl.fromTo(ctaRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.6, ease: "expo.out" },
      "-=0.4"
    );
  }, []);

  /* ── Scroll hide/show + background blur ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const going_down = y > lastY.current && y > 100;
      gsap.to(navRef.current, {
        y: going_down ? -100 : 0,
        duration: 0.5,
        ease: "power3.out",
      });
      setScrolled(y > 40);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section tracker ── */
  useEffect(() => {
    const observers = LINKS.map(({ href }) => {
      const id  = href.replace("#", "");
      const el  = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(href); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  /* ── Mobile menu animation ── */
  const menuRef   = useRef(null);
  const overlayRef= useRef(null);

  useEffect(() => {
    if (!menuRef.current) return;
    if (menuOpen) {
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(menuRef.current,
        { y: -20, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 0.5, ease: "expo.out" }
      );
      const items = menuRef.current.querySelectorAll("a");
      gsap.fromTo(items,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.06, duration: 0.4, ease: "expo.out", delay: 0.1 }
      );
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
      gsap.to(menuRef.current,
        { y: -10, opacity: 0, clipPath: "inset(0 0 100% 0)", duration: 0.35, ease: "power3.in" }
      );
    }
  }, [menuOpen]);

  /* ─── Hamburger icon ── */
  const bar1 = useRef(null);
  const bar2 = useRef(null);
  const bar3 = useRef(null);

  useEffect(() => {
    if (menuOpen) {
      gsap.to(bar1.current, { rotate: 45,  y:  6, duration: 0.35, ease: "power3.out" });
      gsap.to(bar2.current, { opacity: 0,  x: 10, duration: 0.2 });
      gsap.to(bar3.current, { rotate: -45, y: -6, duration: 0.35, ease: "power3.out" });
    } else {
      gsap.to([bar1.current, bar3.current], { rotate: 0, y: 0, duration: 0.35, ease: "elastic.out(1,0.6)" });
      gsap.to(bar2.current, { opacity: 1, x: 0, duration: 0.3, delay: 0.1 });
    }
  }, [menuOpen]);

  return (
    <>
      {/* ── Navbar ── */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[900] will-change-transform"
        style={{ opacity: 0 }}
      >
        <div
          className="mx-2 sm:mx-4 md:mx-8 mt-2 sm:mt-4 rounded-xl sm:rounded-2xl transition-all duration-500"
          style={{
            background: scrolled
              ? "rgba(10,10,10,0.85)"
              : "rgba(10,10,10,0.4)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.04)",
            boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.4)" : "none",
          }}
        >
          <div className="flex items-center justify-between px-3 sm:px-5 py-2 sm:py-3">

            {/* Logo */}
            <a
              ref={logoRef}
              href="#"
              className="flex items-center gap-2.5 group"
              style={{ opacity: 0 }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white font-['Space_Grotesk'] transition-all duration-300 group-hover:scale-110"
                style={{ background: "linear-gradient(135deg,#3b82f6,#06b6d4)" }}
              >
                A
              </div>
              <span
                className="text-white font-bold text-sm font-['Space_Grotesk'] hidden sm:block"
                style={{ letterSpacing: "-0.02em" }}
              >
                MD Arif
              </span>
            </a>

            {/* Desktop pill nav */}
            <div
              ref={pillRef}
              className="hidden md:flex items-center gap-1"
              style={{ opacity: 0 }}
            >
              {LINKS.map((link) => (
                <MagLink
                  key={link.href}
                  {...link}
                  active={active === link.href}
                  onClick={() => setActive(link.href)}
                />
              ))}
            </div>

            {/* CTA + hamburger */}
            <div
              ref={ctaRef}
              className="flex items-center gap-3"
              style={{ opacity: 0 }}
            >
              {/* Desktop CTA */}
              <a
                href="#contact"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white font-['Inter'] transition-all duration-300 hover:opacity-90 active:scale-95"
                style={{ background: "linear-gradient(135deg,#3b82f6,#06b6d4)" }}
              >
                Start a Project
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 9L9 1M9 1H3M9 1V7" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </a>

              {/* Mobile hamburger */}
              <button
                className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px]"
                onClick={() => setMenu((v) => !v)}
                aria-label="Toggle menu"
              >
                <div ref={bar1} className="w-5 h-[1.5px] bg-white rounded-full will-change-transform" />
                <div ref={bar2} className="w-5 h-[1.5px] bg-white rounded-full will-change-transform" />
                <div ref={bar3} className="w-5 h-[1.5px] bg-white rounded-full will-change-transform" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile overlay ── */}
      <div
        ref={overlayRef}
        onClick={() => setMenu(false)}
        className="fixed inset-0 z-[850] bg-black/60 backdrop-blur-sm md:hidden pointer-events-none"
        style={{ opacity: 0, pointerEvents: menuOpen ? "auto" : "none" }}
      />

      {/* ── Mobile menu ── */}
      <div
        ref={menuRef}
        className="fixed top-20 left-4 right-4 z-[870] rounded-2xl overflow-hidden md:hidden"
        style={{
          background: "rgba(10,10,10,0.95)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)",
          opacity: 0,
          clipPath: "inset(0 0 100% 0)",
        }}
      >
        <div className="p-4 space-y-1">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => { setMenu(false); setActive(link.href); }}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                active === link.href
                  ? "bg-blue-500/10 text-white border border-blue-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-sm font-medium font-['Inter']">{link.label}</span>
              {active === link.href && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" style={{ boxShadow: "0 0 6px #3b82f6" }} />
              )}
            </a>
          ))}

          {/* Mobile CTA */}
          <div className="pt-3 pb-1">
            <a
              href="#contact"
              onClick={() => setMenu(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white font-['Inter']"
              style={{ background: "linear-gradient(135deg,#3b82f6,#06b6d4)" }}
            >
              Start a Project
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}