import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Hero } from "../components/Hero";
import { CutTitle } from "../components/CutTitle";
import { Navbar } from "../components/Navbar";
import { getTestimonials, type Testimonial } from "../utils/storage";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";



export function Home() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setTestimonials(getTestimonials());
    const handleUpdate = () => {
      setTestimonials(getTestimonials());
    };
    window.addEventListener("svabharat_testimonials_updated", handleUpdate);
    return () => {
      window.removeEventListener("svabharat_testimonials_updated", handleUpdate);
    };
  }, []);

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="flex flex-col w-full gap-4 md:gap-8 lg:gap-10">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[calc(100dvh-2rem)] md:min-h-[calc(100dvh-4rem)] lg:min-h-[calc(100dvh-5rem)] bg-cream rounded-3xl md:rounded-[3rem] overflow-hidden border-2 border-white">
        <Navbar />
        <Hero showAnimation={true} />
      </section>

      <section className="relative w-full py-14 md:py-20 px-6 md:px-16 lg:px-24 bg-cream-dark rounded-3xl md:rounded-[3rem] overflow-hidden border-2 border-white">
        <CutTitle position="top-left">Why Movement?</CutTitle>

        <div className="mt-12 md:mt-16 max-w-3xl relative z-20 flex flex-col gap-10">

          {/* Main heading + intro */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-serif font-bold text-charcoal leading-[1.15] mb-5">
              Sva-Bharat Movement was born out of a pain.
            </h2>
            <p className="text-base md:text-lg text-neutral-700 leading-relaxed max-w-2xl">
              The pain of seeing our systems fail. Not always because solutions do not exist, but because we have often chosen to outsource our <em className="font-serif text-charcoal">Vichar</em> and <em className="font-serif text-charcoal">Niti</em>, our ideas and our policies.
            </p>
          </div>

          {/* Question / Legacy / Possibility */}
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8 border-t border-charcoal/15">
            {[
              {
                n: "i.",
                label: "The question",
                head: "What happens when we stop looking within for our answers?",
                body: "When our ideas and policies are borrowed without understanding our own context, our solutions can remain disconnected from the society they are meant to serve.",
              },
              {
                n: "ii.",
                label: "The legacy",
                head: "Bharat has always created Vichar.",
                body: "For centuries, this land has been home to thinkers, philosophers, practitioners and communities who developed ideas not merely for Bharat, but for the world.",
              },
              {
                n: "iii.",
                label: "The possibility",
                head: "The answer can come from within.",
                body: "The strongest solutions can emerge from our own communities, experiences and Vichar, practices worthy of becoming the world's best.",
              },
            ].map((item) => (
              <li key={item.label} className="pt-5">
                <p className="font-serif italic text-secondary text-base mb-3">
                  {item.n} <span className="text-charcoal/60">{item.label}</span>
                </p>
                <p className="text-lg font-serif font-bold text-charcoal leading-snug mb-2">{item.head}</p>
                <p className="text-sm md:text-[0.95rem] text-neutral-700 leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ol>

          {/* The Movement */}
          <div className="pt-2">
            <p className="text-2xl md:text-3xl font-serif font-bold text-charcoal leading-snug mb-4 max-w-2xl">
              Transformation needs more than an idea.{" "}
              <span className="italic font-medium text-secondary">It needs a movement.</span>
            </p>
            <p className="text-base text-neutral-700 leading-relaxed max-w-2xl">
              If Bharat is to transform through ideas rooted in its own context, that <em className="font-serif text-charcoal">Vichar</em> must move beyond research and conversation. It must reach communities, institutions and policy. That is why Sva-Bharat Movement exists.
            </p>
          </div>

        </div>

        {/* Decorative Image */}
        <div className="absolute top-0 bottom-0 right-0 w-full lg:w-[42%] xl:w-[45%] h-full pointer-events-none select-none flex items-end justify-end">
          <img
            src="/img2.png?v=2"
            alt=""
            className="w-full h-full mix-blend-multiply opacity-25 lg:opacity-90 object-contain object-bottom lg:object-left-bottom transform translate-y-6 md:translate-y-10 lg:translate-y-12 translate-x-2 lg:translate-x-4 xl:translate-x-8"
          />
        </div>
      </section>

      {/* ── HOW WE THINK ── */}
      <section className="relative w-full py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-cream rounded-3xl md:rounded-[3rem] overflow-hidden border-2 border-white">
        <CutTitle position="top-left">From First Principles to New Possibilities</CutTitle>

        <div className="mt-16 md:mt-20 max-w-3xl lg:max-w-lg xl:max-w-xl relative z-20">
          <p className="text-3xl md:text-4xl font-serif font-bold leading-[1.2] text-charcoal mb-10">
            We begin not with solutions, but with the right questions.
          </p>
          <div className="space-y-5 text-neutral-700 text-lg leading-relaxed mb-12">
            <p className="font-serif text-xl text-neutral-500"><span className="line-through decoration-neutral-400/70">“How can the existing system be improved?”</span></p>
            <p className="font-serif italic text-2xl md:text-3xl text-charcoal">“What are we actually trying to achieve?”</p>
            <p>We strip problems back to what is fundamentally true, and rebuild from there.</p>
          </div>
          <Link
            to="/about"
            className="inline-flex items-center text-base font-semibold text-charcoal underline decoration-charcoal/30 underline-offset-[6px] hover:decoration-charcoal transition-colors"
          >
            Explore how we think
          </Link>
        </div>

        {/* Absolute Decorative Image */}
        <div className="absolute -bottom-4 md:-bottom-8 lg:-bottom-12 -right-6 md:-right-10 lg:-right-14 xl:-right-16 w-[85%] sm:w-[75%] md:w-[65%] lg:w-[60%] xl:w-[55%] pointer-events-none select-none">
          <img 
            src="/middle2.png?v=3" 
            alt="First Principles Illustration" 
            className="w-full h-auto object-contain object-bottom mix-blend-multiply opacity-25 lg:opacity-90 hover:opacity-100 transition-opacity duration-500 transform translate-y-6 md:translate-y-10"
          />
        </div>
      </section>

      {/* ── FEATURED CONVERSATION (Temporarily Hidden) ── */}
      {false && (
        <section className="relative w-full py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-[#fcb36d] text-white rounded-3xl md:rounded-[3rem] overflow-hidden border-2 border-white">
          <CutTitle position="top-left">
            Featured Conversation
          </CutTitle>

          <div className="mt-16 md:mt-20 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            {/* Video placeholder */}
            <div className="w-full lg:w-1/2 aspect-video bg-[#1E1E1E]/40 rounded-2xl overflow-hidden group flex-shrink-0 border-2 border-white/30">
              <div className="w-full h-full flex items-center justify-center bg-[#1E1E1E]/20 group-hover:bg-[#1E1E1E]/40 transition-colors">
                <div className="w-16 h-16 rounded-full bg-white/20 border border-white/30 flex items-center justify-center pl-1 group-hover:bg-white/35 transition-colors shadow-lg cursor-pointer">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M5 3l14 9-14 9V3z"/></svg>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 flex flex-col justify-center">
              <p className="text-xs font-bold tracking-widest uppercase text-white/70 mb-5">With Guest Name</p>
              <h3 className="text-2xl md:text-3xl font-serif font-extrabold leading-snug mb-4 text-white">
                The Future of Original Thought in Bharat
              </h3>
              <p className="text-white/80 font-semibold text-sm leading-relaxed mb-8">
                A short, compelling introduction to the central question explored in the conversation.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-3 rounded-xl bg-white text-charcoal text-xs font-bold hover:bg-[#FAF5EB] transition-all cursor-pointer active:scale-95 shadow-sm">
                  Watch the conversation
                </button>
                <button className="px-6 py-3 rounded-xl border-2 border-white/30 text-white text-xs font-bold hover:bg-white/10 hover:border-white/50 transition-all cursor-pointer active:scale-95">
                  All conversations
                </button>
              </div>
            </div>
          </div>
        </section>
      )}


      {/* ── IDEAS THAT MAKE A DIFFERENCE ── */}
      <section className="relative w-full py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-cream-dark rounded-3xl md:rounded-[3rem] overflow-hidden border-2 border-white">
        <CutTitle position="top-left">Ideas That Make a Difference</CutTitle>

        <div className="mt-16 md:mt-20 max-w-3xl relative z-20">
          <p className="text-3xl md:text-4xl font-serif font-bold leading-[1.2] text-charcoal mb-5">
            Every transformation begins with an idea that refuses to stay quiet.
          </p>
          <p className="text-neutral-700 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
            SvaBharat brings together ideas rooted in Bharat's own context, from people across communities, disciplines, and generations.
          </p>

          {/* Ideas Follow Path */}
          <ol className="mb-12 max-w-xl">
            {[
              { label: "An idea is born", desc: "Someone asks a question that existing frameworks cannot answer, and writes it down." },
              { label: "It finds its context", desc: "The idea is grounded in lived experience, research, or practice, rooted in Bharat's reality." },
              { label: "It enters conversation", desc: "Others engage with it, challenging, building on and refining it through dialogue." },
              { label: "It reaches communities", desc: "The refined idea moves beyond conversation into institutions, policy, and people." },
            ].map((item, i) => (
              <li key={item.label} className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-5 border-t border-charcoal/15 last:border-b">
                <span className="font-serif italic text-2xl leading-none text-secondary pt-0.5">{i + 1}</span>
                <div>
                  <h3 className="text-lg font-serif font-bold text-charcoal mb-1">{item.label}</h3>
                  <p className="text-sm md:text-[0.95rem] text-neutral-700 leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <Link
            to="/ideas"
            className="inline-flex items-center px-6 py-3 rounded-full bg-charcoal text-cream-light text-sm font-semibold hover:bg-primary transition-colors"
          >
            Explore the ideas
          </Link>
        </div>

        {/* Decorative image */}
        <div className="absolute -bottom-4 md:-bottom-8 lg:-bottom-12 -right-4 md:-right-8 lg:-right-12 w-[85%] sm:w-[75%] md:w-[60%] lg:w-[55%] xl:w-[50%] pointer-events-none select-none">
          <img
            src="/img4.png?v=2"
            alt=""
            className="w-full h-auto object-contain object-bottom mix-blend-multiply opacity-25 lg:opacity-90 transform translate-y-0 md:translate-y-2 lg:translate-y-4"
          />
        </div>
      </section>

      {/* ── TESTIMONIALS (VOICES OF THE MOVEMENT) ── */}
      {testimonials.length > 0 && (
        <section className="relative w-full py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-cream-dark rounded-3xl md:rounded-[3rem] overflow-hidden border-2 border-white flex flex-col">
          
          {/* Absolute Decorative Image on Left - Wider */}
          <div className="absolute top-0 bottom-0 left-0 w-full lg:w-[70%] xl:w-[75%] h-full pointer-events-none select-none flex items-end justify-start">
            <img 
              src="/img6.png?v=4" 
              alt="Voices Left Illustration" 
              className="w-full h-full mix-blend-multiply opacity-25 lg:opacity-90 object-contain object-bottom lg:object-left-bottom transform translate-y-10 md:translate-y-14 lg:translate-y-20 -translate-x-10 lg:-translate-x-16 xl:-translate-x-24"
            />
          </div>

          <CutTitle position="top-left">Voices of the Movement</CutTitle>

          <div className="relative z-20 w-full flex flex-col items-end mt-12 md:mt-20">
             {/* Container aligned to right side */}
             <div className="w-full md:w-[28rem] lg:w-[30rem] shrink-0">
               
               <p className="text-lg md:text-xl text-charcoal/80 mb-8 font-serif italic text-center lg:text-left">
                 What researchers, practitioners, and builders say about the SvaBharat movement.
               </p>

               {/* Single Card Carousel */}
               <div className="relative w-full h-[380px] sm:h-[350px] md:h-[340px] lg:h-[320px]">
                 <AnimatePresence>
                   <motion.figure
                     key={activeTestimonial}
                     initial={{ opacity: 0, y: 8 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -8 }}
                     transition={{ duration: 0.35, ease: "easeOut" }}
                     className="bg-cream-light rounded-2xl p-7 md:p-9 shadow-[0_1px_0_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(120,60,10,0.25)] flex flex-col justify-between w-full h-full absolute inset-0"
                   >
                     <div>
                       <span aria-hidden="true" className="block font-serif text-6xl leading-[0.6] text-secondary/70 mb-3">“</span>
                       <blockquote className="text-charcoal text-base md:text-lg leading-relaxed font-serif italic">
                         {testimonials[activeTestimonial]?.quote}
                       </blockquote>
                     </div>

                     <figcaption className="pt-5 mt-5 border-t border-charcoal/10">
                       <p className="font-serif font-bold text-charcoal text-base leading-tight">{testimonials[activeTestimonial]?.name}</p>
                       <p className="text-sm text-neutral-600 mt-0.5">{testimonials[activeTestimonial]?.role}</p>
                     </figcaption>
                   </motion.figure>
                 </AnimatePresence>
               </div>

               {/* Navigation Controls */}
               <div className="flex items-center justify-center gap-6 mt-10">
                  <button
                    onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                    aria-label="Previous testimonial"
                    className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center text-charcoal/70 hover:text-charcoal hover:border-charcoal/50 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {testimonials.map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setActiveTestimonial(i)}
                        aria-label={`Show testimonial ${i + 1}`}
                        className={`transition-colors duration-300 rounded-full cursor-pointer w-2 h-2 ${
                          i === activeTestimonial ? "bg-charcoal" : "bg-charcoal/20 hover:bg-charcoal/40"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                    aria-label="Next testimonial"
                    className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center text-charcoal/70 hover:text-charcoal hover:border-charcoal/50 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
               </div>
             </div>
          </div>
        </section>
      )}

      {/* ── NEWSLETTER ── */}
      <section className="relative w-full py-16 md:py-20 px-6 md:px-16 lg:px-24 bg-cream rounded-3xl md:rounded-[3rem] overflow-hidden border-2 border-white">
        <div className="max-w-xl relative z-20">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 text-charcoal">Stay close to ideas that matter</h2>
          <p className="text-neutral-700 mb-8 text-base">A thoughtful selection of ideas, questions, and reflections from the SvaBharat movement.</p>
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@example.com"
              aria-label="Email address"
              required
              className="flex-1 px-5 py-3 rounded-full border border-charcoal/15 bg-white focus:outline-none focus:ring-2 focus:ring-charcoal/30 text-sm transition-shadow"
            />
            <button className="px-6 py-3 rounded-full bg-charcoal text-cream-light text-sm font-semibold hover:bg-primary transition-colors whitespace-nowrap cursor-pointer">
              Subscribe
            </button>
          </form>
        </div>

        {/* Absolute Decorative Image */}
        <div className="absolute -bottom-4 md:-bottom-8 lg:-bottom-12 -right-4 md:-right-8 lg:-right-12 w-[85%] sm:w-[75%] md:w-[60%] lg:w-[50%] xl:w-[45%] pointer-events-none select-none">
          <img 
            src="/img1.png?v=3" 
            alt="Indic Wisdom and Traditions" 
            className="w-full h-auto object-contain object-bottom mix-blend-multiply opacity-25 lg:opacity-90 hover:opacity-100 transition-opacity duration-500 transform translate-y-12 md:translate-y-20 lg:translate-y-24 xl:translate-y-28 -translate-x-2 md:-translate-x-6 lg:-translate-x-10"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 25%)'
            }}
          />
        </div>
      </section>

    </div>
  );
}
