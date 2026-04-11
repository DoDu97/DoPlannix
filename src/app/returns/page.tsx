import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Returns & Refunds — DoPlannix',
  description: 'Refund policy and return conditions for digital products purchased on DoPlannix.',
}

const sections = [
  {
    title: 'Refund Policy',
    content: `DoPlannix digital products come with a 30-day money-back guarantee from the date of purchase.`,
    note: 'If you encounter an issue with the product or it does not work as described, you can contact us within 30 days of purchase to request a refund.',
  },
  {
    title: 'How to Request a Refund',
    email: true,
    emailNote: 'In your message, please include:',
    list: [
      'your order number,',
      'the email address used at checkout,',
      'a brief description of the issue.',
    ],
  },
  {
    title: 'When a Refund May Be Approved',
    content: `A refund request may be approved if:`,
    list: [
      'the product does not work as described on the website,',
      'a technical issue prevents access to the product,',
      'a technical issue makes normal use of the product impossible.',
    ],
  },
  {
    title: 'When a Refund Will Not Be Issued',
    content: `Refunds generally do not apply in the following situations:`,
    list: [
      'a change of mind after purchase,',
      'the product was not used,',
      'the customer expected features not listed on the product page,',
      'the request was submitted more than 30 days after purchase,',
      'the issue arose from improper use, personal modifications, or interference with the product structure.',
    ],
  },
  {
    title: 'Digital Products and Returns',
    content: `DoPlannix products are delivered exclusively in digital form and made accessible shortly after payment. For this reason, "returning" a product is not possible in the same way as with physical goods.

Once the product has been delivered to the email address provided at checkout or made available for download or use, it is considered delivered.`,
  },
  {
    title: 'Refund Processing',
    content: `If a refund is approved, the amount will be returned to the original payment method.`,
    note: 'Processing time may vary depending on your payment provider or bank, but typically takes 3 to 15 business days.',
  },
  {
    title: 'Help with Product Access',
    content: `If you have trouble with delivery, access, or getting the product running, please contact us at `,
    helpEmail: true,
  },
  {
    title: 'Refund Abuse',
    content: `We reserve the right to decline refunds or future orders in cases of repeated or clearly intentional misuse of this refund policy.`,
  },
  {
    title: 'Contact',
    content: `For any questions about refunds, please reach out to us at:`,
    contactEmail: true,
  },
]

export default function Returns() {
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
          Back to homepage
        </Link>
      </nav>

      {/* Hero */}
      <div className="px-6 md:px-14 pt-16 pb-12 border-b border-stroke/30">
        <div className="max-w-3xl mx-auto">
          <p className="section-label mb-4">Legal</p>
          <h1 className="font-black tracking-tight text-white mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
            Returns &amp; Refunds
          </h1>
          <p className="text-dim leading-relaxed">
            Refund policy and return conditions for digital products purchased on DoPlannix.
          </p>

          {/* Guarantee badge */}
          <div className="mt-8 inline-flex items-center gap-3 border border-gold/30 rounded-xl px-5 py-3.5" style={{ background: 'var(--gold-dim-bg)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold shrink-0">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <div>
              <p className="text-gold font-bold text-sm">30-day money-back guarantee</p>
              <p className="text-dim text-xs mt-0.5">No hassle, if the product doesn&apos;t work as described.</p>
            </div>
          </div>

          <p className="text-dim/50 text-sm mt-6">Last updated: March 27, 2026</p>
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
                    To submit a refund request, contact us at:{' '}
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
                    If you have trouble with delivery, access, or getting the product running, contact us at{' '}
                    <a href="mailto:hello@doplannix.com" className="text-gold hover:text-gold-glow transition-colors">
                      hello@doplannix.com
                    </a>
                    {' '}and we&apos;ll do our best to resolve the issue as quickly as possible.
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
          <Link href="/terms" className="text-[0.78rem] text-dim/60 hover:text-gold transition-colors">Terms of Service</Link>
          <Link href="/returns" className="text-[0.78rem] text-dim/60 hover:text-gold transition-colors">Returns &amp; Refunds</Link>
          <Link href="/privacy" className="text-[0.78rem] text-dim/60 hover:text-gold transition-colors">Privacy Policy</Link>
        </div>
        <p className="text-[0.78rem] text-dim/60 text-center md:text-right">
          © {new Date().getFullYear()} DoPlannix. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
