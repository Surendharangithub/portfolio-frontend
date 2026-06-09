import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    title: 'Archiv.io',
    desc: 'High-performance decentralized cloud storage solution with end-to-end encryption.',
    chips: ['AWS S3', 'Node.js', 'Rust'],
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=80',
  },
  {
    title: 'NexaBank',
    desc: 'Modern fintech dashboard for managing cross-border assets and crypto-liquidity.',
    chips: ['Next.js', 'D3.js', 'Prisma'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80',
  },
  {
    title: 'Vertex',
    desc: 'Headless e-commerce engine optimized for conversion and luxury digital storytelling.',
    chips: ['Shopify API', 'Tailwind', 'GraphQL'],
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700&q=80',
  },
]

export default function Projects() {
  const headRef  = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    // gsap.set FIRST — stamp elements as invisible before browser paints
    gsap.set(headRef.current, { opacity: 0, y: 40 })
    gsap.set(cardsRef.current, { opacity: 0, y: 60, scale: 0.97 })

    gsap.to(headRef.current, {
      opacity: 1, y: 0, duration: 0.8,   visibility: 'visible',  ease: 'power3.out',
      scrollTrigger: {
        trigger: headRef.current, start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    cardsRef.current.forEach((card, i) => {
      gsap.to(card, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.85, ease: 'power3.out', delay: i * 0.12,
        scrollTrigger: {
          trigger: card, start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section id="projects" className="py-28 bg-surface-dim">
      <div className="container-wide">
        {/* Heading — no transition class, GSAP owns opacity+transform */}
        <div ref={headRef} className="section-head mb-16" style={{ willChange: 'transform, opacity' }}>
          <h2>Selected Works</h2>
          <div className="accent-bar" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {PROJECTS.map((p, i) => (
            <div
              key={p.title}
              ref={el => cardsRef.current[i] = el}
              /* ⚠ NO transition-all — it would fight GSAP on opacity/transform.
                 Only hover:shadow and hover:-translate-y kept via CSS custom property trick */
              className="project-card glass rounded-2xl overflow-hidden cursor-pointer"
              style={{ willChange: 'transform, opacity' }}
              onMouseEnter={e => gsap.to(e.currentTarget, { y: -8, boxShadow: '0 28px 60px rgba(99,102,241,0.18)', duration: 0.3, ease: 'power2.out' })}
              onMouseLeave={e => gsap.to(e.currentTarget, { y: 0,  boxShadow: '0 0px 0px rgba(0,0,0,0)',           duration: 0.3, ease: 'power2.out' })}
            >
              <div className="h-56 overflow-hidden">
                <img src={p.img} alt={p.title} className="proj-img w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-on-surface mb-2">{p.title}</h3>
                <p className="text-sm leading-relaxed text-on-surface-var mb-5">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.chips.map(c => <span key={c} className="chip">{c}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
