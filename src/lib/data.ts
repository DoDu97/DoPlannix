export interface Product {
  id: number
  tag: string
  name: string
  desc: string
  features: string[]
  originalPrice: number
  price: number
  img: string
  featured?: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: 2,
    tag: 'Notion Template',
    name: 'Business No Brainer',
    desc: 'Kompletní systém pro řízení businessu. Měj úkoly, projekty, cíle, knowledge i každodenní workflow přehledně na jednom místě a v systému, který je snadný na používání a navržený pro reálnou práci.',
    features: [
      'Focus dashboard pro denní priority a úkoly',
      'Projekty, cíle a eventy v jednom systému',
      'Knowledge sekce pro poznámky, zdroje a nápady',
      'Habit tracker, weekly review a přehled oblastí',
      'Doživotní přístup',
      'Okamžitý přístup po zaplacení',
    ],
    originalPrice: 1399,
    price: 699,
    img: '/images/product_business.png',
  },
  {
    id: 3,
    tag: 'Notion Template',
    name: 'Financial No Brainer',
    desc: 'Promyšlený finance planner pro každodenní kontrolu nad svými penězi. Sleduj rozpočet, zůstatky, transakce i jednotlivé kategorie v přehledném systému, který ti pomůže lépe rozhodovat a mít své finance pod kontrolou.',
    features: [
      'Monthly summary pro rychlý přehled nad měsícem',
      'Transactions, Accounts a Budgeting dashboard',
      'Tracking výdajů, příjmů a úspor podle kategorií',
      'Snadné na používání a rychlé na orientaci',
      'Doživotní přístup',
      'Okamžitý přístup po zaplacení',
    ],
    originalPrice: 1399,
    price: 699,
    img: '/images/product_financial.png',
  },
  {
    id: 4,
    tag: 'Bundle 3 v 1',
    name: 'DoPlannix Bundle',
    desc: 'Kompletní DoPlannix ekosystém pro život, práci i finance. Získej Life, Business a Financial No Brainer v jednom výhodném balíčku a měj vše důležité přehledně na jednom místě.',
    features: [
      'Life No Brainer Planner (pouze součástí Bundle)',
      'Doživotní aktualizace všech šablon',
      'Financial No Brainer Tracker',
      'Doživotní přístup',
      'Business No Brainer Planner',
      'Okamžitý přístup po zaplacení',
      'Přehledné a snadné na používání',
      '3 prémiové šablony v jednom',
    ],
    originalPrice: 2798,
    price: 1118,
    img: '/images/product_bundle.png',
    featured: true,
  },
]

export const TESTIMONIALS = [
  {
    initials: 'TN',
    name: 'Tomáš N.',
    role: 'Majitel e-shopu',
    quote:
      '„Hledal jsem místo, kde uvidím projekty, úkoly i finance najednou. Business No Brainer přesně tohle má. Každé ráno otevřu Notion dřív než mail — a to jsem nečekal."',
  },
  {
    initials: 'MK',
    name: 'Michaela K.',
    role: 'Marketingová specialistka',
    quote:
      '„Poprvé v životě mám přehled o tom, kam mi jdou peníze. Financial No Brainer mi ukázal, kde šetřím zbytečně, a kde naopak utrácím chytře. Konečně se v tom vyznám."',
  },
  {
    initials: 'JV',
    name: 'Jakub V.',
    role: 'Freelancer',
    quote:
      '„Vzal jsem bundle a nevěděl jsem, co čekat. Nejužitečnější mi nakonec byla Life část — mám tam návyky, cíle i plánování týdne. Srovnalo mi to hlavu."',
  },
  {
    initials: 'LP',
    name: 'Lukáš P.',
    role: 'Produktový manažer',
    quote:
      '„Třikrát jsem si zkoušel podobný systém postavit sám. Vždycky jsem to vzdal. Tady jsem byl rozjetý za hodinu a ještě ten den jsem přidal všechny projekty. Tohle funguje."',
  },
  {
    initials: 'KH',
    name: 'Klára H.',
    role: 'Grafická designérka, OSVČ',
    quote:
      '„Jako OSVČ jsem potřebovala oddělit osobní výdaje od firemních. Financial No Brainer to řeší přehledně — teď vím přesně, co jsou moje peníze a co patří firmě."',
  },
  {
    initials: 'MR',
    name: 'Martin R.',
    role: 'Obchodní konzultant',
    quote:
      '„Notion šablonám jsem moc nevěřil, ale tohle mě překvapilo. Mám to otevřené každý den, pipeline i úkoly na jednom místě. Líbí se mi, že to není přeplácené."',
  },
  {
    initials: 'PB',
    name: 'Petra B.',
    role: 'Online podnikatelka',
    quote:
      '„Za poslední rok jsem zkusila několik šablon. Tuhle používám nejdéle a pořád se k ní vracím. Je přehledná, rychlá na orientaci a nemusím nic přestavovat."',
  },
  {
    initials: 'OŠ',
    name: 'Ondřej Š.',
    role: 'IT specialista',
    quote:
      '„Koupil jsem Financial No Brainer přítelkyni. Pak jsem to sám vyzkoušel — a teď to máme oba. Začali jsme konečně normálně mluvit o spoření a o tom, co chceme."',
  },
]

export const FAQ_ITEMS = [
  {
    q: 'Musím mít placený účet, aby šablony fungovaly?',
    a: 'Ne, všechny šablony můžeš používat i na bezplatném účtu. Některé pokročilejší funkce se ale mohou lišit podle typu účtu a aktuálních možností platformy. Pro běžné používání však není placený tarif nutný.',
  },
  {
    q: 'Jak šablonu dostanu po zaplacení?',
    a: 'Po zaplacení ti dorazí e-mail se všemi informacemi k přístupu, nastavení i instalaci šablony. Díky tomu můžeš vše rychle zprovoznit a začít používat bez zbytečného hledání.',
  },
  {
    q: 'Co znamenají doživotní aktualizace?',
    a: 'Pokud jsou u produktu uvedeny doživotní aktualizace, znamená to, že získáš přístup i k budoucím vylepšením dané šablony bez dalších poplatků.',
  },
  {
    q: 'Mohu šablony sdílet s někým dalším?',
    a: 'Ne, každá licence je určena pouze pro jednoho uživatele. Sdílení, přeprodávání, nebo další distribuce šablon není povolena.',
  },
  {
    q: 'Je možné šablony přizpůsobit vlastním potřebám?',
    a: 'Ano. Šablony si můžeš upravit podle svého stylu práce, priorit i cílů. Můžeš měnit sekce, názvy, kategorie, strukturu i jednotlivé workflow.',
  },
  {
    q: 'Nabízíte vrácení peněz?',
    a: 'Ano. Pokud narazíš na problém s produktem nebo nebude fungovat podle očekávání, můžeš do 30 dnů požádat o vrácení peněz v souladu s našimi podmínkami refundace.',
  },
  {
    q: 'Jsou šablony vhodné i pro začátečníky?',
    a: 'Ano. Šablony jsou navržené tak, aby byly přehledné, snadno použitelné a rychle pochopitelné i pro uživatele, kteří s podobným systémem teprve začínají.',
  },
  {
    q: 'Jak rychle můžu šablonu začít používat?',
    a: 'Prakticky ihned po zaplacení a doručení e-mailu. Jakmile si šablonu přidáš do svého workspace, můžeš ji začít používat a upravit si ji podle sebe.',
  },
  {
    q: 'Co když si nebudu vědět rady?',
    a: 'Když narazíš na problém, nebo ti něco nebude jasné, můžeš se nám ozvat. Rádi ti pomůžeme, aby pro tebe bylo spuštění i používání šablony co nejjednodušší.',
  },
]

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: 0 }).format(price)
