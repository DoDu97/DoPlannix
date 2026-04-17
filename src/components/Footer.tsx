import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-stroke px-6 md:px-14 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* legal links */}
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
        <Link href="/terms" className="text-[0.78rem] text-dim/60 hover:text-gold transition-colors">
          Terms of Service
        </Link>
        <Link href="/returns" className="text-[0.78rem] text-dim/60 hover:text-gold transition-colors">
          Returns &amp; Refunds
        </Link>
        <Link href="/privacy" className="text-[0.78rem] text-dim/60 hover:text-gold transition-colors">
          Privacy Policy
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <p className="text-[0.78rem] text-dim/60 text-center md:text-right">
          © {new Date().getFullYear()} DoPlannix. All rights reserved.
        </p>
        <a
          href="https://www.instagram.com/doplannix/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dim/60 hover:text-gold transition-colors"
          aria-label="Instagram"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4.5"/>
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
          </svg>
        </a>
      </div>
    </footer>
  )
}
