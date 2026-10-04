import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Hero } from "../components/Hero";
import { CutTitle } from "../components/CutTitle";
import { Navbar } from "../components/Navbar";
import { getTestimonials, type Testimonial } from "../utils/storage";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
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
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-extrabold text-charcoal leading-snug mb-4">
              Sva-Bharat Movement was born out of a pain.
            </h2>
            <p className="text-sm md:text-base text-neutral-600 font-semibold leading-relaxed max-w-2xl">
              The pain of seeing our systems fail — not always because solutions do not exist, but because we have often chosen to outsource our <span className="italic font-bold text-charcoal">Vichar</span> and <span className="italic font-bold text-charcoal">Niti</span> — our ideas and our policies.
            </p>
          </div>

          {/* Question / Legacy / Possibility — stacked with clear breathing room */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-4 border-primary pl-5 py-1">
              <p className="text-xs font-bold text-primary tracking-widest uppercase mb-2">The Question</p>
              <p className="text-sm md:text-base font-serif font-extrabold text-charcoal leading-snug mb-2">What happens when we stop looking within for our answers?</p>
              <p className="text-sm text-neutral-600 font-semibold leading-relaxed">When our ideas and policies are borrowed without understanding our own context, our solutions can remain disconnected from the society they are meant to serve.</p>
            </div>
            <div className="border-l-4 border-secondary pl-5 py-1">
              <p className="text-xs font-bold text-secondary tracking-widest uppercase mb-2">The Legacy</p>
              <p className="text-sm md:text-base font-serif font-extrabold text-charcoal leading-snug mb-2">Bharat has always created Vichar.</p>
              <p className="text-sm text-neutral-600 font-semibold leading-relaxed">For centuries, this land has been home to thinkers, philosophers, practitioners and communities who developed ideas not merely for Bharat, but for the world.</p>
            </div>
            <div className="border-l-4 border-primary pl-5 py-1">
              <p className="text-xs font-bold text-primary tracking-widest uppercase mb-2">The Possibility</p>
              <p className="text-sm md:text-base font-serif font-extrabold text-charcoal leading-snug mb-2">The answer can come from within.</p>
              <p className="text-sm text-neutral-600 font-semibold leading-relaxed mb-2">The strongest solutions can emerge from our own communities, experiences and <span className="italic font-bold text-charcoal">Vichar</span>.</p>
              <p className="text-sm text-primary font-extrabold font-serif">We create practices worthy of becoming the world's best.</p>
            </div>
          </div>

          {/* The Movement */}
          <div className="bg-white/60 rounded-2xl p-6 border-2 border-white shadow-sm">
            <p className="text-xs font-bold text-charcoal tracking-widest uppercase mb-3">The Movement</p>
            <p className="text-lg md:text-xl font-serif font-extrabold text-charcoal leading-snug mb-3">
              Transformation needs more than an idea.{" "}
              <span className="text-primary">It needs a movement.</span>
            </p>
            <p className="text-sm text-neutral-600 font-semibold leading-relaxed">
              If Bharat is to transform through ideas rooted in its own context, that <span className="italic font-bold text-charcoal">Vichar</span> must move beyond research and conversation. It must reach communities, institutions and policy.{" "}
              <span className="font-bold text-neutral-700">That is why Sva-Bharat Movement exists.</span>
            </p>
          </div>

        </div>

        {/* Decorative Image */}
        <div className="absolute top-0 bottom-0 right-0 w-full lg:w-[42%] xl:w-[45%] h-full pointer-events-none select-none flex items-end justify-end">
          <img
            src="/img2.png?v=2"
            alt=""
            className="w-full h-full mix-blend-multiply opacity-90 object-contain object-bottom lg:object-left-bottom transform translate-y-6 md:translate-y-10 lg:translate-y-12 translate-x-2 lg:translate-x-4 xl:translate-x-8"
          />
        </div>
      </section>

      {/* ── HOW WE THINK ── */}
      <section className="relative w-full py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-cream rounded-3xl md:rounded-[3rem] overflow-hidden border-2 border-white">
        <CutTitle position="top-left">From First Principles to New Possibilities</CutTitle>

        <div className="mt-16 md:mt-20 max-w-3xl lg:max-w-xl xl:max-w-2xl relative z-20">
          <p className="text-2xl md:text-3xl font-serif font-extrabold leading-relaxed text-charcoal mb-10">
            We begin not with solutions, but with the right questions.
          </p>
          <div className="space-y-6 text-neutral-600 font-semibold text-lg leading-relaxed mb-12">
            <p>Not <span className="italic font-serif text-neutral-500">"How can the existing system be improved?"</span></p>
            <p className="text-primary font-bold text-xl md:text-2xl font-serif">"What are we actually trying to achieve?"</p>
            <p>We strip problems back to what is fundamentally true, and rebuild from there.</p>
          </div>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary transition-colors group uppercase tracking-wider"
          >
            Explore how we think
            <span className="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
          </Link>
        </div>

        {/* Absolute Decorative Image */}
        <div className="absolute -bottom-4 md:-bottom-8 lg:-bottom-12 -right-6 md:-right-10 lg:-right-14 xl:-right-16 w-[85%] sm:w-[75%] md:w-[65%] lg:w-[60%] xl:w-[55%] pointer-events-none select-none">
          <img 
            src="/middle2.png?v=3" 
            alt="First Principles Illustration" 
            className="w-full h-auto object-contain object-bottom mix-blend-multiply opacity-90 hover:opacity-100 transition-opacity duration-500 transform translate-y-6 md:translate-y-10"
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
          <p className="text-2xl md:text-3xl font-serif font-extrabold leading-snug text-charcoal mb-4">
            Every transformation begins with an idea that refuses to stay quiet.
          </p>
          <p className="text-neutral-600 font-semibold text-base md:text-lg leading-relaxed mb-12">
            SvaBharat brings together ideas rooted in Bharat's own context — from people across communities, disciplines, and generations.
          </p>

          {/* Ideas Follow Path */}
          <div className="flex flex-col gap-0 mb-12">
            {[
              { step: "01", label: "An Idea Is Born", desc: "Someone asks a question that existing frameworks cannot answer. They write it down." },
              { step: "02", label: "It Finds Its Context", desc: "The idea is grounded in lived experience, research, or practice — rooted in Bharat's reality." },
              { step: "03", label: "It Enters Conversation", desc: "Others engage with it — challenging, building, and refining it through dialogue." },
              { step: "04", label: "It Reaches Communities", desc: "The refined idea moves beyond conversation into institutions, policy, and people." },
            ].map((item, i, arr) => (
              <div key={item.step} className="flex gap-4 md:gap-6 items-start">
                {/* Timeline spine */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-xs font-extrabold shrink-0">
                    {item.step}
                  </div>
                  {i < arr.length - 1 && <div className="w-0.5 h-10 bg-primary/20 mt-1" />}
                </div>
                {/* Content */}
                <div className="pb-8">
                  <h3 className="text-base md:text-lg font-serif font-extrabold text-charcoal mb-1">{item.label}</h3>
                  <p className="text-sm text-neutral-600 font-semibold leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/ideas"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-secondary transition-colors cursor-pointer active:scale-95 shadow-sm"
          >
            Explore the Ideas
            <span className="ml-1">→</span>
          </Link>
        </div>

        {/* Decorative image */}
        <div className="absolute -bottom-4 md:-bottom-8 lg:-bottom-12 -right-4 md:-right-8 lg:-right-12 w-[85%] sm:w-[75%] md:w-[60%] lg:w-[55%] xl:w-[50%] pointer-events-none select-none">
          <img
            src="/img4.png?v=2"
            alt=""
            className="w-full h-auto object-contain object-bottom mix-blend-multiply opacity-90 transform translate-y-0 md:translate-y-2 lg:translate-y-4"
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
              className="w-full h-full mix-blend-multiply opacity-90 object-contain object-bottom lg:object-left-bottom transform translate-y-10 md:translate-y-14 lg:translate-y-20 -translate-x-10 lg:-translate-x-16 xl:-translate-x-24"
            />
          </div>

          <CutTitle position="top-left">Voices of the Movement</CutTitle>

          <div className="relative z-20 w-full flex flex-col items-end mt-12 md:mt-20">
             {/* Container aligned to right side */}
             <div className="w-full md:w-[28rem] lg:w-[30rem] shrink-0">
               
               <p className="text-lg md:text-xl text-neutral-700 font-bold mb-8 font-serif text-center lg:text-left">
                 What researchers, practitioners, and builders say about the SvaBharat movement.
               </p>

               {/* Single Card Carousel */}
               <div className="relative w-full h-[380px] sm:h-[350px] md:h-[340px] lg:h-[320px]">
                 <AnimatePresence>
                   <motion.div 
                     key={activeTestimonial}
                     initial={{ opacity: 0, x: 50, rotateY: -10 }}
                     animate={{ opacity: 1, x: 0, rotateY: 0 }}
                     exit={{ opacity: 0, x: -50, rotateY: 10 }}
                     transition={{ duration: 0.4, ease: "easeOut" }}
                     className="bg-white rounded-3xl p-6 md:p-8 border-2 border-white shadow-xl flex flex-col justify-between w-full h-full absolute inset-0"
                   >
                     
                     <div className="flex flex-col">
                       {/* Orange Opening Quote Icon (Rotated) */}
                       <div className="w-10 h-10 bg-secondary-light text-secondary rounded-xl flex items-center justify-center mb-4 shrink-0 transform rotate-180">
                         <Quote className="w-5 h-5 fill-current" />
                       </div>
                       
                       <p className="text-charcoal/90 text-sm md:text-base font-semibold leading-relaxed mb-4 italic font-serif">
                         {testimonials[activeTestimonial]?.quote}
                       </p>

                       {/* Orange Closing Quote Icon (Normal) */}
                       <div className="w-10 h-10 bg-secondary-light text-secondary rounded-xl flex items-center justify-center shrink-0 self-end">
                         <Quote className="w-5 h-5 fill-current" />
                       </div>
                     </div>

                     <div className="border-t border-neutral-100 pt-4 mt-4 relative z-10 flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-secondary-light/30 flex items-center justify-center text-secondary font-serif font-bold text-lg shrink-0">
                         {testimonials[activeTestimonial]?.name.charAt(0)}
                       </div>
                       <div>
                         <h4 className="font-bold text-neutral-900 font-serif text-base leading-tight">{testimonials[activeTestimonial]?.name}</h4>
                         <p className="text-xs font-bold text-primary">{testimonials[activeTestimonial]?.role}</p>
                       </div>
                     </div>
                   </motion.div>
                 </AnimatePresence>
               </div>

               {/* Navigation Controls */}
               <div className="flex items-center justify-center gap-6 mt-10">
                  <button 
                    onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-neutral-500 hover:text-primary hover:scale-110 transition-all border border-neutral-100 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {testimonials.map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setActiveTestimonial(i)}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          i === activeTestimonial ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-neutral-300 hover:bg-neutral-400"
                        }`}
                      />
                    ))}
                  </div>

                  <button 
                    onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-neutral-500 hover:text-primary hover:scale-110 transition-all border border-neutral-100 cursor-pointer"
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
          <h2 className="text-2xl md:text-3xl font-serif font-extrabold mb-3 text-charcoal">Stay Close to Ideas That Matter</h2>
          <p className="text-neutral-600 font-semibold mb-8 text-sm md:text-base">A thoughtful selection of ideas, questions, and reflections from the SvaBharat movement.</p>
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-xl border-2 border-white bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-semibold transition-all"
            />
            <button className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-secondary transition-colors whitespace-nowrap cursor-pointer active:scale-95 shadow-sm">
              Subscribe
            </button>
          </form>
        </div>

        {/* Absolute Decorative Image */}
        <div className="absolute -bottom-4 md:-bottom-8 lg:-bottom-12 -right-4 md:-right-8 lg:-right-12 w-[85%] sm:w-[75%] md:w-[60%] lg:w-[50%] xl:w-[45%] pointer-events-none select-none">
          <img 
            src="/img1.png?v=3" 
            alt="Indic Wisdom and Traditions" 
            className="w-full h-auto object-contain object-bottom mix-blend-multiply opacity-90 hover:opacity-100 transition-opacity duration-500 transform translate-y-12 md:translate-y-20 lg:translate-y-24 xl:translate-y-28 -translate-x-2 md:-translate-x-6 lg:-translate-x-10"
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
