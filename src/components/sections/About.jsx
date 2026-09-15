import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Manual char splitter util ───────────────────────────── */
function splitChars(el) {
  const text = el.innerText;
  el.innerHTML = "";
  el.style.display = "block";
  text.split("").forEach((ch) => {
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.style.willChange = "transform, opacity";
    span.innerHTML = ch === " " ? "&nbsp;" : ch;
    el.appendChild(span);
  });
  return el.querySelectorAll("span");
}

function splitWords(el) {
  const words = el.innerText.split(" ");
  el.innerHTML = "";
  return words.map((word, i) => {
    const wrap = document.createElement("span");
    wrap.style.cssText = "display:inline-block; overflow:hidden; vertical-align:bottom;";
    const inner = document.createElement("span");
    inner.style.cssText = "display:inline-block; will-change:transform,opacity;";
    inner.innerText = word;
    wrap.appendChild(inner);
    if (i < words.length - 1) {
      const space = document.createTextNode(" ");
      el.appendChild(wrap);
      el.appendChild(space);
    } else {
      el.appendChild(wrap);
    }
    return inner;
  });
}

/* ─── Pinned stat counter ──────────────────────────────────── */
function StatItem({ value, label, index }) {
  const numRef = useRef(null);
  useEffect(() => {
    const obj = { val: 0 };
    const target = parseFloat(value);
    ScrollTrigger.create({
      trigger: numRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: "power3.out",
          delay: index * 0.15,
          onUpdate() {
            if (numRef.current)
              numRef.current.innerText =
                Math.round(obj.val) + (value.includes("+") ? "+" : "");
          },
        });
      },
    });
  }, []);

  return (
    <div className="flex flex-col items-start">
      <span
        ref={numRef}
        className="text-2xl sm:text-4xl md:text-5xl font-black text-white font-['Space_Grotesk'] leading-none"
        style={{ letterSpacing: "-0.04em" }}
      >
        0
      </span>
      <span className="text-gray-500 text-[8px] sm:text-xs uppercase tracking-widest font-['Inter'] mt-1">
        {label}
      </span>
    </div>
  );
}

/* ─── Main About ───────────────────────────────────────────── */
export default function About() {
  const sectionRef  = useRef(null);
  const pinRef      = useRef(null);
  const imgWrapRef  = useRef(null);
  const imgRef      = useRef(null);
  const tagRef      = useRef(null);
  const head1Ref    = useRef(null);
  const head2Ref    = useRef(null);
  const paraRef     = useRef(null);
  const statsRef    = useRef(null);
  const dividerRef  = useRef(null);
  const glowRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── 1. TAG line char reveal ── */
      const tagChars = splitChars(tagRef.current);
      gsap.fromTo(tagChars,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.03,
          duration: 0.6,
          ease: "expo.out",
          scrollTrigger: { trigger: tagRef.current, start: "top 85%", once: true },
        }
      );

      /* ── 2. Heading 1 — word clip reveal ── */
      const h1Words = splitWords(head1Ref.current);
      gsap.fromTo(h1Words,
        { y: "110%", opacity: 0 },
        {
          y: "0%", opacity: 1,
          stagger: 0.06,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: head1Ref.current, start: "top 82%", once: true },
        }
      );

      /* ── 3. Heading 2 — char 3D rotate reveal ── */
      const h2Chars = splitChars(head2Ref.current);
      gsap.fromTo(h2Chars,
        { rotateX: -90, y: 60, opacity: 0, transformOrigin: "50% 0%" },
        {
          rotateX: 0, y: 0, opacity: 1,
          stagger: 0.025,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: { trigger: head2Ref.current, start: "top 82%", once: true },
        }
      );

      /* ── 4. Paragraph word-by-word ── */
      const paraWords = splitWords(paraRef.current);
      gsap.fromTo(paraWords,
        { y: "100%", opacity: 0 },
        {
          y: "0%", opacity: 1,
          stagger: 0.025,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: paraRef.current, start: "top 85%", once: true },
        }
      );

      /* ── 5. Image clip-path reveal (expensive feel) ── */
      gsap.fromTo(imgWrapRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: { trigger: imgWrapRef.current, start: "top 75%", once: true },
        }
      );

      /* ── 6. Image parallax on scroll ── */
      gsap.to(imgRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: imgWrapRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      /* ── 7. Image scale scrub ── */
      gsap.fromTo(imgRef.current,
        { scale: 1.25 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: imgWrapRef.current,
            start: "top 75%",
            end: "bottom 30%",
            scrub: 2,
          },
        }
      );

      /* ── 8. Glow orb parallax ── */
      gsap.to(glowRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      /* ── 9. Divider line draw ── */
      gsap.fromTo(dividerRef.current,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "expo.inOut",
          scrollTrigger: { trigger: dividerRef.current, start: "top 88%", once: true },
        }
      );

      /* ── 10. Stats stagger up ── */
      gsap.fromTo(statsRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 85%", once: true },
        }
      );

      /* ── 11. Ambient glow pulse ── */
      gsap.to(glowRef.current, {
        opacity: 0.5, scale: 1.1,
        duration: 4, ease: "sine.inOut",
        repeat: -1, yoyo: true,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#0a0a0a] py-16 sm:py-32 px-3 sm:px-4 md:px-6 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        ref={glowRef}
        className="absolute top-1/3 right-[-15%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full pointer-events-none opacity-30 will-change-transform"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.15) 50%, transparent 70%)" }}
      />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── eyebrow tag ── */}
        <div className="flex items-center gap-3 mb-12 sm:mb-16">
          <div className="h-px w-8 sm:w-10 bg-blue-500/70" />
          <span
            ref={tagRef}
            className="text-blue-400 text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-['Inter'] font-medium"
          >
            About Me
          </span>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-24 items-center">

          {/* LEFT — Image */}
          <div className="order-2 lg:order-1">
            <div
              ref={imgWrapRef}
              className="relative rounded-lg sm:rounded-2xl overflow-hidden will-change-transform"
              style={{ clipPath: "inset(100% 0% 0% 0%)", aspectRatio: "4/5" }}
            >
              {/* Placeholder gradient image — swap src for real photo */}
              <img
                ref={imgRef}
                src="https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?w=800&q=80"
                alt="MD Arif"
                className="w-full h-[120%] object-cover will-change-transform"
                style={{ scale: 1.25 }}
              />
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/20 to-transparent" />

              {/* Floating badge */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-white text-xs sm:text-sm font-medium font-['Inter']">Available for freelance projects</span>
                </div>
              </div>
            </div>

            {/* Corner accent lines */}
            <div className="absolute top-0 left-0 w-8 sm:w-12 h-8 sm:h-12 border-t-2 border-l-2 border-blue-500/40 rounded-tl-lg sm:rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 sm:w-12 h-8 sm:h-12 border-b-2 border-r-2 border-cyan-500/40 rounded-br-lg sm:rounded-br-2xl pointer-events-none" />
          </div>

          {/* RIGHT — Content */}
          <div className="order-1 lg:order-2 flex flex-col gap-6 sm:gap-8">

            {/* Headline */}
            <div>
              <div className="overflow-visible mb-1 sm:mb-2">
                <h2
                  ref={head1Ref}
                  className="text-[clamp(2rem,5vw,5rem)] font-black leading-none text-white font-['Space_Grotesk']"
                  style={{ letterSpacing: "-0.04em" }}
                >
                  Building practical
                </h2>
              </div>
              <div className="overflow-visible">
                <h2
                  ref={head2Ref}
                  className="text-[clamp(2rem,5vw,5rem)] font-black leading-none font-['Space_Grotesk']"
                  style={{
                    letterSpacing: "-0.04em",
                    background: "linear-gradient(90deg,#3b82f6,#06b6d4,#8b5cf6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  web solutions.
                </h2>
              </div>
            </div>

            {/* Divider */}
            <div
              ref={dividerRef}
              className="h-px w-full bg-gradient-to-r from-blue-500/50 via-cyan-500/30 to-transparent"
              style={{ transformOrigin: "left", scaleX: 0 }}
            />

            {/* Paragraph */}
            <div className="overflow-visible">
              <p
                ref={paraRef}
                className="text-gray-400 text-xs sm:text-base md:text-lg leading-relaxed font-['Inter']"
              >
                I’m MD Arif, a freelance full-stack web developer and BCA student focused on building responsive, modern, and production-ready websites and web applications. I turn business requirements into polished digital experiences using the MERN stack and modern web technologies.
              </p>
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT"].map((tag, i) => (
                <span
                  key={tag}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium border border-white/10 bg-white/5 text-gray-300 font-['Inter'] hover:border-blue-500/50 hover:text-white transition-all duration-300"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-white/5">
              {[
                { value: '3+', label: 'Projects' },
                { value: 'MERN', label: 'Core Stack' },
                { value: 'API', label: 'Backend Focus' },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3">
                  <p className="text-white text-sm sm:text-base font-semibold font-['Space_Grotesk']">{item.value}</p>
                  <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-[0.2em] mt-1">{item.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-white font-['Inter'] w-fit"
            >
              <span className="relative">
                Start a Project
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-500" />
              </span>
              <svg
                className="group-hover:translate-x-1 transition-transform duration-300 w-4 sm:w-4 h-4 sm:h-4"
                viewBox="0 0 16 16" fill="none"
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}