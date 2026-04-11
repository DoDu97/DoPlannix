'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'

const GALLERY_IMAGES = [
  { src: '/images/gallery_1.jpg', alt: 'DoPlannix Template Preview 1' },
  { src: '/images/gallery_2.jpg', alt: 'DoPlannix Template Preview 2' },
  { src: '/images/gallery_3.jpg', alt: 'DoPlannix Template Preview 3' },
  { src: '/images/gallery_4.jpg', alt: 'DoPlannix Template Preview 4' },
  { src: '/images/gallery_5.jpg', alt: 'DoPlannix Template Preview 5' },
  { src: '/images/gallery_6.jpg', alt: 'DoPlannix Template Preview 6' },
]

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [perView, setPerView] = useState(2)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setPerView(1)
      else if (window.innerWidth < 1024) setPerView(2)
      else setPerView(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const total = GALLERY_IMAGES.length
  const maxIndex = Math.max(0, total - perView)

  const goTo = useCallback(
    (idx: number) => {
      if (idx < 0) setCurrent(maxIndex)
      else if (idx > maxIndex) setCurrent(0)
      else setCurrent(idx)
    },
    [maxIndex]
  )

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.children[0]?.getBoundingClientRect().width ?? 0
    const gap = 20
    track.style.transform = `translateX(-${current * (cardWidth + gap)}px)`
  }, [current, perView])

  const dotCount = maxIndex + 1

  return (
    <section
      id="gallery"
      className="relative z-10 py-20 md:py-28 px-6 md:px-14"
      style={{ background: '#141414' }}
    >
      {/* header */}
      <div className="text-center mb-14" data-animate>
        <p className="section-label">Template previews</p>
        <h2
          className="font-black tracking-tight leading-[1.12] mb-3"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
        >
          See what&apos;s inside
        </h2>
        <p className="text-dim text-base max-w-md mx-auto">
          Clean, functional, and visually minimal templates ready to use from day one.
        </p>
      </div>

      {/* slider */}
      <div className="max-w-[1040px] mx-auto">
        <div className="overflow-hidden" data-animate>
          <div
            ref={trackRef}
            className="flex gap-5"
            style={{
              transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
              willChange: 'transform',
            }}
          >
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={i}
                className="flex-shrink-0 rounded-2xl overflow-hidden border border-stroke group"
                style={{
                  width: `calc((100% - ${(perView - 1) * 20}px) / ${perView})`,
                  height: perView === 1 ? '210px' : undefined,
                  aspectRatio: perView === 1 ? undefined : '16/10',
                  position: 'relative',
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* controls */}
        <div className="flex items-center justify-center gap-5 mt-8">
          <button
            onClick={() => goTo(current - 1)}
            className="w-11 h-11 rounded-xl border border-stroke text-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-gold hover:text-gold bg-card"
            aria-label="Previous"
          >
            ←
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: dotCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="h-2 rounded-full border-0 cursor-pointer transition-all duration-300 p-0"
                style={{
                  width: i === current ? 26 : 8,
                  background: i === current ? '#c9a84c' : '#2a2a2a',
                }}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(current + 1)}
            className="w-11 h-11 rounded-xl border border-stroke text-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-gold hover:text-gold bg-card"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}
