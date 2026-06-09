import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SOCIALS = [
  { icon: '✉',   label: 'surenrengarajan@gmail.com',      href: 'mailto:surenrengarajan@gmail.com' },
  { icon: '⬡',   label: 'LinkedIn / Profile',      href: 'https://www.linkedin.com/in/surendharan/' },
  { icon: '</>',  label: 'Github / Surendharangithub',  href: 'https://github.com/Surendharangithub' },
]

export default function Contact() {
  const leftRef  = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    gsap.set(leftRef.current,  { opacity: 0, x: -40 })
    gsap.set(rightRef.current, { opacity: 0, x:  40 })

    gsap.to(leftRef.current, {
      opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: {
        trigger: leftRef.current, start: 'top 85%',
        toggleActions: 'play reverse play reverse',
      },
    })
    gsap.to(rightRef.current, {
      opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.14,
      scrollTrigger: {
        trigger: rightRef.current, start: 'top 85%',
        toggleActions: 'play reverse play reverse',
      },
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section id="contact" className="py-28 bg-surface">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

          {/* Left */}
          <div ref={leftRef} style={{ willChange: 'transform, opacity' }}>
            <h2
              className="font-sans font-extrabold tracking-tightest text-on-surface leading-tight mb-5"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
            >
              Let's build something<br />significant.
            </h2>
            <p className="text-base leading-relaxed text-on-surface-var mb-10 max-w-md">
              Open for collaboration on high-impact projects or technical leadership roles.
              Drop a message or find me on social.
            </p>

            <div className="flex flex-col gap-4">
              {SOCIALS.map(s => (
                <a
                  key={s.label} href={s.href}
                  target='_blank'
                  className="flex items-center gap-4 no-underline group"
                  /* GSAP handles color transition — no transition-colors conflict */
                  onMouseEnter={e => gsap.to(e.currentTarget.querySelector('.social-label'), { color: '#c0c1ff', duration: 0.25 })}
                  onMouseLeave={e => gsap.to(e.currentTarget.querySelector('.social-label'), { color: '#e5e2e1', duration: 0.25 })}
                >
                  <span className="w-11 h-11 bg-surface-mid rounded-xl flex items-center
                                   justify-center text-base flex-shrink-0">
                    {s.icon}
                  </span>
                  <span className="social-label text-[15px] text-on-surface">{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div ref={rightRef} className="glass rounded-2xl p-8" style={{ willChange: 'transform, opacity' }}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-mono text-[10px] font-semibold tracking-widest uppercase text-on-surface-var mb-2">Name</label>
                <input type="text" placeholder="Alex Rivera" />
              </div>
              <div>
                <label className="block font-mono text-[10px] font-semibold tracking-widest uppercase text-on-surface-var mb-2">Email</label>
                <input type="email" placeholder="alex@example.com" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block font-mono text-[10px] font-semibold tracking-widest uppercase text-on-surface-var mb-2">Message</label>
              <textarea rows={5} placeholder="Tell me about your project..." />
            </div>
            <button className="btn-primary w-full justify-center">
              Send Transmission
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
