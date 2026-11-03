import { useState } from "react";
import { CutTitle } from "../components/CutTitle";
import { Navbar } from "../components/Navbar";

export function Ideas() {
  const [search, setSearch] = useState("");

const ideas = [
  "Reimagining the University",
  "The Purpose of Entrance Exams",
  "Knowledge Systems of Bharat",
];

const filteredIdeas = ideas.filter((idea) =>
  idea.toLowerCase().includes(search.toLowerCase())
);
  return (
    <div className="flex flex-col w-full gap-4 md:gap-8 lg:gap-10">
      <section className="relative w-full pt-32 pb-16 px-6 md:px-12 lg:px-24 bg-cream rounded-3xl md:rounded-[3rem] overflow-hidden border-2 border-white">
        <Navbar />
        
        {/* Background Idea Image aligned to the right boundary */}
        <div className="absolute right-0 bottom-2 w-[22%] hidden md:block pointer-events-none opacity-90 mix-blend-multiply">
          <img src="/idea.png" alt="Idea graphic" className="w-full h-auto" />
        </div>

        <div className="relative z-10 w-full md:w-[65%] mt-8 lg:mt-16">
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-[1.05] mb-6 text-charcoal">Ideas in motion</h1>
          <p className="text-lg md:text-xl text-neutral-700 max-w-2xl leading-relaxed">
            Explorations, propositions, and fundamental questions we are currently working on.
          </p>
        </div>
      </section>

      {/* All Ideas Section */}
      <section className="relative w-full py-24 px-6 md:px-12 lg:px-24 bg-cream-dark rounded-3xl md:rounded-[3rem] overflow-hidden border-2 border-white">
        <CutTitle position="top-left">All Ideas We Are Working On</CutTitle>
        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <input
            type="text"
            placeholder="Search ideas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-2/3 px-4 py-3 border-2 border-white bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-semibold transition-all"
          />

          <select className="w-full md:w-1/3 px-4 py-3 border-2 border-white bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm font-semibold transition-all">
            <option>All Categories</option>
            <option>Education</option>
            <option>Technology</option>
            <option>Society</option>
          </select>
        </div>
        
        <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIdeas.map((title, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-md border-2 border-white flex flex-col h-full group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="font-serif italic text-secondary text-lg mb-3">Idea {i + 1}</div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-charcoal group-hover:text-primary transition-colors">{title}</h3>
              <p className="text-neutral-700 mb-8 flex-grow text-[0.95rem] leading-relaxed">
                A bold proposition or fundamental question exploring the structural assumptions behind {title.toLowerCase()}.
              </p>
              
              <div className="space-y-3 mt-auto border-t border-neutral-200 pt-5">
                <a href="#" className="flex items-center justify-between text-sm font-semibold text-neutral-700 hover:text-primary transition-colors">
                  <span>Notion Note</span>
                  <span>↗</span>
                </a>
                <a href="#" className="flex items-center justify-between text-sm font-semibold text-neutral-700 hover:text-primary transition-colors">
                  <span>Idea Brief</span>
                  <span>↗</span>
                </a>
                <a href="#" className="flex items-center justify-between text-sm font-semibold text-neutral-700 hover:text-primary transition-colors">
                  <span>Conversations</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
