import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Privacy Policy — DoPlannix',
  description: 'Information about how DoPlannix collects and processes personal data.',
}

const sections = [
  {
    title: '1. Data Controller',
    provozovatel: true,
  },
  {
    title: '2. What Personal Data We May Collect',
    content: 'Depending on how you use the website, we may process the following data:',
    list: [
      'first and last name,',
      'email address,',
      'billing information,',
      'payment data to the extent processed by the payment gateway provider,',
      'order information,',
      'communications you send us,',
      'technical data about your device, browser, and website usage,',
      'data collected through cookies and similar technologies.',
    ],
  },
  {
    title: '3. How We Collect Personal Data',
    content: 'We collect personal data primarily:',
    list: [
      'when you place an order,',
      'when you contact us by email or through a form,',
      'when you subscribe to our newsletter,',
      'when you use this website,',
      'through cookies, analytics, and marketing tools.',
    ],
  },
  {
    title: '4. How We Use Personal Data',
    content: 'We use your personal data primarily for the following purposes:',
    list: [
      'processing your order and delivering the digital product,',
      'sending access and installation information,',
      'communicating about your order or inquiry,',
      'providing customer support,',
      'improving website functionality and user experience,',
      'analyzing website traffic and performance,',
      'sending marketing communications where we have lawful grounds to do so,',
      'protecting against misuse, fraud, or violations of our terms.',
    ],
  },
  {
    title: '5. Legal Basis for Processing',
    content: 'Where applicable laws such as GDPR apply, we may process personal data on the basis of:',
    list: [
      'performance of a contract,',
      'compliance with a legal obligation,',
      'legitimate interests,',
      'your consent, where required.',
    ],
  },
  {
    title: '6. Cookies and Similar Technologies',
    content: 'We may use cookies and similar technologies on the website for the following purposes:',
    list: [
      'ensuring proper website functionality,',
      'storing preferences,',
      'measuring traffic,',
      'analyzing visitor behavior,',
      'personalizing content or marketing where relevant.',
    ],
    note: 'Some cookies are necessary for the website to function properly; others may serve analytical or marketing purposes. You can manage cookies through your browser settings or a cookie banner if one is available on the website.',
  },
  {
    title: '7. Who May Access Your Data',
    content: 'We may share personal data with third parties where necessary for operating the website and providing services, for example:',
    list: [
      'payment service providers,',
      'email service providers,',
      'analytics and marketing tools,',
      'hosting or technical infrastructure providers,',
      'accountants, legal, or tax advisors where necessary,',
      'public authorities where required by law.',
    ],
    note: 'If you use external platforms for payments, analytics, or email, your data may be processed outside your country of residence.',
  },
  {
    title: '8. How Long We Retain Data',
    content: 'We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable law. This may include:',
    list: [
      'the period needed to process your order and provide customer support,',
      'the period required to meet accounting and tax obligations,',
      'the period during which we have a legitimate interest in protecting our legal claims,',
      'the duration of consent, where processing is based on consent.',
    ],
  },
  {
    title: '9. Your Rights',
    content: 'Depending on your location, you may have the right to:',
    list: [
      'request access to your personal data,',
      'request correction of inaccurate data,',
      'request deletion of personal data,',
      'request restriction of processing,',
      'object to processing,',
      'withdraw consent where processing is based on consent,',
      'request data portability,',
      'lodge a complaint with the relevant supervisory authority.',
    ],
    note: 'To exercise any of these rights, please contact us at the email address provided.',
  },
  {
    title: '10. Data Security',
    content: 'We take reasonable technical and organizational measures to protect personal data against loss, misuse, unauthorized access, disclosure, or modification.\n\nHowever, no method of data transmission over the internet or electronic storage system is completely secure.',
  },
  {
    title: '11. Third-Party Links',
    content: 'The website may contain links to third-party websites or services. We are not responsible for their content, availability, or privacy practices.\n\nWe recommend reviewing the privacy policy of any third-party service you use.',
  },
  {
    title: '12. Children',
    content: 'This website and its products are not intended for children under the age of 16, unless explicitly stated otherwise. We do not knowingly collect personal data from children without an appropriate legal basis or parental consent where required.',
  },
  {
    title: '13. Changes to This Policy',
    content: 'We may update this Privacy Policy from time to time, for example due to changes in laws, technology, services used, or how the website operates.\n\nThe current version will always be published on this page along with the date of the last update.',
  },
  {
    title: '14. Contact',
    content: 'For any questions regarding privacy or data protection, please contact us at:',
    contactEmail: true,
  },
]

export default function Privacy() {
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
            Privacy Policy
          </h1>
          <p className="text-dim leading-relaxed">
            This policy describes how DoPlannix collects, uses, and may share your personal data when you visit this website, purchase a digital product, or contact us.
          </p>
          <p className="text-dim/50 text-sm mt-4">Last updated: March 27, 2026</p>
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
                    <p><span className="text-white/70">Name:</span> DoPlannix</p>
                    <p>
                      <span className="text-white/70">Email:</span>{' '}
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
