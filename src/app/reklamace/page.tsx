import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Reklamace a vrácení — DoPlannix',
  description: 'Zásady vrácení peněz a reklamační podmínky pro digitální produkty DoPlannix.',
}

const sections = [
  {
    title: 'Zásady vrácení peněz',
    content: `U digitálních produktů DoPlannix nabízíme 30denní garanci vrácení peněz od data nákupu.`,
    note: 'Pokud narazíš na problém s produktem nebo produkt nebude fungovat podle popisu, můžeš nás kontaktovat do 30 dní od zakoupení a požádat o vrácení peněz.',
  },
  {
    title: 'Jak požádat o vrácení peněz',
    email: true,
    emailNote: 'Do zprávy prosím uveď:',
    list: [
      'číslo objednávky,',
      'e-mail použitý při nákupu,',
      'stručný popis problému.',
    ],
  },
  {
    title: 'Kdy může být refundace schválena',
    content: `Žádost o vrácení peněz může být schválena zejména v případě, že:`,
    list: [
      'produkt nefunguje tak, jak je popsáno na webu,',
      'technický problém brání přístupu k produktu,',
      'technický problém znemožňuje běžné používání produktu.',
    ],
  },
  {
    title: 'Kdy refundace nebude poskytnuta',
    content: `Vrácení peněz se obvykle nevztahuje na tyto situace:`,
    list: [
      'změna názoru po nákupu,',
      'produkt nebyl používán,',
      'zákazník očekával funkce, které nebyly uvedeny na produktové stránce,',
      'žádost byla podána po uplynutí 30 dní od nákupu,',
      'problém vznikl v důsledku nesprávného používání, vlastních úprav nebo zásahu do struktury produktu.',
    ],
  },
  {
    title: 'Digitální produkty a vrácení',
    content: `Produkty DoPlannix jsou dodávány výhradně v digitální podobě a zpřístupněny krátce po zaplacení. Z tohoto důvodu není možné „vrácení" produktu stejným způsobem jako u fyzického zboží.

Jakmile je produkt doručen na e-mail uvedený při objednávce nebo je zákazníkovi zpřístupněn ke stažení či použití, považuje se za dodaný.`,
  },
  {
    title: 'Zpracování refundace',
    content: `Pokud bude refundace schválena, částka bude vrácena původní platební metodou.`,
    note: 'Doba zpracování se může lišit podle poskytovatele platby nebo banky, zpravidla však trvá 3 až 15 pracovních dní.',
  },
  {
    title: 'Pomoc s přístupem k produktu',
    content: `Pokud budeš mít problém s doručením, přístupem nebo spuštěním produktu, napiš nám na `,
    helpEmail: true,
  },
  {
    title: 'Zneužití refundací',
    content: `Vyhrazujeme si právo odmítnout refundaci nebo budoucí objednávky v případě opakovaného nebo zjevně účelového zneužívání těchto zásad vrácení peněz.`,
  },
  {
    title: 'Kontakt',
    content: `V případě dotazů ohledně vrácení peněz nás kontaktuj na:`,
    contactEmail: true,
  },
]

export default function Reklamace() {
  return (
    <div className="min-h-screen bg-noir text-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-stroke/50 bg-noir/80 backdrop-blur-md px-6 md:px-14 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/dp_black.png"
            alt="DoPlannix"
            width={36}
            height={36}
            className="h-9 w-auto"
            style={{ filter: 'invert(1) brightness(0.85)' }}
          />
          <span className="text-[1.1rem] font-bold tracking-[0.05em] text-white">
            DoPlannix
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm text-dim hover:text-white transition-colors flex items-center gap-1.5"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Zpět na web
        </Link>
      </nav>

      {/* Hero */}
      <div className="px-6 md:px-14 pt-16 pb-12 border-b border-stroke/30">
        <div className="max-w-3xl mx-auto">
          <p className="section-label mb-4">Právní dokumenty</p>
          <h1 className="font-black tracking-tight text-white mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
            Reklamace a vrácení
          </h1>
          <p className="text-dim leading-relaxed">
            Zásady vrácení peněz a reklamační podmínky pro digitální produkty zakoupené na webu DoPlannix.
          </p>

          {/* Garance badge */}
          <div className="mt-8 inline-flex items-center gap-3 border border-gold/30 rounded-xl px-5 py-3.5" style={{ background: 'var(--gold-dim-bg)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold shrink-0">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <div>
              <p className="text-gold font-bold text-sm">30denní garance vrácení peněz</p>
              <p className="text-dim text-xs mt-0.5">Bez zbytečných otázek, pokud produkt nefunguje podle popisu.</p>
            </div>
          </div>

          <p className="text-dim/50 text-sm mt-6">Poslední aktualizace: 27. 03. 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-14 py-16">
        <div className="max-w-3xl mx-auto space-y-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-white font-bold text-lg mb-4 pb-3 border-b border-stroke/40">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.content && !section.helpEmail && (
                  section.content.split('\n\n').map((para, i) => (
                    <p key={i} className="text-dim leading-relaxed">{para}</p>
                  ))
                )}
                {section.email && (
                  <p className="text-dim leading-relaxed">
                    Pro podání žádosti o vrácení peněz nás kontaktuj na e-mailu:{' '}
                    <a href="mailto:hello@doplannix.com" className="text-gold hover:text-gold-glow transition-colors">
                      hello@doplannix.com
                    </a>
                  </p>
                )}
                {section.emailNote && (
                  <p className="text-dim leading-relaxed">{section.emailNote}</p>
                )}
                {section.helpEmail && (
                  <p className="text-dim leading-relaxed">
                    Pokud budeš mít problém s doručením, přístupem nebo spuštěním produktu, napiš nám na{' '}
                    <a href="mailto:hello@doplannix.com" className="text-gold hover:text-gold-glow transition-colors">
                      hello@doplannix.com
                    </a>
                    {' '}a pokusíme se problém co nejrychleji vyřešit.
                  </p>
                )}
                {section.contactEmail && (
                  <p className="text-dim leading-relaxed">
                    <a href="mailto:hello@doplannix.com" className="text-gold hover:text-gold-glow transition-colors">
                      hello@doplannix.com
                    </a>
                  </p>
                )}
                {section.list && (
                  <ul className="space-y-2 pl-1">
                    {section.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-dim leading-relaxed">
                        <span className="mt-[0.4rem] h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {section.note && (
                  <p className="text-dim/80 leading-relaxed italic border-l-2 border-gold/30 pl-4">
                    {section.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-stroke px-6 md:px-14 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
          <Link href="/obchodni-podminky" className="text-[0.78rem] text-dim/60 hover:text-gold transition-colors">
            Obchodní podmínky
          </Link>
          <Link href="/reklamace" className="text-[0.78rem] text-dim/60 hover:text-gold transition-colors">
            Reklamace a vrácení
          </Link>
          <Link href="/gdpr" className="text-[0.78rem] text-dim/60 hover:text-gold transition-colors">
            Ochrana osobních údajů
          </Link>
        </div>
        <p className="text-[0.78rem] text-dim/60 text-center md:text-right">
          © {new Date().getFullYear()} DoPlannix. Všechna práva vyhrazena.
        </p>
      </footer>
    </div>
  )
}
