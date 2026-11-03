import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFloatingVisible, setIsFloatingVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show when scrolling up and past 300px
      if (currentScrollY > 300 && currentScrollY < lastScrollY) {
        setIsFloatingVisible(true);
      } else {
        setIsFloatingVisible(false);
      }
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { to: "/about", label: "About" },
    { to: "/ideas", label: "Ideas" },
    { to: "/blogs", label: "Blogs" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <div
        className="absolute -top-[2px] -left-[2px] -right-[2px] z-50 flex items-start justify-between pointer-events-none"
      >
        {/* Logo Cutout */}
        <div className="flex items-center pointer-events-auto">
          <div className="relative p-4 md:p-6 bg-white flex items-center justify-center z-50 rounded-br-[1.5rem] md:rounded-br-[2rem] border-r-2 border-b-2 border-white shadow-sm">
            <Link to="/" className="transform transition-transform hover:scale-105">
              <img src="/logo.png" alt="SvaBharat" className="w-16 h-16 md:w-20 md:h-20 object-contain mix-blend-multiply" />
            </Link>
            {/* Right concave */}
            <svg className="absolute top-0 -right-8 md:-right-10 w-8 h-8 md:w-10 md:h-10 fill-white pointer-events-none" viewBox="0 0 32 32">
              <path d="M0,0 H32 A32,32 0 0,0 0,32 Z" />
            </svg>
            {/* Bottom concave */}
            <svg className="absolute -bottom-8 md:-bottom-10 left-0 w-8 h-8 md:w-10 md:h-10 fill-white pointer-events-none" viewBox="0 0 32 32">
              <path d="M0,0 H32 A32,32 0 0,0 0,32 Z" />
            </svg>
          </div>

          {/* Brand name — minimal, elegant */}
          <span className="ml-5 md:ml-7 text-lg md:text-xl font-serif font-extrabold tracking-wider text-primary hidden sm:block">
            SvaBharat
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-10 pr-6 md:pr-10 lg:pr-12 pt-6 md:pt-8 text-sm font-bold tracking-wider text-charcoal">
          {links.map((l) => {
            const isActive = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`transition-all duration-300 pb-1 uppercase text-xs ${
                  isActive 
                    ? "text-primary border-b-2 border-primary font-black" 
                    : "text-neutral-600 hover:text-primary"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger */}
        <div className="pointer-events-auto flex md:hidden pr-5 pt-6 relative z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-charcoal hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Floating Navbar (Appears on scroll up) */}
      <AnimatePresence>
        {isFloatingVisible && (
          <motion.div
            initial={{ y: -100, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: -100, opacity: 0, x: "-50%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-4 md:top-6 left-1/2 z-[100] bg-white rounded-full px-6 md:px-10 py-1 md:py-1.5 shadow-lg shadow-neutral-200/50 flex items-center justify-between gap-8 md:gap-16 pointer-events-auto border border-neutral-100 w-[95%] md:w-auto"
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 md:gap-4">
              <img src="/logo.png" alt="SvaBharat" className="w-10 h-10 md:w-11 md:h-11 object-contain mix-blend-multiply brightness-75 contrast-125" />
              <span className="text-lg md:text-xl font-serif font-extrabold tracking-wider text-charcoal hidden sm:block">
                SvaBharat
              </span>
            </Link>

            {/* Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wider text-charcoal">
              {links.map((l) => {
                const isActive = location.pathname === l.to;
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`transition-all duration-300 uppercase text-xs ${
                      isActive 
                        ? "text-primary font-black" 
                        : "text-neutral-600 hover:text-primary"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Hamburger for Floating Nav */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-charcoal hover:text-primary transition-colors ml-auto"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110] bg-cream flex flex-col items-center justify-center pointer-events-auto border border-neutral-200/20"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 p-2 text-charcoal hover:text-primary transition-colors"
            >
              <X size={32} />
            </button>
            <div className="flex flex-col items-center gap-8">
              {links.map((l, i) => {
                const isActive = location.pathname === l.to;
                return (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      to={l.to}
                      className={`text-3xl font-serif font-extrabold transition-colors ${
                        isActive ? "text-primary underline decoration-2 underline-offset-8" : "text-charcoal hover:text-primary"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
