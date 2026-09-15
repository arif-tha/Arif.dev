import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Manual split ─────────────────────────────────────────── */
function splitWords(el) {
  const words = el.innerText.split(" ");
  el.innerHTML = "";
  return words.map((word, i) => {
    const wrap = document.createElement("span");
    wrap.style.cssText = "display:inline-block;overflow:hidden;vertical-align:bottom;";
    const inner = document.createElement("span");
    inner.style.cssText = "display:inline-block;will-change:transform,opacity;";
    inner.innerText = word;
    wrap.appendChild(inner);
    el.appendChild(wrap);
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    return inner;
  });
}

function splitChars(el) {
  const text = el.innerText;
  el.innerHTML = "";
  text.split("").forEach((ch) => {
    const s = document.createElement("span");
    s.style.cssText = "display:inline-block;will-change:transform,opacity;";
    s.innerHTML = ch === " " ? "&nbsp;" : ch;
    el.appendChild(s);
  });
  return el.querySelectorAll("span");
}

/* ─── Data ─────────────────────────────────────────────────── */
const EXPERIENCES = [
  {
    id: "01",
    role: "Full-Stack Developer",
    company: "Turf Booking Web Application",
    period: "Client Project",
    type: "Full Stack",
    color: "#3b82f6",
    logo: "▲",
    highlights: [
      "Built a complete turf booking platform with user authentication, listing pages, slot availability, and booking flows.",
      "Developed backend REST APIs and connected the application to MongoDB for booking, admin, and user data management.",
      "Implemented payment integration and worked across both the public-facing interface and admin-side operations.",
      "Delivered a responsive experience with secure authentication and a practical booking workflow.",
    ],
    tech: ["React.js", "Vite", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT", "Razorpay"],
  },
  {
    id: "02",
    role: "Frontend Developer / Full-Stack Web Developer",
    company: "The Crescent School Website",
    period: "Client Project",
    type: "Website",
    color: "#06b6d4",
    logo: "◈",
    highlights: [
      "Built a premium, modern school website with sections for academics, facilities, activities, admissions, and contact information.",
      "Focused on a professional, parent-friendly experience with smooth navigation and polished visual presentation.",
      "Used React and animation libraries to create a refined, interactive user experience.",
      "Delivered a responsive site designed to communicate trust, professionalism, and modern education.",
    ],
    tech: ["React.js", "Tailwind CSS", "GSAP", "React Router", "JavaScript"],
  },
  {
    id: "03",
    role: "Full-Stack / Web Developer",
    company: "Cafe Menu Web App",
    period: "Business Project",
    type: "Web App",
    color: "#8b5cf6",
    logo: "◎",
    highlights: [
      "Created a digital cafe menu experience designed to present food and beverage items clearly and attractively.",
      "Focused on a mobile-friendly layout with easy navigation, category structure, pricing visibility, and polished product presentation.",
      "Built the experience around clarity and usability for customers browsing a cafe menu online.",
    ],
    tech: ["React.js", "Tailwind CSS", "JavaScript"],
  },
];

/* ─── Single experience item ────────────────────────────────── */
function ExpItem({ exp, index, isLast }) {
  const itemRef    = useRef(null);
  const lineRef    = useRef(null);
  const dotRef     = useRef(null);
  const roleRef    = useRef(null);
  const listRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Item slide in */
      gsap.fromTo(itemRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: itemRef.current, start: "top 82%", once: true },
        }
      );

      /* Role word reveal */
      const roleWords = splitWords(roleRef.current);
      gsap.fromTo(roleWords,
        { y: "110%", opacity: 0 },
        {
          y: "0%", opacity: 1,
          stagger: 0.06, duration: 0.9, ease: "expo.out",
          scrollTrigger: { trigger: roleRef.current, start: "top 82%", once: true },
        }
      );

      /* Timeline line draw */
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            duration: 1.2,
            ease: "expo.inOut",
            scrollTrigger: { trigger: itemRef.current, start: "top 80%", once: true },
          }
        );
      }

      /* Dot pop */
      gsap.fromTo(dotRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 0.5,
          ease: "back.out(2)",
          scrollTrigger: { trigger: dotRef.current, start: "top 85%", once: true },
        }
      );

      /* List items stagger */
      const items = listRef.current?.querySelectorAll("li");
      if (items) {
        gsap.fromTo(items,
          { x: -20, opacity: 0 },
          {
            x: 0, opacity: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: listRef.current, start: "top 82%", once: true },
          }
        );
      }

    }, itemRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={itemRef} className="relative grid grid-cols-[30px_1fr] sm:grid-cols-[40px_1fr] md:grid-cols-[60px_1fr] gap-3 sm:gap-6 md:gap-10" style={{ opacity: 0 }}>

      {/* Timeline column */}
      <div className="flex flex-col items-center pt-1">
        {/* Dot */}
        <div
          ref={dotRef}
          className="relative flex-shrink-0 w-3 sm:w-4 h-3 sm:h-4 rounded-full border-2 z-10 will-change-transform"
          style={{ borderColor: exp.color, background: "#0a0a0a", boxShadow: `0 0 12px ${exp.color}60` }}
        >
          <div className="absolute inset-[3px] rounded-full" style={{ background: exp.color }} />
        </div>

        {/* Line */}
        {!isLast && (
          <div
            ref={lineRef}
            className="flex-1 w-px mt-2 sm:mt-3 will-change-transform"
            style={{
              background: `linear-gradient(to bottom, ${exp.color}60, transparent)`,
              minHeight: "80px",
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-12 sm:pb-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex-1">
            {/* Company + logo */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 flex-wrap">
              <span className="text-base sm:text-lg" style={{ color: exp.color }}>{exp.logo}</span>
              <span
                className="text-xs sm:text-sm font-semibold font-['Space_Grotesk']"
                style={{ color: exp.color }}
              >
                {exp.company}
              </span>
              <span
                className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-['Inter'] font-medium"
                style={{ background: `${exp.color}18`, color: exp.color, border: `1px solid ${exp.color}30` }}
              >
                {exp.type}
              </span>
            </div>

            {/* Role */}
            <div className="overflow-visible">
              <h3
                ref={roleRef}
                className="text-base sm:text-xl md:text-2xl font-bold text-white font-['Space_Grotesk']"
                style={{ letterSpacing: "-0.02em" }}
              >
                {exp.role}
              </h3>
            </div>
          </div>

          {/* Period */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="h-px w-4 bg-white/20" />
            <span className="text-gray-500 text-[10px] sm:text-xs font-['Inter'] tabular-nums whitespace-nowrap">
              {exp.period}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-4 sm:mb-6"
          style={{ background: `linear-gradient(90deg, ${exp.color}30, transparent)` }}
        />

        {/* Highlights */}
        <ul ref={listRef} className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          {exp.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 sm:gap-3 group">
              <span
                className="mt-1 flex-shrink-0 w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: exp.color }}
              />
              <span className="text-gray-400 text-xs sm:text-sm leading-relaxed font-['Inter'] group-hover:text-gray-200 transition-colors duration-300">
                {h}
              </span>
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {exp.tech.map((t) => (
            <span
              key={t}
              className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-[9px] sm:text-[11px] font-medium font-['Inter'] bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Experience ───────────────────────────────────────── */
export default function Experience() {
  const sectionRef = useRef(null);
  const tagRef     = useRef(null);
  const headRef    = useRef(null);
  const subRef     = useRef(null);
  const glowRef    = useRef(null);
  const yearsRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Tag chars */
      const tagChars = splitChars(tagRef.current);
      gsap.fromTo(tagChars,
        { y: 16, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.03, duration: 0.5, ease: "expo.out",
          scrollTrigger: { trigger: tagRef.current, start: "top 88%", once: true },
        }
      );

      /* Heading words */
      const headWords = splitWords(headRef.current);
      gsap.fromTo(headWords,
        { y: "110%", opacity: 0 },
        {
          y: "0%", opacity: 1, stagger: 0.08, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: headRef.current, start: "top 85%", once: true },
        }
      );

      /* Sub words */
      const subWords = splitWords(subRef.current);
      gsap.fromTo(subWords,
        { y: "100%", opacity: 0 },
        {
          y: "0%", opacity: 1, stagger: 0.025, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: subRef.current, start: "top 88%", once: true },
        }
      );

      /* Years counter */
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: yearsRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: 5,
            duration: 1.8,
            ease: "power3.out",
            onUpdate() {
              if (yearsRef.current)
                yearsRef.current.innerText = Math.round(obj.val) + "+";
            },
          });
        },
      });

      /* Glow parallax + pulse */
      gsap.to(glowRef.current, {
        y: -80, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", end: "bottom top",
          scrub: 2,
        },
      });
      gsap.to(glowRef.current, {
        opacity: 0.3, scale: 1.1,
        duration: 4, ease: "sine.inOut",
        repeat: -1, yoyo: true,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-[#0a0a0a] py-16 sm:py-32 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        ref={glowRef}
        className="absolute top-1/3 right-[-20%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full blur-[100px] sm:blur-[130px] opacity-15 pointer-events-none will-change-transform"
        style={{ background: "radial-gradient(circle,#06b6d4 0%,#3b82f6 50%,transparent 70%)" }}
      />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-6 md:px-12">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <div className="h-px w-8 sm:w-10 bg-blue-500/70" />
          <span ref={tagRef} className="text-blue-400 text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-['Inter'] font-medium">
            Project Experience
          </span>
        </div>

        {/* Heading + stats */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 sm:gap-8 mb-12 sm:mb-20">
          <div className="overflow-visible">
            <h2
              ref={headRef}
              className="text-[clamp(2rem,6vw,6.5rem)] font-black leading-none text-white font-['Space_Grotesk']"
              style={{ letterSpacing: "-0.04em" }}
            >
              Selected Experience
            </h2>
          </div>

          {/* Side stat */}
          <div className="flex-shrink-0 text-right">
            <div
              ref={yearsRef}
              className="text-3xl sm:text-5xl font-black text-white font-['Space_Grotesk'] leading-none"
              style={{
                letterSpacing: "-0.04em",
                background: "linear-gradient(135deg,#3b82f6,#06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              0
            </div>
            <p className="text-gray-600 text-[10px] sm:text-xs uppercase tracking-widest font-['Inter'] mt-1">
              Projects Shipped
            </p>
          </div>
        </div>

        {/* Sub */}
        <div className="overflow-visible mb-12 sm:mb-16">
          <p ref={subRef} className="text-gray-500 text-xs sm:text-sm leading-relaxed font-['Inter'] max-w-lg">
            A practical view of the web projects I’ve built across booking systems, education websites, and business-focused digital experiences.
          </p>
        </div>

        {/* Timeline */}
        <div>
          {EXPERIENCES.map((exp, i) => (
            <ExpItem
              key={exp.id}
              exp={exp}
              index={i}
              isLast={i === EXPERIENCES.length - 1}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-4 ml-[46px] sm:ml-[86px]">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] hover:border-blue-500/50 hover:bg-white/[0.06] transition-all duration-300"
          >
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-300 font-['Inter']">
              Let’s connect
            </span>
            <svg className="group-hover:translate-x-1 transition-transform duration-300" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v8M3 7l4 4 4-4" stroke="#3b82f6" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}