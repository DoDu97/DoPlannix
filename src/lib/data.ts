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
    desc: 'A complete business management system. Keep tasks, projects, goals, knowledge, and daily workflows organized in one place — easy to use and designed for real work.',
    features: [
      'Focus dashboard for daily priorities and tasks',
      'Projects, goals, and events in one system',
      'Knowledge section for notes, resources, and ideas',
      'Habit tracker, weekly review, and area overview',
      'Lifetime access',
      'Instant access after purchase',
    ],
    originalPrice: 59,
    price: 29,
    img: '/images/product_business.png',
  },
  {
    id: 3,
    tag: 'Notion Template',
    name: 'Financial No Brainer',
    desc: 'A thoughtfully designed finance planner for daily control over your money. Track your budget, balances, transactions, and categories in a clear system that helps you make better decisions and stay on top of your finances.',
    features: [
      'Monthly summary for a quick monthly overview',
      'Transactions, Accounts, and Budgeting dashboard',
      'Expense, income, and savings tracking by category',
      'Easy to use and quick to navigate',
      'Lifetime access',
      'Instant access after purchase',
    ],
    originalPrice: 59,
    price: 29,
    img: '/images/product_financial.png',
  },
  {
    id: 4,
    tag: '3-in-1 Bundle',
    name: 'DoPlannix Bundle',
    desc: 'The complete DoPlannix ecosystem for life, work, and finances. Get Life, Business, and Financial No Brainer in one great-value bundle and keep everything important organized in one place.',
    features: [
      'Life No Brainer Planner (bundle exclusive)',
      'Lifetime updates for all templates',
      'Financial No Brainer Tracker',
      'Lifetime access',
      'Business No Brainer Planner',
      'Instant access after purchase',
      'Clear and easy to use',
      '3 premium templates in one',
    ],
    originalPrice: 119,
    price: 49,
    img: '/images/product_bundle.png',
    featured: true,
  },
]

export const TESTIMONIALS = [
  {
    initials: 'TN',
    name: 'Thomas N.',
    role: 'Online Store Owner',
    quote:
      '"I was looking for a place where I could see projects, tasks, and finances all at once. Business No Brainer has exactly that. Every morning I open Notion before my email — I didn\'t expect that."',
  },
  {
    initials: 'MK',
    name: 'Michaela K.',
    role: 'Marketing Specialist',
    quote:
      '"For the first time in my life I know where my money is going. Financial No Brainer showed me where I\'m saving unnecessarily and where I\'m spending wisely. I finally get it."',
  },
  {
    initials: 'JV',
    name: 'Jacob V.',
    role: 'Freelancer',
    quote:
      '"I got the bundle and didn\'t know what to expect. The most useful part turned out to be the Life section — I have habits, goals, and weekly planning there. It cleared my head."',
  },
  {
    initials: 'LP',
    name: 'Lucas P.',
    role: 'Product Manager',
    quote:
      '"Three times I tried to build a similar system myself. I always gave up. Here I was up and running within an hour and added all my projects that same day. This actually works."',
  },
  {
    initials: 'CH',
    name: 'Clara H.',
    role: 'Graphic Designer, Freelance',
    quote:
      '"As a freelancer I needed to separate personal and business expenses. Financial No Brainer handles it clearly — now I know exactly what\'s my money and what belongs to the business."',
  },
  {
    initials: 'MR',
    name: 'Martin R.',
    role: 'Business Consultant',
    quote:
      '"I didn\'t really believe in Notion templates, but this one surprised me. I have it open every day — pipeline and tasks in one place. I like that it\'s not overcrowded."',
  },
  {
    initials: 'PB',
    name: 'Petra B.',
    role: 'Online Entrepreneur',
    quote:
      '"Over the last year I\'ve tried several templates. This is the one I\'ve used the longest and I keep coming back to it. It\'s clear, quick to navigate, and I don\'t need to rebuild anything."',
  },
  {
    initials: 'AS',
    name: 'Andrew S.',
    role: 'IT Specialist',
    quote:
      '"I bought Financial No Brainer for my girlfriend. Then I tried it myself — and now we both use it. We finally started having real conversations about saving and what we want."',
  },
]

export const FAQ_ITEMS = [
  {
    q: 'Do I need a paid account for the templates to work?',
    a: 'No, you can use all templates with a free account. Some advanced features may vary depending on your account type and the platform\'s current capabilities. However, a paid plan is not required for regular use.',
  },
  {
    q: 'How do I get the template after purchase?',
    a: 'After payment, you\'ll receive an email with everything you need to access, set up, and install the template. This way you can get up and running quickly without any hassle.',
  },
  {
    q: 'What do lifetime updates mean?',
    a: 'If a product includes lifetime updates, it means you\'ll also get access to future improvements to that template at no additional cost.',
  },
  {
    q: 'Can I share the templates with someone else?',
    a: 'No, each license is for a single user only. Sharing, reselling, or further distributing the templates is not permitted.',
  },
  {
    q: 'Can I customize the templates to fit my needs?',
    a: 'Yes. You can adapt the templates to your work style, priorities, and goals. You can change sections, names, categories, structure, and individual workflows.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'Yes. If you encounter an issue with the product or it doesn\'t work as expected, you can request a refund within 30 days in accordance with our refund policy.',
  },
  {
    q: 'Are the templates suitable for beginners?',
    a: 'Yes. The templates are designed to be clear, easy to use, and quickly understood — even for users who are just getting started with this type of system.',
  },
  {
    q: 'How quickly can I start using a template?',
    a: 'Practically as soon as you complete payment and receive the email. Once you add the template to your workspace, you can start using and customizing it right away.',
  },
  {
    q: 'What if I need help?',
    a: 'If you run into a problem or have any questions, feel free to reach out. We\'re happy to help make your setup and usage of the template as smooth as possible.',
  },
]

export const formatPrice = (price: number) =>
  '$' + new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(price)

export const formatPriceFull = (price: number) =>
  '$' + new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price)
