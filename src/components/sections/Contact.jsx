import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const INFO_ITEMS = [
  { icon: Mail, label: "Email", value: "altafhossain78601@gmail.com", href: "mailto:altafhossain78601@gmail.com" },
  { icon: MapPin, label: "Location", value: "Kolkata, India", href: null },
];

// Replace this placeholder with an international WhatsApp number, without + or spaces.
const WHATSAPP_NUMBER = "6289431001";
const WHATSAPP_MESSAGE = "Hi MD Arif, I’d like to discuss a website/web application project.";
const PROJECT_EMAIL = INFO_ITEMS.find((item) => item.label === "Email").value;
const PROJECT_MAILTO = `mailto:${PROJECT_EMAIL}?subject=${encodeURIComponent("Project Enquiry")}&body=${encodeURIComponent("Hi MD Arif,\n\nI’d like to discuss a project with you.\n\nProject type:\nBudget:\nTimeline:\nDetails:\n\nThank you.")}`;
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const CAPABILITIES = [
  ["Business Websites", "Professional, responsive websites for local businesses and brands."],
  ["Booking Systems", "Custom booking and reservation experiences for businesses."],
  ["Digital Menus", "Mobile-friendly digital menu websites for restaurants and cafes."],
  ["Custom Web Applications", "Interactive web applications built around specific business requirements."],
];

function FloatingOrb({ className }) {
  return <div className={`absolute rounded-full blur-[120px] opacity-20 pointer-events-none ${className}`} />;
}

function GlowLine({ delay = 0 }) {
  return (
    <motion.div
      className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/60 to-transparent"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: "easeInOut" }}
    />
  );
}

function ContactInfoCard({ icon: Icon, label, value, href, index }) {
  const content = (
    <motion.div
      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/8 transition-all duration-300 group cursor-pointer"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
        <Icon size={18} className="text-blue-400" />
      </div>
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">{label}</p>
        <p className="text-white text-sm font-medium mt-0.5 break-words">{value}</p>
      </div>
    </motion.div>
  );

  return href ? <a href={href}>{content}</a> : content;
}

function CapabilityCard({ title, description, index }) {
  return (
    <motion.div
      className="p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:border-blue-500/30 transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div className="flex items-start gap-3">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
        <div>
          <h3 className="text-white text-sm font-semibold font-['Space_Grotesk']">{title}</h3>
          <p className="text-gray-500 text-xs leading-relaxed mt-1.5 font-['Inter']">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Contact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative min-h-screen py-16 sm:py-28 px-3 sm:px-4 md:px-6 bg-[#0a0a0a] overflow-hidden">
      <FloatingOrb className="w-[500px] h-[500px] bg-blue-600 top-[-10%] right-[-10%]" />
      <FloatingOrb className="w-[400px] h-[400px] bg-cyan-500 bottom-[-10%] left-[-10%]" />
      <FloatingOrb className="w-[300px] h-[300px] bg-purple-600 top-[40%] left-[30%]" />

      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div className="flex items-center justify-center gap-3 mb-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-blue-500/60" />
          <span className="text-blue-400 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-medium font-['Inter']">Get In Touch</span>
          <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-blue-500/60" />
        </motion.div>

        <div ref={headingRef} className="text-center mb-4">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-['Space_Grotesk']" style={{ letterSpacing: "-0.03em" }}>
            Have a project in mind?
          </h2>
        </div>
        <motion.p className="text-center text-gray-300 text-sm sm:text-base max-w-xl mx-auto font-['Inter'] leading-relaxed px-2" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          Let&apos;s turn your idea into a modern, professional web experience.
        </motion.p>
        <p className="text-center text-gray-500 text-xs sm:text-sm max-w-2xl mx-auto mt-3 mb-8 sm:mb-12 font-['Inter'] leading-relaxed px-2">
          Whether you need a business website, booking system, digital menu, or custom web application, let&apos;s discuss what you need.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-12 sm:mb-16">
          <a href={PROJECT_MAILTO} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity">
            Start a Project <ArrowUpRight size={16} />
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-white/15 text-white/80 text-sm font-semibold hover:text-white hover:border-blue-500/50 transition-colors">
            WhatsApp Me <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" /></span>
              <span className="text-emerald-400 text-xs font-medium">Available for freelance projects</span>
            </motion.div>
            <GlowLine delay={0.3} />
            <div className="space-y-3">
              {INFO_ITEMS.map((item, i) => <ContactInfoCard key={item.label} {...item} index={i} />)}
            </div>
          </div>

          <motion.div className="lg:col-span-3 relative rounded-lg sm:rounded-2xl bg-white/[0.03] border border-white/10 p-4 sm:p-8 backdrop-blur-xl overflow-hidden" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: "easeOut" }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full blur-2xl pointer-events-none" />
            <h3 className="text-lg sm:text-xl font-semibold text-white font-['Space_Grotesk']" style={{ letterSpacing: "-0.02em" }}>What I can build</h3>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mt-2 mb-5 sm:mb-6">Practical digital experiences shaped around how your business works.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CAPABILITIES.map(([title, description], index) => <CapabilityCard key={title} title={title} description={description} index={index} />)}
            </div>
          </motion.div>
        </div>

        <motion.div className="mt-16 sm:mt-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
          <GlowLine />
        </motion.div>
      </div>
    </section>
  );
}