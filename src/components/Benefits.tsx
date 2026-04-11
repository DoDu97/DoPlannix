const BENEFITS = [
  {
    icon: '⚡',
    title: 'Instant Access',
    desc: 'Once you pay, your template is ready to use immediately. No waiting, no unnecessary steps.',
    delay: '0s',
  },
  {
    icon: '🎯',
    title: 'Ready to Use',
    desc: 'Every template is designed so you can start right away. Just add your own data and the system runs.',
    delay: '0.06s',
  },
  {
    icon: '🖱️',
    title: 'Easy to Use',
    desc: 'Clear and intuitive — you\'ll find your way quickly and start without any fumbling around.',
    delay: '0.12s',
  },
  {
    icon: '📱',
    title: 'Works on All Devices',
    desc: 'Use Notion on your phone, tablet, or computer. Access your system anytime, from anywhere.',
    delay: '0.18s',
  },
  {
    icon: '🧩',
    title: 'Everything in One Place',
    desc: 'Instead of multiple apps, all your tasks, finances, planning, and projects are together and under control.',
    delay: '0.24s',
  },
  {
    icon: '⏱️',
    title: 'Save Time',
    desc: 'No need to build anything from scratch. You get a ready-made system that saves you time and energy right from the start.',
    delay: '0.30s',
  },
]

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="relative z-10 py-20 md:py-28 px-6 md:px-14"
      style={{ background: '#0a0a0a' }}
    >
      {/* section header */}
      <div className="text-center mb-14">
        <p className="section-label">What you get</p>
        <h2
          className="font-black tracking-tight leading-[1.12] mb-3"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
        >
          A system you can start using<br />
          <span className="text-gold-glow">from day one</span>
        </h2>
        <p className="text-dim text-base max-w-lg mx-auto leading-relaxed">
          No complex setup. Simply add the template to Notion and you&apos;re
          ready to go in minutes.
        </p>
      </div>

      {/* grid */}
      <div
        className="grid gap-4 max-w-5xl mx-auto"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}
      >
        {BENEFITS.map((b) => (
          <div
            key={b.title}
            data-animate
            className="bg-card border border-stroke rounded-2xl p-6 flex gap-4 items-start transition-all duration-300 hover:border-[rgba(201,168,76,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            style={{ transitionDelay: b.delay }}
          >
            <div className="w-11 h-11 rounded-xl bg-[rgba(201,168,76,0.12)] border border-[rgba(201,168,76,0.2)] flex items-center justify-center text-xl flex-shrink-0">
              {b.icon}
            </div>
            <div>
              <h4 className="font-bold text-[0.95rem] mb-1.5">{b.title}</h4>
              <p className="text-dim text-[0.83rem] leading-relaxed">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
