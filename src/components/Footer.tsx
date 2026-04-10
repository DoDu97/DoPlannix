import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-stroke px-6 md:px-14 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* legal links */}
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

      {/* copy */}
      <p className="text-[0.78rem] text-dim/60 text-center md:text-right">
        © {new Date().getFullYear()} DoPlannix. Všechna práva vyhrazena.
      </p>
    </footer>
  )
}
