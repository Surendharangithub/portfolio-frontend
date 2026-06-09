import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const JOBS = [
  {
    period: '2024 — PRESENT',
    role:   'React Developer',
    desc: 'Building responsive, high-performance web applications using React and modern JavaScript. Focused on clean component architecture, state management, and delivering pixel-perfect UI experiences.',
    // desc:   'Spearheading the core infrastructure migration to microservices, reducing deployment latency by 40%. Mentoring a team of 12 engineers in modern architectural patterns.',
    active: true,
  }
  // {
  //   period: '2018 — 2021',
  //   role:   'Senior Full Stack Developer @ FinFlow',
  //   desc:   'Developed a real-time ledger system processing over $500M in monthly transactions. Implemented strict security protocols and data integrity audits.',
  //   active: false,
  // },
  // {
  //   period: '2015 — 2018',
  //   role:   'Software Engineer @ InnovateLabs',
  //   desc:   'Built and shipped various MVP products for startups. Focused on rapid prototyping and user-centric design system implementation.',
  //   active: false,
  // },
]

export default function Experience() {
  const headRef  = useRef(null)
  const lineRef  = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    gsap.set(headRef.current, { opacity: 0, y: 40 })
    gsap.set(lineRef.current, { scaleY: 0 })
    gsap.set(itemsRef.current, { opacity: 0, x: -32 })

    gsap.to(headRef.current, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: {
        trigger: headRef.current, start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    gsap.to(lineRef.current, {
      scaleY: 1, transformOrigin: 'top center', duration: 1.4, ease: 'power2.inOut',
      scrollTrigger: {
        trigger: lineRef.current, start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    itemsRef.current.forEach((item, i) => {
      gsap.to(item, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.15,
        scrollTrigger: {
          trigger: item, start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section id="experience" className="py-28 bg-surface-dim">
      <div className="container-wide">
        <div ref={headRef} className="section-head mb-16" style={{ willChange: 'transform, opacity' }}>
          <h2>Career Path</h2>
          <div className="accent-bar" />
        </div>

        <div className="relative pl-8 ml-2">
          {/* Animated vertical line */}
          {JOBS.length > 1 &&
            <div
              ref={lineRef}
              className="absolute left-0 top-2 bottom-2 w-px"
              style={{
                background: 'linear-gradient(to bottom, #c0c1ff, rgba(192,193,255,0.07))',
                willChange: 'transform',
              }}
            />
          }

          <div className="flex flex-col gap-14">
            {JOBS.map((job, i) => (
              <div
                key={i}
                ref={el => itemsRef.current[i] = el}
                className="relative"
                style={{ willChange: 'transform, opacity' }}
              >
                {/* Dot */}
                <div
                  className={`absolute -left-10 top-1.5 w-4 h-4 rounded-full
                    ${job.active
                      ? 'bg-primary border-2 border-surface-dim dot-active'
                      : 'bg-primary/30'}`}
                />

                <span className={`font-mono text-[11px] font-semibold tracking-widest uppercase
                  ${job.active ? 'text-primary' : 'text-on-surface-var'}`}>
                  {job.period}
                </span>
                <h3 className="text-xl xl:text-2xl font-bold text-on-surface mt-1.5 mb-2.5">
                  {job.role}
                </h3>
                <p className="text-[15px] leading-[1.75] text-on-surface-var max-w-2xl">
                  {job.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
