import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import StatsStrip from '@/components/StatsStrip'
import Benefits from '@/components/Benefits'
import Audience from '@/components/Audience'
import Products from '@/components/Products'
import Gallery from '@/components/Gallery'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import AnimationInit from '@/components/AnimationInit'
import SmoothScroll from '@/components/SmoothScroll'

export default function Page() {
  return (
    <>
      <AnimationInit />
      <SmoothScroll />
      <Nav />
      <main>
        {/* 1 — Attention: Hero */}
        <Hero />

        {/* 2 — Trust: Social proof numbers */}
        <StatsStrip />

        {/* 3 — Value: What you get */}
        <Benefits />

        {/* 4 — Identify: Who it's for */}
        <Audience />

        {/* 5 — Convert: Products + pricing */}
        <Products />

        {/* 6 — Gallery: Template previews */}
        <Gallery />

        {/* 7 — Proof: Testimonials */}
        <Testimonials />

        {/* 7 — Objections: FAQ */}
        <FAQ />

      </main>
      <Footer />

      {/* Global cart drawer (portal-like, fixed position) */}
      <CartDrawer />
    </>
  )
}
