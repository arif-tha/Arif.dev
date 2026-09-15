import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* Magnetic CTA - single deliberate hover moment */
function useMagnetic(ref, strength = 0.3) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      gsap.to(el, { x: x, y: y, duration: 0.4, ease: "power2.out" });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);
}

/* Thin scroll progress bar */
function ScrollProgress() {
  const bar = useRef(null);
  useEffect(() => {
    gsap.to(bar.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: true },
    });
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[9998] bg-white/10">
      <div ref={bar} className="h-full bg-[#5B8DEF] origin-left scale-x-0"></div>
    </div>
  );
}

/* Code lines shown inside the terminal card */
const CODE_LINES = [
  [{ t: "const ", c: "#7C8494" }, { t: "developer", c: "#E9EDF3" }, { t: " = {", c: "#7C8494" }],
  [{ t: "  name: ", c: "#7C8494" }, { t: "\"MD Arif\"", c: "#34D1C4" }, { t: ",", c: "#7C8494" }],
  [{ t: "  role: ", c: "#7C8494" }, { t: "\"Full-stack developer\"", c: "#34D1C4" }, { t: ",", c: "#7C8494" }],
  [{ t: "  stack: ", c: "#7C8494" }, { t: "[", c: "#7C8494" }, { t: "\"React\", \"Node\", \"Express\", \"MongoDB\"", c: "#34D1C4" }, { t: "],", c: "#7C8494" }],
  [{ t: "  focus: ", c: "#7C8494" }, { t: "\"clean APIs, thoughtful UI\"", c: "#34D1C4" }, { t: ",", c: "#7C8494" }],
  [{ t: "};", c: "#7C8494" }],
];

function TerminalCard(props) {
  const cardRef = props.cardRef;
  const lineRefs = props.lineRefs;
  return (
    <div ref={cardRef} className="relative rounded-xl border border-white/10 bg-[#10141d] shadow-2xl overflow-hidden will-change-transform">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></span>
        <span className="ml-3 text-[11px] text-white/30">profile.js</span>
      </div>
      <div className="px-5 sm:px-6 py-5 sm:py-6 font-mono text-[12px] sm:text-[14px] leading-[1.9]">
        {CODE_LINES.map((line, i) => (
          <div
            key={i}
            ref={(el) => { lineRefs.current[i] = el; }}
            className="whitespace-pre opacity-0"
          >
            {line.map((seg, j) => (
              <span key={j} style={{ color: seg.c }}>{seg.t}</span>
            ))}
          </div>
        ))}
        <span
          className="inline-block w-[7px] h-[15px] bg-[#5B8DEF] ml-1 align-middle"
          style={{ animation: "blink 1s step-end infinite" }}
        ></span>
      </div>
    </div>
  );
}

export default function Hero() {
  const wrapRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const badgeRef = useRef(null);
  const cardRef = useRef(null);
  const btnRef = useRef(null);
  const lineRefs = useRef([]);

  useMagnetic(btnRef, 0.3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(badgeRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });

      const split1 = new SplitText(line1Ref.current, { type: "chars" });
      tl.fromTo(
        split1.chars,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, duration: 0.8 },
        "-=0.2"
      );

      tl.fromTo(line2Ref.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.4");
      tl.fromTo(subRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.4");
      tl.fromTo(
        [ctaRef.current, statsRef.current],
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.7 },
        "-=0.4"
      );

      tl.fromTo(
        cardRef.current,
        { y: 24, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8 },
        "-=0.5"
      );
      tl.to(lineRefs.current, { opacity: 1, stagger: 0.18, duration: 0.3 }, "-=0.3");

      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(cardRef.current, { y: -p * 60 });
          gsap.set([line1Ref.current, line2Ref.current, subRef.current, ctaRef.current], {
            y: -p * 40,
            opacity: 1 - p * 1.4,
          });
        },
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <ScrollProgress />
      <section ref={wrapRef} className="relative w-full min-h-screen bg-[#0b0e14] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0b0e14]"></div>

        <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 min-h-screen flex items-center py-24">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-20 items-center w-full">
            <div>
              <div ref={badgeRef} className="flex items-center gap-2 mb-6 sm:mb-8">
                <span className="w-2 h-2 rounded-full bg-[#34D1C4]"></span>
                <span className="text-white/50 text-xs sm:text-sm">
                  Open to internships and freelance work
                </span>
              </div>

              <div className="overflow-hidden">
                <h1
                  ref={line1Ref}
                  className="text-[clamp(2.5rem,7vw,6.5rem)] font-bold leading-[0.95] tracking-tight text-white"
                >
                  MD Arif
                </h1>
              </div>

              <h2 ref={line2Ref} className="mt-2 text-[clamp(1.25rem,3vw,2.25rem)] font-medium text-white/60">
                Full-stack developer, BCA student
              </h2>

              <p ref={subRef} className="mt-6 text-white/50 text-sm sm:text-base max-w-md leading-relaxed">
                I build responsive web applications with the MERN stack, thoughtful interfaces,
                backend APIs, authentication, and features that ship.
              </p>

              <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-5">
                <div ref={btnRef} className="inline-block">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#5B8DEF] text-white text-sm font-medium hover:bg-[#4a7ce0] transition-colors"
                  >
                    View projects
                  </a>
                </div>
                <a
                  href="#contact"
                  className="text-white/50 hover:text-white text-sm font-medium underline underline-offset-4 decoration-white/20 hover:decoration-white/50 transition-colors"
                >
                  Get in touch
                </a>
              </div>

              <div ref={statsRef} className="mt-10 flex flex-wrap items-center gap-4 sm:gap-8">
                {[["3+", "Projects shipped"], ["MERN", "Primary stack"], ["APIs", "Auth and backend"]].map(
                  (item, i) => (
                    <div key={item[1]} className={i > 0 ? "pl-6 sm:pl-8 border-l border-white/10" : ""}>
                      <p className="text-white text-lg font-semibold">{item[0]}</p>
                      <p className="text-white/40 text-xs mt-0.5">{item[1]}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute -inset-10 rounded-full opacity-40 pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(91,141,239,0.18) 0%, transparent 70%)" }}
              ></div>
              <TerminalCard cardRef={cardRef} lineRefs={lineRefs} />
            </div>
          </div>
        </div>
      </section>

      <style>{"@keyframes blink { 50% { opacity: 0; } }"}</style>
    </>
  );
}