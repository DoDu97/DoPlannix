import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Zásady ochrany osobních údajů — DoPlannix',
  description: 'Informace o zpracování osobních údajů na webu DoPlannix v souladu s GDPR.',
}

const sections = [
  {
    title: '1. Správce osobních údajů',
    provozovatel: true,
  },
  {
    title: '2. Jaké osobní údaje můžeme shromažďovat',
    content: 'V závislosti na tom, jak web používáš, můžeme zpracovávat zejména tyto údaje:',
    list: [
      'jméno a příjmení,',
      'e-mailovou adresu,',
      'fakturační údaje,',
      'platební údaje v rozsahu zpracovaném poskytovatelem platební brány,',
      'informace o objednávce,',
      'komunikaci, kterou nám pošleš,',
      'technické údaje o zařízení, prohlížeči a používání webu,',
      'údaje získané pomocí cookies a podobných technologií.',
    ],
  },
  {
    title: '3. Jak osobní údaje získáváme',
    content: 'Osobní údaje získáváme zejména:',
    list: [
      'při vytvoření objednávky,',
      'když nás kontaktuješ e-mailem nebo formulářem,',
      'když se přihlásíš k odběru novinek,',
      'při používání tohoto webu,',
      'prostřednictvím cookies, analytických a marketingových nástrojů.',
    ],
  },
  {
    title: '4. Jak osobní údaje používáme',
    content: 'Tvoje osobní údaje používáme zejména za účelem:',
    list: [
      'vyřízení objednávky a dodání digitálního produktu,',
      'zaslání přístupových a instalačních informací,',
      'komunikace ohledně objednávky nebo dotazu,',
      'poskytování zákaznické podpory,',
      'zlepšování fungování webu a uživatelského zážitku,',
      'analýzy návštěvnosti a výkonu webu,',
      'zasílání obchodních sdělení, pokud k tomu máme oprávnění,',
      'ochrany proti zneužití, podvodům nebo porušení našich podmínek.',
    ],
  },
  {
    title: '5. Právní důvody zpracování',
    content: 'Pokud se na tebe vztahují právní předpisy jako GDPR, můžeme osobní údaje zpracovávat na základě:',
    list: [
      'plnění smlouvy,',
      'splnění právní povinnosti,',
      'oprávněného zájmu,',
      'tvého souhlasu, pokud je vyžadován.',
    ],
  },
  {
    title: '6. Cookies a podobné technologie',
    content: 'Na webu můžeme používat cookies a podobné technologie za účelem:',
    list: [
      'správného fungování webu,',
      'ukládání nastavení,',
      'měření návštěvnosti,',
      'analýzy chování návštěvníků,',
      'personalizace obsahu nebo marketingu, pokud je to relevantní.',
    ],
    note: 'Některé cookies jsou nezbytné pro správné fungování webu, jiné mohou sloužit pro analytické nebo marketingové účely. Používání cookies můžeš ovlivnit prostřednictvím nastavení svého prohlížeče nebo cookie lišty, pokud je na webu nasazena.',
  },
  {
    title: '7. Komu mohou být údaje zpřístupněny',
    content: 'Osobní údaje můžeme zpřístupnit třetím stranám, pokud je to nutné pro provoz webu a poskytování služeb, například:',
    list: [
      'poskytovatelům platebních služeb,',
      'poskytovatelům e-mailových služeb,',
      'nástrojům pro analytiku a marketing,',
      'poskytovatelům hostingu nebo technické infrastruktury,',
      'účetním, právním nebo daňovým poradcům, pokud je to nezbytné,',
      'orgánům veřejné moci, pokud to vyžaduje zákon.',
    ],
    note: 'Pokud využíváš externí platformy pro platby, analytiku nebo e-mailing, mohou být údaje zpracovávány i mimo zemi tvého bydliště.',
  },
  {
    title: '8. Jak dlouho údaje uchováváme',
    content: 'Osobní údaje uchováváme pouze po dobu nezbytně nutnou k naplnění účelů, pro které byly získány, nebo po dobu vyžadovanou právními předpisy. To může zahrnovat například:',
    list: [
      'dobu potřebnou k vyřízení objednávky a zákaznické podpory,',
      'dobu nutnou pro splnění účetních a daňových povinností,',
      'dobu, po kterou máme oprávněný zájem chránit své právní nároky,',
      'dobu trvání souhlasu, pokud je zpracování založeno na souhlasu.',
    ],
  },
  {
    title: '9. Tvoje práva',
    content: 'V závislosti na tom, kde se nacházíš, můžeš mít právo:',
    list: [
      'požadovat přístup ke svým osobním údajům,',
      'požadovat opravu nepřesných údajů,',
      'požadovat výmaz osobních údajů,',
      'požadovat omezení zpracování,',
      'vznést námitku proti zpracování,',
      'odvolat souhlas, pokud je zpracování založeno na souhlasu,',
      'požadovat přenositelnost údajů,',
      'podat stížnost u příslušného dozorového úřadu.',
    ],
    note: 'Pokud chceš některé z těchto práv uplatnit, kontaktuj nás na uvedeném e-mailu.',
  },
  {
    title: '10. Bezpečnost údajů',
    content: 'Přijímáme přiměřená technická a organizační opatření k ochraně osobních údajů proti ztrátě, zneužití, neoprávněnému přístupu, zveřejnění nebo změně.\n\nŽádný způsob přenosu dat přes internet ani žádný systém elektronického ukládání však není stoprocentně bezpečný.',
  },
  {
    title: '11. Odkazy na třetí strany',
    content: 'Web může obsahovat odkazy na weby nebo služby třetích stran. Za jejich obsah, dostupnost ani zásady ochrany osobních údajů neneseme odpovědnost.\n\nDoporučujeme se vždy seznámit se zásadami ochrany osobních údajů konkrétní třetí strany.',
  },
  {
    title: '12. Děti',
    content: 'Tento web a produkty nejsou určeny dětem mladším 16 let, pokud není výslovně uvedeno jinak. Vědomě neshromažďujeme osobní údaje od dětí bez odpovídajícího právního základu nebo souhlasu zákonného zástupce, pokud je vyžadován.',
  },
  {
    title: '13. Změny těchto zásad',
    content: 'Tyto Zásady ochrany osobních údajů můžeme čas od času aktualizovat, například z důvodu změn právních předpisů, technologií, používaných služeb nebo fungování webu.\n\nAktuální verze bude vždy zveřejněna na této stránce spolu s datem poslední aktualizace.',
  },
  {
    title: '14. Kontakt',
    content: 'V případě dotazů ohledně ochrany osobních údajů nás kontaktuj na:',
    contactEmail: true,
  },
]

const legalLinks = [
  { href: '/obchodni-podminky', label: 'Obchodní podmínky' },
  { href: '/reklamace', label: 'Reklamace a vrácení' },
  { href: '/gdpr', label: 'Ochrana osobních údajů' },
]

export default function GDPR() {
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
            Zásady ochrany<br />osobních údajů
          </h1>
          <p className="text-dim leading-relaxed">
            Tyto zásady popisují, jak DoPlannix shromažďuje, používá a případně sdílí tvoje osobní údaje, když navštívíš tento web, zakoupíš digitální produkt nebo nás kontaktuješ.
          </p>
          <p className="text-dim/50 text-sm mt-4">Poslední aktualizace: 27. 03. 2026</p>
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
                {section.provozovatel && (
                  <div className="space-y-1 text-dim leading-relaxed">
                    <p><span className="text-white/70">Název:</span> DoPlannix</p>
                    <p>
                      <span className="text-white/70">E-mail:</span>{' '}
                      <a href="mailto:hello@doplannix.com" className="text-gold hover:text-gold-glow transition-colors">
                        hello@doplannix.com
                      </a>
                    </p>
                  </div>
                )}
                {section.content && section.content.split('\n\n').map((para, i) => (
                  <p key={i} className="text-dim leading-relaxed">{para}</p>
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
                {section.note && (
                  <p className="text-dim/80 leading-relaxed italic border-l-2 border-gold/30 pl-4">
                    {section.note}
                  </p>
                )}
                {section.contactEmail && (
                  <p className="text-dim leading-relaxed">
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
          {legalLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-[0.78rem] text-dim/60 hover:text-gold transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
        <p className="text-[0.78rem] text-dim/60 text-center md:text-right">
          © {new Date().getFullYear()} DoPlannix. Všechna práva vyhrazena.
        </p>
      </footer>
    </div>
  )
}
