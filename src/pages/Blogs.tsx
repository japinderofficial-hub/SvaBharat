import { useState, useEffect } from "react";
import { CutTitle } from "../components/CutTitle";
import { Navbar } from "../components/Navbar";
import { getBlogs, type Blog } from "../utils/storage";
import { X, Calendar, Clock, User, Tag } from "lucide-react";


export function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  useEffect(() => {
    // Initial fetch
    setBlogs(getBlogs());

    // Event listener for tab updates
    const handleUpdate = () => {
      setBlogs(getBlogs());
    };
    window.addEventListener("svabharat_blogs_updated", handleUpdate);
    return () => {
      window.removeEventListener("svabharat_blogs_updated", handleUpdate);
    };
  }, []);

  return (
    <div className="flex flex-col w-full gap-4 md:gap-8 lg:gap-10">
      {/* Page Header */}
      <section className="relative w-full pt-36 md:pt-44 pb-16 px-6 md:px-12 lg:px-24 bg-cream rounded-3xl md:rounded-[3rem] overflow-hidden border-2 border-white">
        <Navbar />
        <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-[1.05] mb-6 text-charcoal">Thinking in public</h1>
        <p className="text-lg md:text-xl text-neutral-700 max-w-2xl leading-relaxed">
          Essays, reflections, questions, field observations, and emerging perspectives.
        </p>
      </section>

      {/* Blogs Section */}
      <section className="relative w-full py-24 px-6 md:px-12 lg:px-24 bg-cream-dark rounded-3xl md:rounded-[3rem] overflow-hidden min-h-[60vh] border-2 border-white">
        <CutTitle position="top-left">All Blogs</CutTitle>
        
        <div className="mt-16 max-w-5xl mx-auto">
          <p className="text-xl font-serif font-bold text-charcoal mb-12">
            SvaBharat is a space for ideas before certainty.
          </p>
          
          <div className="space-y-8">
            {blogs.map((blog) => (
              <div 
                key={blog.id} 
                onClick={() => setSelectedBlog(blog)}
                className="bg-white rounded-2xl p-8 md:p-10 shadow-md border-2 border-white flex flex-col md:flex-row gap-8 items-start group hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in"
              >
                {/* Blog Cover Image */}
                <div className="w-full md:w-1/3 aspect-[4/3] rounded-xl overflow-hidden border-2 border-white/60 flex-shrink-0">
                  {blog.coverPhoto.startsWith("linear-gradient") ? (
                    <div 
                      className="w-full h-full group-hover:scale-105 transition-transform duration-500" 
                      style={{ background: blog.coverPhoto }}
                    />
                  ) : (
                    <img 
                      src={blog.coverPhoto} 
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                
                {/* Blog Card Info */}
                <div className="flex-1 flex flex-col justify-center h-full">
                  <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-neutral-500 font-semibold mb-4">
                    <span className="inline-flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-primary" />
                      {blog.authorName}
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric"
                      })}
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {blog.readTime}
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1 text-secondary bg-secondary-light px-2.5 py-0.5 rounded-full font-bold">
                      <Tag className="w-3 h-3" />
                      {blog.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-charcoal group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  
                  <p className="text-neutral-700 text-base leading-relaxed mb-8 line-clamp-2">
                    {blog.excerpt}
                  </p>
                  
                  <div className="mt-auto">
                    <span className="inline-flex items-center text-sm font-semibold text-charcoal underline decoration-charcoal/30 underline-offset-[6px] group-hover:decoration-charcoal transition-colors">
                      Read the essay
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {blogs.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-white p-8 shadow-md">
                <p className="text-neutral-500 font-bold text-lg">No published articles yet. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FULL BLOG VIEW OVERLAY MODAL */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-charcoal-deep/60 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in">
          <div className="bg-white w-full max-w-4xl max-h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border-2 border-white animate-slide-up">
            {/* Header / Cover Area */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden flex-shrink-0 flex items-end">
              {selectedBlog.coverPhoto.startsWith("linear-gradient") ? (
                <div className="absolute inset-0 w-full h-full" style={{ background: selectedBlog.coverPhoto }} />
              ) : (
                <img src={selectedBlog.coverPhoto} alt="" className="absolute inset-0 w-full h-full object-cover" />
              )}
              {/* Cover dim overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedBlog(null)}
                className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer border border-white/10 z-10"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title inside cover */}
              <div className="relative p-6 sm:p-10 w-full text-white z-10">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-primary text-white mb-3 tracking-wider uppercase">
                  {selectedBlog.category}
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-extrabold tracking-tight leading-tight">
                  {selectedBlog.title}
                </h2>
              </div>
            </div>

            {/* Meta bar */}
            <div className="bg-cream-dark/40 px-6 sm:px-10 py-4 border-b border-white/40 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-neutral-600 font-semibold">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-primary" />
                <span>{selectedBlog.authorName}</span>
                <span className="text-neutral-400 font-bold text-xs">({selectedBlog.authorDesignation})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" />
                <span>
                  {new Date(selectedBlog.createdAt).toLocaleDateString("en-US", {
                    month: "long", day: "numeric", year: "numeric"
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                <span>{selectedBlog.readTime}</span>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-8 leading-relaxed max-w-none text-charcoal text-base sm:text-lg bg-cream/20">
              <div 
                dangerouslySetInnerHTML={{ __html: selectedBlog.content }} 
                className="rich-text-content"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Blogs;
