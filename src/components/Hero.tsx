import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BackgroundPaths } from "./ui/background-paths";

export function Hero({ showAnimation }: { showAnimation: boolean }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showAnimation) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
      );
      tl.fromTo(
        bottomRef.current?.children || [],
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
        "-=0.4"
      );
      gsap.to(".chakra-svg", {
        rotation: 360,
        duration: 80,
        repeat: -1,
        ease: "none",
      });
    });
    return () => ctx.revert();
  }, [showAnimation]);

  return (
    <section className="relative w-full h-full min-h-[calc(100dvh-2rem)] md:min-h-[calc(100dvh-4rem)] lg:min-h-[calc(100dvh-5rem)] flex flex-col overflow-hidden text-charcoal">

      {/* Full-bleed background photo */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src="/svabharat.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Subtle background paths */}
      <BackgroundPaths />

      {/* Very subtle chakra watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-[0.018]"
        style={{
          WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 70%)",
          maskImage: "radial-gradient(circle, black 30%, transparent 70%)",
        }}
      >
        <svg viewBox="0 0 200 200" className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] chakra-svg">
          <circle cx="100" cy="100" r="96" fill="none" stroke="#F97316" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="90" fill="none" stroke="#F97316" strokeWidth="1" />
          <circle cx="100" cy="100" r="16" fill="none" stroke="#F97316" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="8" fill="#F97316" />
          {Array.from({ length: 24 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 15} 100 100)`}>
              <line x1="100" y1="84" x2="100" y2="16" stroke="#F97316" strokeWidth="1" />
              <circle cx="100" cy="10" r="1.5" fill="#F97316" />
            </g>
          ))}
        </svg>
      </div>

      {/* Main Content — centered */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-16 lg:px-24">
        <h1
          ref={titleRef}
          className="text-center max-w-4xl select-none flex flex-col gap-2 font-sans font-light italic tracking-[-0.015em] text-[clamp(1.8rem,4.5vw,3.8rem)] leading-[1.2]"
          style={{ opacity: 0 }}
        >
          {/* "Sva-Bharat" in primary orange */}
          <span className="block">
            <span className="cursor-target-expand inline-block text-primary drop-shadow-sm">Sva-Bharat</span>
          </span>
          <span className="block text-white drop-shadow-md">
            <span className="cursor-target-expand inline-block">Reimagining Bharat</span>
          </span>
          <span className="block text-white drop-shadow-md">
            <span className="cursor-target-expand inline-block">From First Principles.</span>
          </span>
        </h1>
      </div>

      {/* Bottom Row — subtitle left, CTA right (Centered on mobile) */}
      <div
        ref={bottomRef}
        className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 px-6 md:px-16 lg:px-24 pb-8 md:pb-12 text-center sm:text-left"
      >
        <p className="max-w-sm text-sm md:text-base text-white font-semibold leading-relaxed drop-shadow-sm" style={{ opacity: 0 }}>
          A Movement to Inspire Jan to Shape the Bharat They Aspire For.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto" style={{ opacity: 0 }}>
          <a
            href="/ideas"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-secondary transition-colors w-full sm:w-auto shadow-sm cursor-pointer active:scale-95"
          >
            Explore the Ideas
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          {/* TODO: Replace href with the actual form link once provided */}
          <a
            href="https://forms.gle/REPLACE_WITH_FORM_LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-white/80 bg-white/20 backdrop-blur-sm text-white text-sm font-bold hover:bg-white/30 transition-colors w-full sm:w-auto shadow-sm cursor-pointer active:scale-95"
          >
            Join the Movement
          </a>
        </div>
      </div>
    </section>
  );
}
