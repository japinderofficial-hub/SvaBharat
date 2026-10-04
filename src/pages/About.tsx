import { motion } from "framer-motion";
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
          <p className="mb-5 text-sm font-bold uppercase tracking-wider text-primary">About SvaBharat</p>
          <h1 className="mb-6 text-5xl font-serif font-extrabold tracking-tight md:text-7xl text-charcoal">
            Thinking from our own centre.
          </h1>
          <p className="max-w-3xl text-xl font-serif font-bold leading-relaxed text-neutral-600 md:text-2xl">
            SvaBharat is a movement for original thought, rooted inquiry, and public imagination
            shaped by Bharat's own realities.
          </p>
        </motion.div>
      </section>

      <section className="relative w-full overflow-hidden rounded-3xl bg-cream px-6 py-24 md:rounded-[3rem] md:px-12 lg:px-24 border-2 border-white">
        <CutTitle position="top-left">Our Philosophy</CutTitle>
        <motion.div {...fadeUp} className="mx-auto mt-16 grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6 text-lg font-semibold leading-relaxed text-neutral-600">
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
            <p className="border-l-4 border-secondary pl-6 text-2xl font-serif font-bold text-charcoal bg-white/40 p-4 rounded-r-xl">
              What becomes possible when Bharat studies itself with clarity and builds with
              confidence?
            </p>
          </div>
          <div className="rounded-2xl border-2 border-white bg-white p-8 shadow-md">
            <p className="mb-6 text-xs font-bold uppercase tracking-widest text-neutral-400">Philosophy in practice</p>
            <div className="space-y-4">
              {principles.map((item, index) => (
                <div key={item} className="flex gap-4 rounded-xl bg-cream p-5 border border-white/40">
                  <span className="text-sm font-extrabold text-secondary">0{index + 1}</span>
                  <p className="text-charcoal font-semibold text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative w-full overflow-hidden rounded-3xl bg-cream-dark px-6 py-24 md:rounded-[3rem] md:px-12 lg:px-24 border-2 border-white">
        <CutTitle position="top-left">Meaning of Sva</CutTitle>
        <motion.div {...fadeUp} className="mx-auto mt-16 max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 border-2 border-white shadow-md">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-neutral-450">Sva</p>
              <h2 className="mb-4 text-4xl font-serif font-extrabold text-charcoal">Self. Own. One's own.</h2>
              <p className="font-semibold leading-relaxed text-neutral-600 text-sm">
                Sva points to agency, rootedness, discernment, and the ability to see the world
                without surrendering one's own standpoint.
              </p>
            </div>
            <div className="rounded-2xl bg-charcoal-deep p-8 text-white border-2 border-white/10 shadow-md">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-neutral-400">Bharat</p>
              <h2 className="mb-4 text-4xl font-serif font-extrabold text-white">Land. People. Civilisation.</h2>
              <p className="font-semibold leading-relaxed text-neutral-300 text-sm">
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
          <div className="space-y-5 text-lg font-semibold leading-relaxed text-neutral-600">
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
          <h2 className="mb-10 max-w-3xl text-4xl font-serif font-extrabold leading-tight tracking-tight text-charcoal">
            We begin not with how things are usually done, but with what must be true.
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {["Question the given", "Return to fundamentals", "Build anew"].map((item) => (
              <div key={item} className="rounded-2xl bg-white p-8 border-2 border-white shadow-md">
                <h3 className="mb-4 text-2xl font-serif font-bold text-charcoal">{item}</h3>
                <p className="font-semibold leading-relaxed text-neutral-600 text-sm">
                  A working discipline for moving from inherited assumptions to new possibilities.
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── BRINGING EVERYONE TOGETHER ── */}
      <section className="relative w-full overflow-hidden rounded-3xl bg-cream px-6 py-24 md:rounded-[3rem] md:px-12 lg:px-24 border-2 border-white">
        <CutTitle position="top-left">Bringing Everyone Together</CutTitle>
        <motion.div {...fadeUp} className="mx-auto mt-16 max-w-5xl">
          <p className="mb-12 max-w-3xl text-2xl md:text-3xl font-serif font-extrabold leading-snug text-charcoal">
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
              <div key={item.who} className="rounded-2xl bg-white p-6 border-2 border-white shadow-sm flex flex-col gap-2">
                <p className="flex items-center gap-2 text-sm font-extrabold text-charcoal font-serif">
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                  {item.who}
                </p>
                <p className="text-xs text-neutral-600 font-semibold leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="border-l-4 border-primary pl-6 py-2 bg-white/40 rounded-r-xl max-w-2xl">
            <p className="text-lg md:text-xl font-serif font-bold text-charcoal leading-snug">
              SvaBharat is not a platform for experts alone. It is a movement for everyone who believes that ideas rooted in Bharat's own soil can change the world.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="relative w-full overflow-hidden rounded-3xl bg-charcoal-deep px-6 py-24 text-white md:rounded-[3rem] md:px-12 lg:px-24 border-2 border-white/10">
        <CutTitle position="top-left" className="!bg-charcoal-deep !text-white [&_svg]:!fill-charcoal-deep">
          The Movement
        </CutTitle>
        <motion.div {...fadeUp} className="mx-auto mt-16 max-w-5xl">
          <p className="mb-12 max-w-4xl text-3xl font-serif font-bold leading-snug text-neutral-100 md:text-5xl">
            SvaBharat is for people carrying questions that are too important to leave unanswered.
          </p>
          <div className="grid gap-4 text-neutral-300 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Students and teachers",
              "Researchers and writers",
              "Entrepreneurs and technologists",
              "Public servants and practitioners",
              "Artists and storytellers",
              "Communities building from experience",
            ].map((item) => (
              <p key={item} className="rounded-xl border border-white/10 p-5 font-semibold text-sm hover:bg-white/5 transition-colors">
                {item}
              </p>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="relative w-full overflow-hidden rounded-3xl bg-cream px-6 py-24 md:rounded-[3rem] md:px-12 lg:px-24 border-2 border-white">
        <CutTitle position="top-left">Contributors</CutTitle>
        <motion.div {...fadeUp} className="mx-auto mt-16 max-w-6xl">
          <div className="mb-12 max-w-3xl space-y-5 text-lg font-semibold leading-relaxed text-neutral-600">
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
              <div key={person.name} className="rounded-2xl bg-white p-8 shadow-md border-2 border-white flex flex-col justify-between">
                <div>
                  <div className="mb-6 h-14 w-14 rounded-full bg-secondary-light flex items-center justify-center font-bold text-secondary text-xl font-serif border border-secondary/20">
                    {person.name[0]}
                  </div>
                  <h3 className="mb-1 text-2xl font-serif font-bold text-charcoal">{person.name}</h3>
                  <p className="mb-5 text-xs font-bold uppercase tracking-widest text-primary">{person.role}</p>
                </div>
                <p className="font-semibold leading-relaxed text-neutral-600 text-sm mt-2">{person.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
