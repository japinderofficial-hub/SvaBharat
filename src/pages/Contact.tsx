import { CutTitle } from "../components/CutTitle";
import { Navbar } from "../components/Navbar";

export function Contact() {
  return (
    <div className="flex flex-col w-full gap-4 md:gap-8 lg:gap-10">
      {/* Page Header */}
      <section className="relative w-full pt-32 pb-16 px-6 md:px-12 lg:px-24 bg-cream rounded-3xl md:rounded-[3rem] overflow-hidden border-2 border-white">
        <Navbar />
        <h1 className="text-5xl md:text-7xl font-serif font-extrabold tracking-tight mb-6 text-charcoal">Contact Us</h1>
        <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl font-serif font-bold">
          Every meaningful movement begins with a conversation.
        </p>
      </section>

      {/* Get in Touch Section */}
      <section className="relative w-full py-14 md:py-20 px-6 md:px-12 lg:px-24 bg-cream-dark rounded-3xl md:rounded-[3rem] overflow-hidden border-2 border-white">
        
        {/* Absolute Background Image aligned to bottom left */}
        <div className="absolute left-0 bottom-0 w-[55%] lg:w-[45%] pointer-events-none opacity-90 mix-blend-multiply z-0">
          <img src="/img7.png" alt="Get in touch illustration" className="w-full h-auto object-contain object-left-bottom" />
        </div>

        <CutTitle position="top-left">Get in Touch</CutTitle>
        
        <div className="mt-12 max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 relative z-10">
          <div className="lg:w-1/2 flex flex-col justify-start space-y-6 lg:pt-16">
            <div className="lg:w-[65%]">
              <h3 className="text-xl font-serif font-bold mb-3 text-charcoal">We would like to hear from you.</h3>
              <p className="text-base text-neutral-600 font-semibold leading-relaxed">
                Have a question you believe Bharat should be asking, or an idea you want to explore or a perspective that could strengthen one of our ideas?
              </p>
            </div>
          </div>
          
          <div className="lg:w-1/2 bg-white rounded-2xl p-6 md:p-8 shadow-md border-2 border-white animate-fade-in">
            <h3 className="text-xl font-serif font-bold mb-6 text-charcoal">Send us a message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 bg-neutral-50 hover:border-neutral-300 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 bg-neutral-50 hover:border-neutral-300 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Organisation / Affiliation (Optional)</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 bg-neutral-50 hover:border-neutral-300 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">I am reaching out about:</label>
                <select className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 bg-neutral-50 hover:border-neutral-300 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Contributing an Idea</option>
                  <option>Joining an Existing Idea</option>
                  <option>Becoming a Contributor</option>
                  <option>Collaboration</option>
                  <option>Research</option>
                  <option>Conversation / Podcast</option>
                  <option>Media</option>
                  <option>General Enquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Message</label>
                <textarea rows={3} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 bg-neutral-50 hover:border-neutral-300 text-sm font-semibold resize-none transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"></textarea>
              </div>
              <button className="w-full px-8 py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-secondary transition-colors shadow-sm cursor-pointer active:scale-95 text-sm uppercase tracking-wider">
                Start a Conversation
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="relative w-full py-24 px-6 md:px-12 lg:px-24 bg-cream rounded-3xl md:rounded-[3rem] overflow-hidden border-2 border-white">
        <CutTitle position="top-left">The People Building SvaBharat</CutTitle>
        
        <div className="mt-16 max-w-6xl mx-auto">
          <p className="text-xl font-serif font-bold text-charcoal mb-12 max-w-3xl leading-relaxed">
            SvaBharat is built by a team committed to creating space for original thought, meaningful conversations, and ideas that can shape the future.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-md border-2 border-white flex flex-col group hover:shadow-lg transition-all duration-300">
                <div className="w-20 h-20 bg-secondary-light rounded-full mb-6 flex items-center justify-center font-serif text-secondary text-2xl font-bold border border-secondary/20">
                  {i === 1 ? "SB" : i === 2 ? "RC" : "VK"}
                </div>
                <h4 className="text-xl font-serif font-bold mb-1 text-charcoal">Team Member</h4>
                <p className="text-primary font-bold text-xs uppercase tracking-wider mb-4">Position</p>
                <p className="text-neutral-600 mb-8 flex-grow font-semibold text-sm leading-relaxed">
                  Biography highlighting the person’s role, background, and areas of work. They ensure ideas find expression and movement happens on ground.
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-xs font-bold text-secondary hover:text-primary transition-colors uppercase tracking-wider">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  Connect on LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
