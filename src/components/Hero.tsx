import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

export function Hero({ showAnimation }: { showAnimation: boolean }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const restRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showAnimation) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
      );
      tl.fromTo(
        restRef.current?.children || [],
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" },
        "-=0.45"
      );
    });
    return () => ctx.revert();
  }, [showAnimation]);

  return (
    <section className="relative w-full h-full min-h-[calc(100dvh-2rem)] md:min-h-[calc(100dvh-4rem)] lg:min-h-[calc(100dvh-5rem)] flex flex-col overflow-hidden text-charcoal">
      {/* Full-bleed illustration */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src="/svabharat_newww.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Main content — title, line, actions, all centred in the open sky of the illustration */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 pt-28 pb-40 md:pb-56 text-center">
        <h1
          ref={titleRef}
          className="max-w-4xl font-serif font-bold tracking-tight text-[clamp(2.25rem,5.2vw,4.4rem)] leading-[1.08] text-[#1C1917]"
          style={{ opacity: 0 }}
        >
          <span className="block text-[#9A4A0B]">Sva-Bharat</span>
          <span className="block">Reimagining Bharat</span>
          <span className="block italic font-medium">from first principles.</span>
        </h1>

        <div ref={restRef} className="mt-6 md:mt-8 flex flex-col items-center gap-7">
          <p className="max-w-md text-base md:text-lg text-[#3F3A36] leading-relaxed" style={{ opacity: 0 }}>
            A movement to inspire <em className="font-serif">Jan</em> to shape the Bharat they aspire for.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto" style={{ opacity: 0 }}>
            <Link
              to="/ideas"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#1C1917] text-[#FAF5EB] text-sm font-semibold hover:bg-[#9A4A0B] transition-colors w-full sm:w-auto"
            >
              Explore the ideas
            </Link>
            <a
              href="https://tally.so/r/jaRrya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-[#1C1917] text-sm font-semibold underline decoration-[#1C1917]/30 underline-offset-[6px] hover:decoration-[#1C1917] transition-colors w-full sm:w-auto"
            >
              Join the movement
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
