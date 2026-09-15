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
const MARQUEE_TECHS = [
  "React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS",
  "JWT", "GitHub", "Vercel", "Render", "Postman", "Razorpay",
];

const SKILL_CARDS = [
  {
    title: "Frontend",
    icon: "⬡",
    color: "#3b82f6",
    skills: [
      "React.js", "Vite", "Tailwind CSS", "Responsive UI",
    ],
  },
  {
    title: "Backend",
    icon: "⬢",
    color: "#06b6d4",
    skills: [
      "Node.js", "Express.js", "REST APIs", "JWT Authentication",
    ],
  },
  {
    title: "Database & Auth",
    icon: "◈",
    color: "#8b5cf6",
    skills: [
      "MongoDB", "Mongoose", "bcrypt", "Authentication & Authorization",
    ],
  },
  {
    title: "Tools & Platforms",
    icon: "◎",
    color: "#f59e0b",
    skills: [
      "Git", "GitHub", "Postman", "Vercel", "Render",
    ],
  },
  {
    title: "Project Delivery",
    icon: "◇",
    color: "#ec4899",
    skills: [
      "Razorpay", "API Integration",
    ],
  },
];

/* ─── Tilt card with 3D mouse tracking ─────────────────────── */
function SkillCard({ card, index }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  /* 3D tilt on mouse */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const onMove = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - left) / width  - 0.5;
      const y = (e.clientY - top)  / height - 0.5;
      gsap.to(el, {
        rotateY: x * 14,
        rotateX: -y * 14,
        transformPerspective: 800,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(glowRef.current, {
        x: x * 40,
        y: y * 40,
        opacity: 0.6,
        duration: 0.4,
      });
    };
    const onLeave = () => {
      gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "elastic.out(1,0.6)" });
      gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* Card entrance */
  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { y: 80, opacity: 0, rotateX: -12 },
      {
        y: 0, opacity: 1, rotateX: 0,
        duration: 1,
        ease: "expo.out",
        delay: index * 0.1,
        scrollTrigger: { trigger: cardRef.current, start: "top 85%", once: true },
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden will-change-transform cursor-default"
      style={{ transformStyle: "preserve-3d", opacity: 0 }}
    >
      {/* Moving glow */}
      <div
        ref={glowRef}
        className="absolute w-32 sm:w-40 h-32 sm:h-40 rounded-full blur-2xl sm:blur-3xl pointer-events-none opacity-0 will-change-transform"
        style={{ background: card.color, top: "20%", left: "20%" }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-4 sm:left-6 right-4 sm:right-6 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${card.color}80, transparent)` }} />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-xl sm:text-2xl" style={{ color: card.color }}>{card.icon}</span>
          <h3 className="text-white font-bold text-sm sm:text-lg font-['Space_Grotesk']"
            style={{ letterSpacing: "-0.02em" }}>
            {card.title}
          </h3>
        </div>
        <span
          className="text-[8px] sm:text-[10px] uppercase tracking-widest font-['Inter'] font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full"
          style={{ color: card.color, background: `${card.color}18`, border: `1px solid ${card.color}30` }}
        >
          Dev
        </span>
      </div>

      {/* Technology cards */}
      <div className="flex flex-wrap gap-2">
        {card.skills.map((skill) => (
          <span key={skill} className="px-2.5 py-1.5 rounded-md border border-white/10 bg-white/[0.04] text-gray-300 text-[10px] sm:text-xs font-['Inter']">
            {skill}
          </span>
        ))}
      </div>

      {/* Corner glow */}
      <div className="absolute bottom-0 right-0 w-16 sm:w-20 h-16 sm:h-20 rounded-tl-full opacity-10 pointer-events-none"
        style={{ background: card.color }} />
    </div>
  );
}

/* ─── Infinite marquee row ──────────────────────────────────── */
function Marquee({ reverse = false }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const totalW = track.scrollWidth / 2;
    gsap.to(track, {
      x: reverse ? totalW : -totalW,
      duration: 28,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => {
          const val = parseFloat(x);
          if (!reverse && val <= -totalW) return "0px";
          if (reverse  && val >= 0)       return `${-totalW}px`;
          return `${val}px`;
        },
      },
    });
  }, []);

  const items = [...MARQUEE_TECHS, ...MARQUEE_TECHS];

  return (
    <div className="overflow-hidden" style={{ contain: "paint" }}>
      <div
        ref={trackRef}
        className="flex gap-2 sm:gap-4 will-change-transform"
        style={{ width: "max-content" }}
      >
        {items.map((tech, i) => (
          <div
            key={i}
            className="flex-shrink-0 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full border border-white/8 bg-white/[0.03] backdrop-blur-sm"
          >
            <span className="text-gray-400 text-xs sm:text-sm font-medium font-['Inter'] whitespace-nowrap">
              {tech}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Skills ───────────────────────────────────────────── */
export default function Skills() {
  const sectionRef = useRef(null);
  const tagRef     = useRef(null);
  const headRef    = useRef(null);
  const subRef     = useRef(null);
  const glowRef    = useRef(null);

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

      /* Glow parallax */
      gsap.to(glowRef.current, {
        y: -100, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", end: "bottom top",
          scrub: 2,
        },
      });

      /* Glow pulse */
      gsap.to(glowRef.current, {
        opacity: 0.25, scale: 1.15,
        duration: 4, ease: "sine.inOut",
        repeat: -1, yoyo: true,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative bg-[#0a0a0a] py-16 sm:py-32 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        ref={glowRef}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full blur-[100px] sm:blur-[140px] opacity-15 pointer-events-none will-change-transform"
        style={{ background: "radial-gradient(circle,#3b82f6 0%,#8b5cf6 50%,transparent 70%)" }}
      />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 md:px-12">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <div className="h-px w-8 sm:w-10 bg-blue-500/70" />
          <span ref={tagRef} className="text-blue-400 text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-['Inter'] font-medium">
            Services & Tech Stack
          </span>
        </div>

        {/* Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 mb-12 sm:mb-20">
          <div className="overflow-visible">
            <h2
              ref={headRef}
              className="text-[clamp(2rem,6vw,7rem)] font-black leading-none text-white font-['Space_Grotesk']"
              style={{ letterSpacing: "-0.04em" }}
            >
              My Expertise
            </h2>
          </div>
          <div className="lg:max-w-xs overflow-visible">
            <p ref={subRef} className="text-gray-500 text-xs sm:text-sm leading-relaxed font-['Inter']">
              Clear, practical capabilities for businesses that need a polished website or a focused web application.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 md:px-12 mb-12 sm:mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {[
            ["Business Websites", "Professional, responsive websites designed to build trust and generate enquiries."],
            ["Booking & Reservation Systems", "Practical booking flows with availability, accounts, and admin controls."],
            ["Digital Menu Websites", "Mobile-friendly menus that make categories, pricing, and items easy to browse."],
            ["Admin Dashboards", "Focused dashboards for managing content, bookings, users, and business operations."],
            ["Custom Web Applications", "Purpose-built web apps shaped around your workflow and requirements."],
          ].map(([title, description]) => (
            <div key={title} className="border-l border-blue-500/40 pl-3 sm:pl-4">
              <h3 className="text-white text-sm font-semibold font-['Space_Grotesk']">{title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed mt-2 font-['Inter']">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Marquee rows ── */}
      <div className="space-y-2 sm:space-y-3 mb-12 sm:mb-20 px-3 sm:px-6">
        <Marquee />
        <Marquee reverse />
      </div>

      {/* ── Skill Cards grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
          {SKILL_CARDS.map((card, i) => (
            <SkillCard key={card.title} card={card} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/5" />
          <a
            href="https://github.com/mdarif"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-xs sm:text-sm text-gray-500 hover:text-white transition-colors duration-300 font-['Inter'] whitespace-nowrap"
          >
            <span>See my code on GitHub</span>
            <svg className="group-hover:translate-x-1 transition-transform duration-300" width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </a>
          <div className="h-px flex-1 bg-white/5" />
        </div>
      </div>
    </section>
  );
}