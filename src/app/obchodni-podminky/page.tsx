import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Obchodní podmínky — DoPlannix',
  description: 'Obchodní podmínky pro nákup digitálních produktů na webu DoPlannix.',
}

const sections = [
  {
    title: '1. Úvod',
    content: `Tyto obchodní podmínky upravují vztah mezi provozovatelem webu DoPlannix a zákazníkem, který navštíví web, používá jeho obsah nebo prostřednictvím webu zakoupí nabízený digitální produkt.

Používáním tohoto webu a dokončením objednávky potvrzuješ, že ses s těmito obchodními podmínkami seznámil(a), rozumíš jim a souhlasíš s nimi.`,
  },
  {
    title: '2. Provozovatel',
    content: null,
    custom: (
      <div className="space-y-1 text-dim leading-relaxed">
        <p><span className="text-white/70">Název:</span> DoPlannix</p>
        <p><span className="text-white/70">E-mail:</span>{' '}
          <a href="mailto:hello@doplannix.com" className="text-gold hover:text-gold-glow transition-colors">
            hello@doplannix.com
          </a>
        </p>
      </div>
    ),
  },
  {
    title: '3. Co prodáváme',
    content: `Na webu DoPlannix nabízíme digitální produkty, zejména:`,
    list: [
      'digitální šablony pro organizaci života, práce a financí,',
      'balíčky digitálních šablon,',
      'případně další související digitální produkty.',
    ],
    note: 'Všechny produkty jsou dodávány v digitální podobě. Nejedná se o fyzické zboží.',
  },
  {
    title: '4. Objednávka a uzavření kupní smlouvy',
    content: `Kupní smlouva mezi provozovatelem a zákazníkem vzniká odesláním objednávky a jejím potvrzením, případně úspěšným dokončením platby prostřednictvím objednávkového systému na webu.

Odesláním objednávky zákazník potvrzuje, že všechny uvedené údaje jsou pravdivé a úplné.

Provozovatel si vyhrazuje právo objednávku odmítnout nebo zrušit, zejména v případě:`,
    list: [
      'zjevně chybně uvedené ceny,',
      'technické chyby na webu,',
      'podezření na zneužití objednávkového systému,',
      'porušení těchto obchodních podmínek.',
    ],
  },
  {
    title: '5. Cena a platba',
    content: `Ceny produktů jsou uvedeny na webu. Cena platná pro zákazníka je ta, která je uvedena u produktu v okamžiku odeslání objednávky.

Platba probíhá prostřednictvím platebních metod dostupných na webu. Objednávka je považována za uhrazenou okamžikem úspěšného potvrzení platby.

Provozovatel si vyhrazuje právo ceny kdykoli změnit. Tato změna se však nevztahuje na již dokončené objednávky.`,
  },
  {
    title: '6. Dodání digitálního produktu',
    content: `Po úspěšném zaplacení zákazník obdrží e-mail s informacemi potřebnými pro přístup k zakoupenému produktu, včetně pokynů k nastavení a instalaci.

Digitální produkt je zákazníkovi zpravidla dodán bez zbytečného odkladu po přijetí platby. Ve výjimečných případech může dojít ke zpoždění způsobenému technickou chybou nebo výpadkem třetí strany.

Pokud zákazník produkt neobdrží, je povinen kontaktovat provozovatele na uvedeném e-mailu.`,
  },
  {
    title: '7. Licence a použití produktu',
    content: `Zakoupením produktu získává zákazník nevýhradní, nepřenosnou licenci k jeho osobnímu použití.

Není dovoleno:`,
    list: [
      'produkt sdílet s dalšími osobami,',
      'produkt přeprodávat,',
      'produkt dále distribuovat,',
      'publikovat produkt nebo jeho části veřejně,',
      'vydávat produkt za vlastní,',
      'nabízet produkt nebo jeho upravenou verzi jako vlastní komerční výstup.',
    ],
    note: 'Licence je určena pouze pro jednoho uživatele, pokud není výslovně uvedeno jinak.',
  },
  {
    title: '8. Úpravy šablon',
    content: `Zákazník je oprávněn upravit si zakoupený produkt pro své vlastní potřeby a vlastní použití.

Tato možnost úprav nezakládá právo produkt dále prodávat, sdílet nebo distribuovat v původní ani upravené podobě.`,
  },
  {
    title: '9. Dostupnost a funkčnost',
    content: `Digitální produkty jsou vytvářeny tak, aby fungovaly v prostředí, pro které jsou určeny. Zákazník bere na vědomí, že funkčnost produktu může být částečně ovlivněna:`,
    list: [
      'změnami třetích stran nebo externích platforem,',
      'technickým nastavením zařízení zákazníka,',
      'neodborným zásahem do struktury produktu,',
      'nesprávným používáním produktu.',
    ],
    note: 'Provozovatel negarantuje, že web nebo digitální produkt budou vždy dostupné bez přerušení a bez technických chyb.',
  },
  {
    title: '10. Doživotní aktualizace',
    content: `Pokud je u produktu výslovně uvedeno, že obsahuje doživotní aktualizace, znamená to, že zákazník získává přístup k budoucím aktualizacím daného produktu bez dalšího poplatku.

Doživotní aktualizace se vztahují pouze na daný produkt a nezahrnují individuální úpravy na míru, konzultace ani nové samostatné produkty, pokud není uvedeno jinak.`,
  },
  {
    title: '11. Vrácení peněz',
    content: `Pokud je u produktu nebo na webu uvedena garance vrácení peněz, řídí se vrácení peněz příslušnými podmínkami refundace uvedenými na samostatné stránce webu.

V případě digitálních produktů si provozovatel vyhrazuje právo posoudit každý požadavek individuálně, zejména s ohledem na povahu digitálního plnění a okamžitý přístup po zaplacení.`,
  },
  {
    title: '12. Duševní vlastnictví',
    content: `Veškerý obsah webu DoPlannix, včetně textů, grafiky, vizuálů, produktových materiálů, struktury produktů, šablon, názvů a dalších prvků, je chráněn autorským právem a dalšími souvisejícími právy.

Bez předchozího písemného souhlasu provozovatele není dovoleno tento obsah kopírovat, šířit, prodávat, upravovat nebo jinak komerčně využívat.`,
  },
  {
    title: '13. Zakázané použití',
    content: `Při používání webu a produktů není dovoleno:`,
    list: [
      'porušovat právní předpisy,',
      'porušovat práva duševního vlastnictví,',
      'zneužívat web, jeho obsah nebo objednávkový systém,',
      'šířit škodlivý software, spam nebo jiný škodlivý obsah,',
      'uvádět nepravdivé nebo zavádějící informace,',
      'pokoušet se obejít technické nebo bezpečnostní prvky webu.',
    ],
    note: 'V případě porušení těchto podmínek může být zákazníkovi omezen nebo ukončen přístup ke službám.',
  },
  {
    title: '14. Omezení odpovědnosti',
    content: `Provozovatel nenese odpovědnost za:`,
    list: [
      'nepřímé škody, ušlý zisk nebo ztrátu dat,',
      'škody vzniklé nesprávným použitím produktu,',
      'škody způsobené nekompatibilitou, změnami třetích stran nebo technickými problémy mimo kontrolu provozovatele,',
      'subjektivní nesplnění individuálních očekávání zákazníka, pokud produkt odpovídá svému popisu.',
    ],
    note: 'Veškeré produkty a služby jsou poskytovány v rozsahu uvedeném na webu a v popisu daného produktu.',
  },
  {
    title: '15. Odkazy na třetí strany',
    content: `Web může obsahovat odkazy na weby, nástroje nebo služby třetích stran. Za obsah, dostupnost nebo podmínky těchto služeb provozovatel neodpovídá.

Použití služeb třetích stran se řídí jejich vlastními podmínkami a zásadami.`,
  },
  {
    title: '16. Ochrana osobních údajů',
    content: `Zpracování osobních údajů se řídí samostatným dokumentem Zásady ochrany osobních údajů, který je dostupný na webu.`,
  },
  {
    title: '17. Změny obchodních podmínek',
    content: `Provozovatel si vyhrazuje právo tyto obchodní podmínky kdykoli změnit nebo doplnit.

Aktuální znění je vždy zveřejněno na této stránce. Používáním webu po zveřejnění změn zákazník potvrzuje, že se s novým zněním seznámil a souhlasí s ním.`,
  },
  {
    title: '18. Kontaktní údaje',
    content: `V případě dotazů k těmto obchodním podmínkám nás můžeš kontaktovat na:`,
    note: 'E-mail: hello@doplannix.com',
    email: true,
  },
]

export default function ObchodniPodminky() {
  return (
    <div className="min-h-screen bg-noir text-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-stroke/50 bg-noir/80 backdrop-blur-md px-6 md:px-14 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
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
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Zpět na web
        </Link>
      </nav>

      {/* Hero */}
      <div className="px-6 md:px-14 pt-16 pb-12 border-b border-stroke/30">
        <div className="max-w-3xl mx-auto">
          <p className="section-label mb-4">Právní dokumenty</p>
          <h1 className="font-black tracking-tight text-white mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
            Obchodní podmínky
          </h1>
          <p className="text-dim leading-relaxed">
            Tyto obchodní podmínky upravují používání webu DoPlannix a nákup digitálních produktů nabízených prostřednictvím tohoto webu.
          </p>
          <p className="text-dim/50 text-sm mt-4">Poslední aktualizace: 27. 03. 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-14 py-16">
        <div className="max-w-3xl mx-auto space-y-12">
          {sections.map((section) => (
            <div key={section.title} className="group">
              <h2 className="text-white font-bold text-lg mb-4 pb-3 border-b border-stroke/40">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.custom && section.custom}
                {section.content && section.content.split('\n\n').map((para, i) => (
                  <p key={i} className="text-dim leading-relaxed">
                    {para}
                  </p>
                ))}
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
                {section.note && !section.email && (
                  <p className="text-dim/80 leading-relaxed italic border-l-2 border-gold/30 pl-4">
                    {section.note}
                  </p>
                )}
                {section.email && (
                  <p className="text-dim leading-relaxed">
                    E-mail:{' '}
                    <a href="mailto:hello@doplannix.com" className="text-gold hover:text-gold-glow transition-colors">
                      hello@doplannix.com
                    </a>
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
