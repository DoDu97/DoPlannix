const AUDIENCE = [
  {
    emoji: '🚀',
    tag: 'Podnikatel / Freelancer',
    title: 'Řídíš vlastní business a projekty',
    desc: 'Máš klienty, úkoly, termíny i finance na několika místech a potřebuješ systém, který ti pomůže udržet pořádek a mít vše důležité pod kontrolou.',
    delay: '0s',
  },
  {
    emoji: '💼',
    tag: 'Zaměstnanec',
    title: 'Chceš být produktivnější',
    desc: 'Řešíš pracovní úkoly, osobní cíle i běžné povinnosti a hledáš způsob, jak si vše lépe uspořádat a mít jasněji v tom, co je opravdu důležité.',
    delay: '0.08s',
  },
  {
    emoji: '📚',
    tag: 'Student',
    title: 'Studuješ a buduješ návyky',
    desc: 'Uspořádej si studium, úkoly, výdaje i osobní cíle do jednoho přehledného systému, který ti pomůže fungovat každý den.',
    delay: '0.16s',
  },
]

export default function Audience() {
  return (
    <section
      className="relative z-10 py-20 md:py-28 px-6 md:px-14"
      style={{ background: '#141414' }}
    >
      {/* header */}
      <div className="text-center mb-14">
        <p className="section-label">Pro koho to je</p>
        <h2
          className="font-black tracking-tight leading-[1.12] mb-3"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
        >
          Systém pro lidi, kteří chtějí mít{' '}
          <span className="text-gold-glow">vše pod kontrolou</span>
        </h2>
        <p className="text-dim text-base max-w-xl mx-auto leading-relaxed">
          DoPlannix je určený pro každého, kdo chce lépe zvládat práci, finance,
          plánování a mít své cíle vždy po ruce.
        </p>
      </div>

      {/* cards */}
      <div
        className="grid gap-5 max-w-5xl mx-auto"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
      >
        {AUDIENCE.map((a) => (
          <div
            key={a.tag}
            data-animate
            className="bg-noir border border-stroke rounded-2xl p-8 text-center transition-all duration-300 hover:border-[rgba(201,168,76,0.35)] hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
            style={{ transitionDelay: a.delay }}
          >
            <span className="text-[2.4rem] mb-4 block">{a.emoji}</span>
            <span
              className="inline-block text-[0.65rem] font-bold tracking-[0.1em] uppercase px-3 py-1 rounded-full mb-4"
              style={{
                background: 'rgba(201,168,76,0.12)',
                border: '1px solid rgba(201,168,76,0.25)',
                color: '#c9a84c',
              }}
            >
              {a.tag}
            </span>
            <h4 className="font-bold text-base mb-3">{a.title}</h4>
            <p className="text-dim text-[0.83rem] leading-relaxed">{a.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
