import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SKILLS = [
  { icon: '⌨', title: 'Frontend', items: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS','React Hook Form', 'Zod'] },
  { icon: '⚙', title: 'Backend',  items: ['Node.js', 'Express.js', 'PostgreSQL', 'REST API', 'JWT Authentication', 'Redis'] },
  { icon: '☁', title: 'Cloud & DevOps',   items: ['Vercel', 'Netlify', 'Docker', 'Ngnix'] },
  { icon: '🔧', title: 'Tools',   items: ['vs code', 'Github', 'postman', 'JIRa', 'Linux'] },
]

export default function Skills() {
  const headRef  = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    gsap.set(headRef.current, { opacity: 0, y: 40 })
    gsap.set(cardsRef.current, { opacity: 0, y: 50 })

    gsap.to(headRef.current, {
      opacity: 1, y: 0, duration: 0.8,   visibility: 'visible',  ease: 'power3.out',
      scrollTrigger: {
        trigger: headRef.current, start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    cardsRef.current.forEach((card, i) => {
      gsap.to(card, {
        opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: i * 0.12,
        scrollTrigger: {
          trigger: card, start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section id="skills" className="py-28 bg-surface border-t border-outline-var/15">
      <div className="container-wide">
        <div ref={headRef} className="section-head mb-16" style={{ willChange: 'transform, opacity' }}>
          <h2>Technical Arsenal</h2>
          <div className="accent-bar" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKILLS.map((s, i) => (
            <div
              key={s.title}
              ref={el => cardsRef.current[i] = el}
              /* No transition-all — GSAP owns opacity+transform.
                 Border/shadow hover uses JS handlers below */
              className="glass rounded-2xl p-8 border border-primary/10"
              style={{ willChange: 'transform, opacity' }}
              onMouseEnter={e => gsap.to(e.currentTarget, {
                boxShadow: '0 0 32px rgba(99,102,241,0.1)',
                borderColor: 'rgba(192,193,255,0.3)',
                duration: 0.3,
              })}
              onMouseLeave={e => gsap.to(e.currentTarget, {
                boxShadow: '0 0 0px rgba(0,0,0,0)',
                borderColor: 'rgba(192,193,255,0.1)',
                duration: 0.3,
              })}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-xl">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-on-surface">{s.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {s.items.map(item => (
                  <span key={item} className="skill-pill">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
