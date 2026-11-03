import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CutTitle } from "../components/CutTitle";
import { Navbar } from "../components/Navbar";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

const principles = [
  "Question inherited assumptions before accepting inherited answers.",
  "Return to what is fundamentally true on the ground.",
  "Build responses that are rooted, open, and useful.",
];

const contributors = [
  {
    name: "Researchers",
    role: "Patterns and evidence",
    text: "They reveal long arcs, hidden structures, and the context needed for better public imagination.",
  },
  {
    name: "Practitioners",
    role: "Ground reality",
    text: "They carry the lived knowledge of classrooms, farms, workshops, communities, and institutions.",
  },
  {
    name: "Builders",
    role: "New possibilities",
    text: "They translate questions into prototypes, ventures, systems, and tools that can be tested.",
  },
];

export function About() {
  return (
    <div className="flex w-full flex-col gap-4 md:gap-8 lg:gap-10">
      <section className="relative w-full overflow-hidden rounded-3xl bg-cream px-6 pb-16 pt-32 md:rounded-[3rem] md:px-12 lg:px-24 border-2 border-white">
        <Navbar />
        <motion.div {...fadeUp} className="max-w-4xl">
          <p className="mb-5 font-serif italic text-lg text-secondary">About SvaBharat</p>
          <h1 className="mb-6 text-5xl font-serif font-bold tracking-tight leading-[1.05] md:text-7xl text-charcoal">
            Thinking from our own centre.
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-neutral-700 md:text-xl">
            SvaBharat is a movement for original thought, rooted inquiry, and public imagination
            shaped by Bharat's own realities.
          </p>
        </motion.div>
      </section>

      <section className="relative w-full overflow-hidden rounded-3xl bg-cream px-6 py-24 md:rounded-[3rem] md:px-12 lg:px-24 border-2 border-white">
        <CutTitle position="top-left">Our Philosophy</CutTitle>
        <motion.div {...fadeUp} className="mx-auto mt-16 grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6 text-lg leading-relaxed text-neutral-700">
            <p className="text-2xl font-serif font-bold leading-snug text-charcoal">
              Before we build the future, we must ask where our thinking begins.
            </p>
            <p>
              SvaBharat begins with a simple conviction: Bharat should learn from the world
               without losing the ability to think, judge, adapt, and create from its own centre.
            </p>
            <p>
              This is not isolation. It is not nostalgia. It is the discipline of remaining rooted
              while staying open, and the courage to ask better questions when borrowed frameworks
              do not explain the life around us.
            </p>
            <p className="pt-4 text-2xl md:text-3xl font-serif italic leading-snug text-charcoal">
              “What becomes possible when Bharat studies itself with clarity and builds with
              confidence?”
            </p>
          </div>
          <div className="lg:pt-2">
            <p className="mb-4 font-serif italic text-lg text-secondary">Philosophy in practice</p>
            <ol>
              {principles.map((item, index) => (
                <li key={item} className="grid grid-cols-[2rem_1fr] gap-x-3 py-5 border-t border-charcoal/15 last:border-b">
                  <span className="font-serif italic text-xl leading-none text-secondary pt-0.5">{index + 1}</span>
                  <p className="text-charcoal text-base leading-relaxed">{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      </section>

      <section className="relative w-full overflow-hidden rounded-3xl bg-cream-dark px-6 py-24 md:rounded-[3rem] md:px-12 lg:px-24 border-2 border-white">
        <CutTitle position="top-left">Meaning of Sva</CutTitle>
        <motion.div {...fadeUp} className="mx-auto mt-16 max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 border-2 border-white shadow-md">
              <p className="mb-4 font-serif italic text-lg text-secondary">Sva</p>
              <h2 className="mb-4 text-4xl font-serif font-bold text-charcoal">Self. Own. One's own.</h2>
              <p className="leading-relaxed text-neutral-700 text-[0.95rem]">
                Sva points to agency, rootedness, discernment, and the ability to see the world
                without surrendering one's own standpoint.
              </p>
            </div>
            <div className="rounded-2xl bg-charcoal-deep p-8 text-white border-2 border-white/10 shadow-md">
              <p className="mb-4 font-serif italic text-lg text-cream-deep">Bharat</p>
              <h2 className="mb-4 text-4xl font-serif font-bold text-white">Land. People. Civilisation.</h2>
              <p className="leading-relaxed text-neutral-300 text-[0.95rem]">
                Bharat holds memory and possibility together: the inherited, the living, and the
                future still waiting to be imagined.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative w-full overflow-hidden rounded-3xl bg-cream px-6 py-24 md:rounded-[3rem] md:px-12 lg:px-24 border-2 border-white">
        <CutTitle position="top-left">Logo Explanation</CutTitle>
        <motion.div {...fadeUp} className="mx-auto mt-16 grid max-w-5xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex justify-center">
            <div className="rounded-full bg-white p-10 shadow-md border-2 border-white">
              <img src="/logo.png" alt="SvaBharat logo" className="h-44 w-44 object-contain mix-blend-multiply" />
            </div>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-neutral-700">
            <p>
              The logo is treated as a symbol of rooted openness: a centre that holds, and a form
              that remains in motion.
            </p>
            <p>
              It reflects the idea that original thought does not begin by rejecting the world. It
              begins by knowing where one stands, then engaging widely with confidence.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="relative w-full overflow-hidden rounded-3xl bg-cream-dark px-6 py-24 md:rounded-[3rem] md:px-12 lg:px-24 border-2 border-white">
        <CutTitle position="top-left">First Principles Thinking</CutTitle>
        <motion.div {...fadeUp} className="mx-auto mt-16 max-w-5xl">
          <h2 className="mb-10 max-w-3xl text-4xl font-serif font-bold leading-tight tracking-tight text-charcoal">
            We begin not with how things are usually done, but with what must be true.
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Question the given", text: "Name the assumptions a system takes for granted, and ask where each one came from." },
              { title: "Return to fundamentals", text: "Strip a problem back to what is true on the ground: people, needs, constraints, purpose." },
              { title: "Build anew", text: "Rebuild from those truths, in forms that fit Bharat's context and can be tested in practice." },
            ].map((item, i) => (
              <div key={item.title} className="border-t border-charcoal/20 pt-5">
                <p className="mb-3 font-serif italic text-xl text-secondary">{i + 1}</p>
                <h3 className="mb-3 text-2xl font-serif font-bold text-charcoal">{item.title}</h3>
                <p className="leading-relaxed text-neutral-700 text-[0.95rem]">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── BRINGING EVERYONE TOGETHER ── */}
      <section className="relative w-full overflow-hidden rounded-3xl bg-cream px-6 py-24 md:rounded-[3rem] md:px-12 lg:px-24 border-2 border-white">
        <CutTitle position="top-left">Bringing Everyone Together</CutTitle>
        <motion.div {...fadeUp} className="mx-auto mt-16 max-w-5xl">
          <p className="mb-12 max-w-3xl text-2xl md:text-3xl font-serif font-bold leading-snug text-charcoal">
            Bharat cannot be reimagined by a few. There is space here for every person carrying a question that refuses to leave them.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {[
              { who: "Students & Teachers", desc: "Questioning textbooks and building new frameworks for learning." },
              { who: "Researchers & Writers", desc: "Producing rigorous, grounded knowledge from within Bharat's own experience." },
              { who: "Entrepreneurs & Technologists", desc: "Building solutions that emerge from context, not just borrowed templates." },
              { who: "Public Servants & Practitioners", desc: "Translating ideas into policy, institutions, and real change on the ground." },
              { who: "Artists & Storytellers", desc: "Shaping imagination, culture, and the stories a society tells about itself." },
              { who: "Communities & Builders", desc: "Bringing lived wisdom, deep roots, and the credibility of practice." },
            ].map((item) => (
              <div key={item.who} className="rounded-2xl bg-cream-light p-6 flex flex-col gap-2">
                <p className="text-lg font-bold text-charcoal font-serif">{item.who}</p>
                <p className="text-sm text-neutral-700 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="max-w-2xl text-xl md:text-2xl font-serif italic text-charcoal leading-snug">
            SvaBharat is not a platform for experts alone. It is a movement for everyone who believes that ideas rooted in Bharat's own soil can change the world.
          </p>
        </motion.div>
      </section>

      <section className="relative w-full overflow-hidden rounded-3xl bg-charcoal-deep px-6 py-24 text-white md:rounded-[3rem] md:px-12 lg:px-24 border-2 border-white/10">
        <CutTitle position="top-left" className="!bg-charcoal-deep !shadow-none [&>div]:!text-white [&_svg]:!fill-charcoal-deep">
          The Movement
        </CutTitle>
        <motion.div {...fadeUp} className="mx-auto mt-16 max-w-5xl">
          <p className="mb-10 max-w-4xl text-3xl font-serif font-bold leading-snug text-neutral-100 md:text-5xl">
            SvaBharat is for people carrying questions that are{" "}
            <span className="italic font-medium text-cream-deep">too important to leave unanswered.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://tally.so/r/jaRrya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-cream-light text-charcoal text-sm font-semibold hover:bg-white transition-colors"
            >
              Join the movement
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-neutral-200 text-sm font-semibold underline decoration-white/30 underline-offset-[6px] hover:decoration-white transition-colors"
            >
              Bring us a question
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="relative w-full overflow-hidden rounded-3xl bg-cream px-6 py-24 md:rounded-[3rem] md:px-12 lg:px-24 border-2 border-white">
        <CutTitle position="top-left">Contributors</CutTitle>
        <motion.div {...fadeUp} className="mx-auto mt-16 max-w-6xl">
          <div className="mb-12 max-w-3xl space-y-5 text-lg leading-relaxed text-neutral-700">
            <p>
              SvaBharat is shaped by many kinds of intelligence. Expertise matters, but insight is
              not limited to credentials.
            </p>
            <p>
              The movement creates space for people who can connect lived experience, disciplined
              study, and practical building.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {contributors.map((person) => (
              <div key={person.name} className="border-t border-charcoal/20 pt-5">
                <h3 className="mb-1 text-2xl font-serif font-bold text-charcoal">{person.name}</h3>
                <p className="mb-4 font-serif italic text-secondary">{person.role}</p>
                <p className="leading-relaxed text-neutral-700 text-[0.95rem]">{person.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
