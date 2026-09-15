import { motion } from "framer-motion";
import {  ArrowUp } from "lucide-react";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/5 py-8 sm:py-12 px-3 sm:px-4 md:px-6 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[150px] sm:h-[200px] bg-blue-600/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <span
              className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent block"
              style={{ letterSpacing: "-0.03em" }}
            >
              MD Arif
            </span>
            <p className="text-gray-600 text-[10px] sm:text-xs mt-1 font-['Inter']">
              Building the web, one commit at a time.
            </p>
          </motion.div>

          {/* Nav links */}
          <motion.nav
            className="flex flex-wrap justify-center gap-3 sm:gap-x-6 sm:gap-y-2 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-gray-500 hover:text-white text-xs sm:text-sm transition-colors duration-200 font-['Inter']"
              >
                {l.label}
              </a>
            ))}
          </motion.nav>

          {/* Socials + scroll-top */}
          <motion.div
            className="flex items-center gap-2 sm:gap-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {SOCIALS.map(({ icon: Icon, href }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 sm:w-9 h-7 sm:h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-blue-500/50 transition-all duration-200"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Icon size={12} className="sm:w-4 sm:h-4" />
              </motion.a>
            ))}

            <motion.button
              onClick={scrollTop}
              className="w-7 sm:w-9 h-7 sm:h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 hover:bg-blue-500/20 transition-all duration-200 ml-1"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Back to top"
            >
              <ArrowUp size={12} className="sm:w-4 sm:h-4" />
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 sm:mt-10 pt-4 sm:pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-600 text-[10px] sm:text-xs font-['Inter']">
            © {new Date().getFullYear()} MD Arif. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs font-['Inter']">
            Designed & built with{" "}
            <span className="text-blue-500/70">React</span> +{" "}
            <span className="text-cyan-500/70">Tailwind</span>
          </p>
        </div>
      </div>
    </footer>
  );
}