const AUDIENCE = [
  {
    emoji: '🚀',
    tag: 'Entrepreneur / Freelancer',
    title: 'You run your own business and projects',
    desc: 'You have clients, tasks, deadlines, and finances spread across multiple places and need a system to help you stay organized and keep everything important under control.',
    delay: '0s',
  },
  {
    emoji: '💼',
    tag: 'Employee',
    title: 'You want to be more productive',
    desc: 'You handle work tasks, personal goals, and everyday responsibilities, and you\'re looking for a way to organize everything better and get clearer on what really matters.',
    delay: '0.08s',
  },
  {
    emoji: '📚',
    tag: 'Student',
    title: 'You\'re studying and building habits',
    desc: 'Organize your studies, tasks, expenses, and personal goals into one clear system that helps you function every single day.',
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
        <p className="section-label">Who it&apos;s for</p>
        <h2
          className="font-black tracking-tight leading-[1.12] mb-3"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
        >
          A system for people who want to{' '}
          <span className="text-gold-glow">stay in control</span>
        </h2>
        <p className="text-dim text-base max-w-xl mx-auto leading-relaxed">
          DoPlannix is for anyone who wants to better manage their work, finances,
          planning, and always have their goals at hand.
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
