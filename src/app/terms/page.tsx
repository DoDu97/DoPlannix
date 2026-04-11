import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Terms of Service — DoPlannix',
  description: 'Terms of service for purchasing digital products on DoPlannix.',
}

const sections = [
  {
    title: '1. Introduction',
    content: `These Terms of Service govern the relationship between the operator of the DoPlannix website and the customer who visits the website, uses its content, or purchases a digital product through the website.

By using this website and completing an order, you confirm that you have read, understood, and agree to these Terms of Service.`,
  },
  {
    title: '2. Operator',
    content: null,
    custom: (
      <div className="space-y-1 text-dim leading-relaxed">
        <p><span className="text-white/70">Name:</span> DoPlannix</p>
        <p><span className="text-white/70">Email:</span>{' '}
          <a href="mailto:hello@doplannix.com" className="text-gold hover:text-gold-glow transition-colors">
            hello@doplannix.com
          </a>
        </p>
      </div>
    ),
  },
  {
    title: '3. What We Sell',
    content: `DoPlannix offers digital products, including:`,
    list: [
      'digital templates for organizing life, work, and finances,',
      'bundles of digital templates,',
      'and other related digital products.',
    ],
    note: 'All products are delivered in digital form. No physical goods are sold.',
  },
  {
    title: '4. Orders and Purchase Agreement',
    content: `A purchase agreement between the operator and the customer is formed upon submission of an order and its confirmation, or upon successful completion of payment through the ordering system on the website.

By submitting an order, the customer confirms that all provided information is accurate and complete.

The operator reserves the right to reject or cancel an order, particularly in cases of:`,
    list: [
      'an obviously incorrect price,',
      'a technical error on the website,',
      'suspected misuse of the ordering system,',
      'violation of these Terms of Service.',
    ],
  },
  {
    title: '5. Pricing and Payment',
    content: `Product prices are listed on the website. The price applicable to the customer is the one displayed at the time the order is submitted.

Payment is processed through the payment methods available on the website. An order is considered paid upon successful payment confirmation.

The operator reserves the right to change prices at any time. Such changes do not apply to already completed orders.`,
  },
  {
    title: '6. Delivery of Digital Products',
    content: `After successful payment, the customer will receive an email with the information needed to access, set up, and install the purchased product.

The digital product is typically delivered without unnecessary delay after payment is received. In exceptional cases, a delay may occur due to a technical error or third-party outage.

If the customer does not receive the product, they must contact the operator at the provided email address.`,
  },
  {
    title: '7. License and Use',
    content: `By purchasing a product, the customer receives a non-exclusive, non-transferable license for personal use only.

The following are not permitted:`,
    list: [
      'sharing the product with others,',
      'reselling the product,',
      'further distributing the product,',
      'publicly publishing the product or any part of it,',
      'presenting the product as your own,',
      'offering the product or a modified version as your own commercial output.',
    ],
    note: 'The license is intended for a single user only, unless explicitly stated otherwise.',
  },
  {
    title: '8. Template Customization',
    content: `The customer is permitted to modify the purchased product for their own personal use.

This right to customize does not grant permission to sell, share, or distribute the product in its original or modified form.`,
  },
  {
    title: '9. Availability and Functionality',
    content: `Digital products are created to work in the environment for which they are designed. The customer acknowledges that product functionality may be partially affected by:`,
    list: [
      'changes made by third parties or external platforms,',
      'the technical configuration of the customer\'s device,',
      'unauthorized modifications to the product structure,',
      'improper use of the product.',
    ],
    note: 'The operator does not guarantee that the website or digital products will always be available without interruption or technical errors.',
  },
  {
    title: '10. Lifetime Updates',
    content: `If a product explicitly states that it includes lifetime updates, the customer gains access to future updates of that product at no additional charge.

Lifetime updates apply to that specific product only and do not include custom modifications, consultations, or new standalone products, unless stated otherwise.`,
  },
  {
    title: '11. Refunds',
    content: `If a money-back guarantee is stated for a product or on the website, refunds are governed by the applicable refund policy on the returns page.

For digital products, the operator reserves the right to evaluate each request individually, particularly given the nature of digital delivery and immediate access after payment.`,
  },
  {
    title: '12. Intellectual Property',
    content: `All content on the DoPlannix website, including texts, graphics, visuals, product materials, product structure, templates, names, and other elements, is protected by copyright and related rights.

Without prior written consent from the operator, you may not copy, distribute, sell, modify, or otherwise commercially exploit this content.`,
  },
  {
    title: '13. Prohibited Use',
    content: `When using the website and products, you may not:`,
    list: [
      'violate any laws or regulations,',
      'infringe intellectual property rights,',
      'misuse the website, its content, or the ordering system,',
      'distribute malware, spam, or other harmful content,',
      'provide false or misleading information,',
      'attempt to bypass technical or security features of the website.',
    ],
    note: 'In the event of a violation, the customer\'s access to services may be restricted or terminated.',
  },
  {
    title: '14. Limitation of Liability',
    content: `The operator is not liable for:`,
    list: [
      'indirect damages, lost profits, or data loss,',
      'damages resulting from improper use of the product,',
      'damages caused by incompatibility, third-party changes, or technical issues beyond the operator\'s control,',
      'subjective failure to meet individual customer expectations, provided the product matches its description.',
    ],
    note: 'All products and services are provided to the extent described on the website and in the product description.',
  },
  {
    title: '15. Third-Party Links',
    content: `The website may contain links to third-party websites, tools, or services. The operator is not responsible for the content, availability, or terms of those services.

Use of third-party services is governed by their own terms and policies.`,
  },
  {
    title: '16. Privacy',
    content: `The processing of personal data is governed by a separate Privacy Policy document available on the website.`,
  },
  {
    title: '17. Changes to Terms',
    content: `The operator reserves the right to change or update these Terms of Service at any time.

The current version is always published on this page. By continuing to use the website after changes are published, the customer confirms they have read and agreed to the updated terms.`,
  },
  {
    title: '18. Contact',
    content: `For any questions regarding these Terms of Service, please contact us at:`,
    note: 'Email: hello@doplannix.com',
    email: true,
  },
]

export default function Terms() {
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
          Back to homepage
        </Link>
      </nav>

      {/* Hero */}
      <div className="px-6 md:px-14 pt-16 pb-12 border-b border-stroke/30">
        <div className="max-w-3xl mx-auto">
          <p className="section-label mb-4">Legal</p>
          <h1 className="font-black tracking-tight text-white mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
            Terms of Service
          </h1>
          <p className="text-dim leading-relaxed">
            These terms govern the use of the DoPlannix website and the purchase of digital products offered through this website.
          </p>
          <p className="text-dim/50 text-sm mt-4">Last updated: March 27, 2026</p>
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
                    Email:{' '}
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
