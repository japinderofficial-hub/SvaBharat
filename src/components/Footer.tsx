import { Link } from "react-router-dom";
import { Settings } from "lucide-react";


export function Footer() {
  return (
    <footer className="relative bg-transparent text-charcoal py-16 px-6 md:px-12 rounded-3xl md:rounded-[3rem] border-0 overflow-visible">
      {/* The actual card background container */}
      <div className="absolute inset-0 bg-cream-dark rounded-3xl md:rounded-[3rem] border-2 border-white z-0 pointer-events-none shadow-sm overflow-hidden flex items-end">
        <img 
          src="/img5.png?v=2" 
          alt="Footer Left Graphic" 
          className="w-96 md:w-[32rem] lg:w-[60%] xl:w-[70%] h-auto object-contain object-bottom mix-blend-multiply opacity-90 pointer-events-none transform translate-y-10 md:translate-y-16 lg:translate-y-24 xl:translate-y-32"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand & Mission */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <img src="/logo.png" alt="SvaBharat Logo" className="w-12 h-12 object-contain mix-blend-multiply" />
            <span className="font-serif font-extrabold text-xl tracking-wider text-primary">SvaBharat</span>
          </div>
          <p className="text-lg font-bold mb-4 font-serif text-charcoal">
            Think from the Sva.<br />Build for Bharat.
          </p>
          <p className="text-neutral-600 max-w-sm font-semibold text-sm leading-relaxed">
            A movement to question assumptions, think from first principles, and imagine new possibilities for Bharat.
          </p>
        </div>

        {/* Explore Links */}
        <div>
          <h4 className="font-serif font-bold text-lg mb-6 text-primary">Explore</h4>
          <ul className="space-y-3 text-neutral-700 text-sm">
            <li><Link to="/" className="hover:text-secondary transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-secondary transition-colors">About</Link></li>
            <li><Link to="/ideas" className="hover:text-secondary transition-colors">Ideas</Link></li>
            <li><Link to="/blogs" className="hover:text-secondary transition-colors">Blogs</Link></li>
            <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Participate & Connect Links */}
        <div>
          <h4 className="font-serif font-bold text-lg mb-6 text-primary">Participate</h4>
          <ul className="space-y-3 text-neutral-700 text-sm mb-8">
            <li><a href="#" className="hover:text-secondary transition-colors">Join the Movement</a></li>
            <li><Link to="/ideas" className="hover:text-secondary transition-colors">Contribute an Idea</Link></li>
            <li><Link to="/contact" className="hover:text-secondary transition-colors">Become a Contributor</Link></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Subscribe</a></li>
          </ul>
          
          <h4 className="font-serif font-bold text-lg mb-4 text-primary">Connect</h4>
          <ul className="space-y-3 text-neutral-700 text-sm">
            <li><a href="mailto:hello@svabharat.in" className="hover:text-secondary transition-colors">Email</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">LinkedIn</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Twitter / X</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="lg:col-span-1">
          <h4 className="font-serif font-bold text-lg mb-4 text-primary">Ideas worth thinking about.</h4>
          <p className="text-neutral-600 mb-6 text-sm font-semibold leading-relaxed">
            Receive new ideas, conversations, and reflections from the SvaBharat movement.
          </p>
          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              aria-label="Email address"
              required
              className="w-full px-5 py-3 rounded-full border border-charcoal/15 bg-white focus:outline-none focus:ring-2 focus:ring-charcoal/30 text-sm transition-shadow"
            />
            <button className="w-full px-4 py-3 rounded-full bg-charcoal text-cream-light text-sm font-semibold hover:bg-primary transition-colors cursor-pointer">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto mt-16 pt-8 border-t border-white/40 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500 font-semibold">
        <p className="text-charcoal font-semibold bg-cream-light/90 rounded-full px-4 py-1.5">© {new Date().getFullYear()} SvaBharat. All rights reserved.</p>
        <Link 
          to="/admin" 
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-neutral-50 border-2 border-white text-xs font-bold text-neutral-500 hover:text-primary transition-all shadow-sm cursor-pointer"
        >
          <Settings className="w-3.5 h-3.5" />
          Admin Portal
        </Link>
      </div>
    </footer>
  );
}
