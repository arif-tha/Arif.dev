import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Manual split utils ───────────────────────────────────── */
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

/* ─── Project data ─────────────────────────────────────────── */
const PROJECTS = [
  {
    id: "01",
    title: "Turf Booking Web Application",
    category: "Booking Platform · Full Stack",
    tech: ["React.js", "Vite", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT", "Razorpay"],
    desc: "A client-oriented booking platform with user access, turf listings, availability management, booking flows, and an admin dashboard.",
    liveUrl: "https://turfxo.vercel.app",
    color: "#3b82f6",
    accent: "#06b6d4",
    img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&q=80",
  },
  {
    id: "02",
    title: "The Crescent School Website",
    category: "Education Website",
    tech: ["React.js", "Tailwind CSS", "GSAP", "React Router", "JavaScript"],
    desc: "A modern school website designed to communicate academics, facilities, activities, admissions, and contact information with confidence and clarity.",
    liveUrl: "https://crest-school.vercel.app",
    color: "#8b5cf6",
    accent: "#a78bfa",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80",
  },
  {
    id: "03",
    title: "Cafe Menu Web App",
    category: "Digital Menu · Web App",
    tech: ["React.js", "Tailwind CSS", "JavaScript"],
    desc: "A digital cafe menu experience built for clean browsing, clear categories, item details, pricing, and responsive presentation.",
    liveUrl: "https://arif-cafe-menu-jy57.vercel.app",
    color: "#06b6d4",
    accent: "#22d3ee",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80",
  },
];

/* ─── Single project card ──────────────────────────────────── */
function ProjectCard({ project, index }) {
  const cardRef   = useRef(null);
  const imgRef    = useRef(null);
  const overlayRef= useRef(null);
  const numRef    = useRef(null);
  const titleRef  = useRef(null);

  /* Hover — image scale + overlay */
  useEffect(() => {
    const card = cardRef.current;
    const img  = imgRef.current;
    const ov   = overlayRef.current;
    if (!card) return;

    const onEnter = () => {
      gsap.to(img, { scale: 1.08, duration: 0.7, ease: "power2.out" });
      gsap.to(ov,  { opacity: 0.55, duration: 0.5 });
    };
    const onLeave = () => {
      gsap.to(img, { scale: 1, duration: 0.9, ease: "power2.out" });
      gsap.to(ov,  { opacity: 0.7, duration: 0.5 });
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative flex-shrink-0 w-[90vw] xs:w-[80vw] sm:w-[70vw] md:w-[60vw] lg:w-[55vw] xl:w-[48vw] h-[65vh] sm:h-[75vh] rounded-lg sm:rounded-2xl overflow-hidden cursor-pointer group"
      style={{ marginRight: "3vw" }}
    >
      {/* Background image */}
      <img
        ref={imgRef}
        src={project.img}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        style={{ scale: 1 }}
      />

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 opacity-70"
        style={{ background: `linear-gradient(135deg, #0a0a0a 0%, ${project.color}22 100%)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />

      {/* Accent border glow on hover */}
      <div
        className="absolute inset-0 rounded-lg sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${project.color}60` }}
      />

      {/* Content */}
      <div className="absolute inset-0 p-4 sm:p-8 md:p-10 flex flex-col justify-between">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <span
            className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[10px] uppercase tracking-widest font-medium font-['Inter'] border"
            style={{ color: project.color, borderColor: `${project.color}40`, background: `${project.color}15` }}
          >
            {project.category}
          </span>
          <span
            ref={numRef}
            className="text-4xl sm:text-7xl font-black leading-none font-['Space_Grotesk'] opacity-10 select-none"
            style={{ color: project.color, letterSpacing: "-0.05em" }}
          >
            {project.id}
          </span>
        </div>

        {/* Bottom content */}
        <div>
          <h3
            ref={titleRef}
            className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-2 sm:mb-4 font-['Space_Grotesk'] leading-none"
            style={{ letterSpacing: "-0.03em" }}
          >
            {project.title}
          </h3>

          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 font-['Inter'] max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0" style={{ transition: "opacity 0.4s ease, transform 0.4s ease" }}>
            {project.desc}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[8px] sm:text-[10px] font-medium bg-white/10 text-white/70 font-['Inter'] backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-full text-[10px] sm:text-xs font-semibold text-white font-['Inter'] transition-all duration-300"
              style={{ background: project.color }}
            >
              View Project
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Projects ────────────────────────────────────────── */
export default function Projects() {
  const sectionRef  = useRef(null);
  const pinRef      = useRef(null);
  const trackRef    = useRef(null);
  const headRef     = useRef(null);
  const subRef      = useRef(null);
  const tagRef      = useRef(null);
  const progressRef = useRef(null);
  const countRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── 1. Tag char reveal ── */
      const tagChars = splitChars(tagRef.current);
      gsap.fromTo(tagChars,
        { y: 16, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.03, duration: 0.5, ease: "expo.out",
          scrollTrigger: { trigger: tagRef.current, start: "top 88%", once: true },
        }
      );

      /* ── 2. Heading word reveal ── */
      const headWords = splitWords(headRef.current);
      gsap.fromTo(headWords,
        { y: "110%", opacity: 0 },
        {
          y: "0%", opacity: 1, stagger: 0.07, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: headRef.current, start: "top 85%", once: true },
        }
      );

      /* ── 3. Sub word reveal ── */
      const subWords = splitWords(subRef.current);
      gsap.fromTo(subWords,
        { y: "100%", opacity: 0 },
        {
          y: "0%", opacity: 1, stagger: 0.03, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: subRef.current, start: "top 88%", once: true },
        }
      );

      /* ── 4. Horizontal scroll ── */
      const track   = trackRef.current;
      const totalW  = track.scrollWidth - window.innerWidth;

      const hScroll = gsap.to(track, {
        x: -totalW,
        ease: "none",
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: () => `+=${totalW + window.innerWidth * 0.5}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          onUpdate(self) {
            /* progress bar */
            if (progressRef.current)
              gsap.set(progressRef.current, { scaleX: self.progress });

            /* active card counter */
            const active = Math.min(
              Math.ceil(self.progress * PROJECTS.length),
              PROJECTS.length
            );
            if (countRef.current)
              countRef.current.innerText = `${String(active).padStart(2, "0")} / ${String(PROJECTS.length).padStart(2, "0")}`;
          },
        },
      });

      /* ── 5. Cards stagger entrance (on first load of pin area) ── */
      const cards = track.querySelectorAll(".project-card-wrap");
      gsap.fromTo(cards,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: pinRef.current, start: "top 80%", once: true },
        }
      );

      /* ── 6. Parallax card numbers on scroll ── */
      cards.forEach((card) => {
        const num = card.querySelector(".card-num");
        if (!num) return;
        gsap.to(num, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: hScroll,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative bg-[#0a0a0a]">

      {/* ── Header (scrolls normally above pinned area) ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-16 sm:pt-32 pb-10 sm:pb-20">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <div className="h-px w-8 sm:w-10 bg-blue-500/70" />
          <span
            ref={tagRef}
            className="text-blue-400 text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-['Inter'] font-medium"
          >
            Selected Work
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6">
          <div>
            <div className="overflow-visible">
              <h2
                ref={headRef}
                className="text-[clamp(2rem,6vw,7rem)] font-black leading-none text-white font-['Space_Grotesk']"
                style={{ letterSpacing: "-0.04em" }}
              >
                Projects
              </h2>
            </div>
          </div>

          <div className="lg:max-w-xs">
            <div className="overflow-visible">
              <p
                ref={subRef}
                className="text-gray-500 text-xs sm:text-sm leading-relaxed font-['Inter']"
              >
                A curated selection of practical web projects built for booking systems, education-focused websites, and business-oriented digital experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Progress row */}
        <div className="flex items-center gap-4 mt-8 sm:mt-12">
          <span
            ref={countRef}
            className="text-xs text-gray-600 font-['Space_Grotesk'] tabular-nums min-w-[60px]"
          >
            01 / 04
          </span>
          <div className="flex-1 h-px bg-white/5 relative overflow-hidden rounded-full">
            <div
              ref={progressRef}
              className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-cyan-400 origin-left"
              style={{ scaleX: 0 }}
            />
          </div>
          <span className="text-xs text-gray-700 font-['Inter'] hidden sm:inline">Scroll →</span>
        </div>
      </div>

      {/* ── Pinned horizontal scroll container ── */}
      <div ref={pinRef} className="relative overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-center will-change-transform"
          style={{ paddingLeft: "3vw", paddingRight: "3vw", paddingTop: "2vh", paddingBottom: "2vh" }}
        >
          {PROJECTS.map((project, i) => (
            <div key={project.id} className="project-card-wrap flex-shrink-0">
              <ProjectCard project={project} index={i} />
            </div>
          ))}

          {/* End card — CTA */}
          <div
            className="flex-shrink-0 w-[60vw] sm:w-[50vw] md:w-[35vw] lg:w-[22vw] h-[65vh] sm:h-[75vh] rounded-lg sm:rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl flex flex-col items-center justify-center gap-4 sm:gap-6 cursor-pointer group hover:border-blue-500/30 transition-all duration-500"
            style={{ marginRight: "3vw" }}
          >
            <div className="w-10 sm:w-14 h-10 sm:h-14 rounded-full border border-white/10 group-hover:border-blue-500/50 flex items-center justify-center transition-all duration-300">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12M12 5l5 5-5 5" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="text-center px-4 sm:px-6">
              <p className="text-white text-xs sm:text-sm font-semibold font-['Space_Grotesk'] mb-1">See All Work</p>
              <p className="text-gray-600 text-[10px] sm:text-xs font-['Inter']">GitHub & more →</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[160px] opacity-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg,#3b82f6,#8b5cf6)" }} />
    </section>
  );
}