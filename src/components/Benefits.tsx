const BENEFITS = [
  {
    icon: '⚡',
    title: 'Okamžitý přístup',
    desc: 'Po zaplacení máš šablonu ihned k dispozici a můžeš ji rovnou začít používat. Bez čekání, bez zbytečných kroků.',
    delay: '0s',
  },
  {
    icon: '🎯',
    title: 'Připraveno k použití',
    desc: 'Každá šablona je navržena tak, abys mohl začít hned. Stačí doplnit vlastní data a systém jede.',
    delay: '0.06s',
  },
  {
    icon: '🖱️',
    title: 'Jednoduché ovládání',
    desc: 'Přehledné a intuitivní — zorientuješ se rychle a začneš používat bez zbytečného tápání.',
    delay: '0.12s',
  },
  {
    icon: '📱',
    title: 'Funguje na všech zařízeních',
    desc: 'Používej Notion na mobilu, tabletu i počítači. Ke svému systému se dostaneš kdykoliv a odkudkoliv.',
    delay: '0.18s',
  },
  {
    icon: '🧩',
    title: 'Vše na jednom místě',
    desc: 'Místo několika aplikací máš všechny úkoly, finance, plánování i projekty pohromadě a pod kontrolou.',
    delay: '0.24s',
  },
  {
    icon: '⏱️',
    title: 'Úspora času',
    desc: 'Nemusíš nic stavět od nuly. Dostaneš hotový systém, který ti ušetří čas i energii hned od začátku.',
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
        <p className="section-label">Co dostaneš</p>
        <h2
          className="font-black tracking-tight leading-[1.12] mb-3"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
        >
          Systém, který můžeš začít používat<br />
          <span className="text-gold-glow">hned od prvního dne</span>
        </h2>
        <p className="text-dim text-base max-w-lg mx-auto leading-relaxed">
          Žádné složité nastavování. Šablonu si jednoduše přidáš do Notionu a
          během pár minut můžeš začít.
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
