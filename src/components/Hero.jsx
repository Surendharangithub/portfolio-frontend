import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const WORDS = ['Scale.', 'Impact.', 'Last.']

function useTyping(words) {
  const [display, setDisplay] = useState('\u00A0')
  const state = useRef({ i: 0, j: 0, deleting: false })

  useEffect(() => {
    let timeout
    function tick() {
      const { i, j, deleting } = state.current
      const word = words[i]
      if (deleting) {
        setDisplay(word.substring(0, j - 1) || '\u00A0')
        state.current.j -= 1
        if (state.current.j === 0) {
          state.current.deleting = false
          state.current.i = (i + 1) % words.length
        }
        timeout = setTimeout(tick, 80)
      } else {
        setDisplay(word.substring(0, j + 1))
        state.current.j += 1
        if (state.current.j === word.length) {
          state.current.deleting = true
          timeout = setTimeout(tick, 2200)
          return
        }
        timeout = setTimeout(tick, 160)
      }
    }
    timeout = setTimeout(tick, 900)
    return () => clearTimeout(timeout)
  }, [words])

  return display
}

export default function Hero() {
  const badgeRef = useRef(null)
  const titleRef = useRef(null)
  const paraRef  = useRef(null)
  const btnsRef  = useRef(null)
  const typing   = useTyping(WORDS)

  useEffect(() => {
    gsap.set([badgeRef.current, titleRef.current, paraRef.current, btnsRef.current],
      { opacity: 0, y: 32 })

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.85 })
    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.7 })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.9 }, '-=0.4')
      .to(paraRef.current,  { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
      .to(btnsRef.current,  { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-[72px] overflow-hidden"
    >
      {/* ── Background image ──────────────────────── */}
      <img
        src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1600&q=80"
        // src='https://unsplash.com/photos/man-in-black-long-sleeve-shirt-using-computer-_Fx34KeqIEw'
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ opacity: 0.18, filter: 'grayscale(0.25)', zIndex: 0 }}
      />

      {/* ── Dot-grid (right half fade) ────────────── */}
      <div
        className="absolute inset-0 dot-grid pointer-events-none"
        style={{
          zIndex: 1,
          maskImage: 'linear-gradient(to left, rgba(0,0,0,0.55) 0%, transparent 55%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.55) 0%, transparent 55%)',
        }}
      />

      {/* ── Left vignette for text readability ───── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: 'linear-gradient(to right, rgba(14,14,14,0.96) 38%, rgba(14,14,14,0.55) 68%, transparent 100%)',
        }}
      />

      {/* ── Indigo radial glow ────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: 'radial-gradient(ellipse 65% 70% at 15% 55%, rgba(73,75,214,0.13) 0%, transparent 70%)',
        }}
      />

      {/* ── Content ───────────────────────────────── */}
      <div className="container-wide relative z-10 py-20">
        <div className="max-w-3xl xl:max-w-4xl">

          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-7
                       bg-surface-mid/90 border border-primary/20 rounded-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary flex-shrink-0" />
            <span className="font-mono text-[11px] font-semibold tracking-widest uppercase text-primary">
              Full Stack Developer
            </span>
          </div>

          {/* Headline */}
          <div ref={titleRef} className="mb-7">
            <h1
              className="font-sans font-extrabold tracking-tightest text-on-surface leading-[1.08]"
              style={{ fontSize: 'clamp(48px, 6.5vw, 80px)' }}
            >
              Building digital<br />
              experiences that<br />
              {/* Fixed-height wrapper — prevents layout shift while typing */}
              <span
                className="typing-caret text-primary inline-block"
                style={{ minHeight: '1.08em', verticalAlign: 'bottom' }}
              >
                {typing}
              </span>
            </h1>
          </div>

          {/* Subtext */}
          <p
            ref={paraRef}
            className="text-[17px] leading-[1.78] text-on-surface-var max-w-xl mb-11"
          >
            Alex Rivera crafts high-performance, scalable architectures with a focus
            on precision and editorial design quality. Turning complex code into
            elegant user journeys.
          </p>

          {/* CTAs */}
          <div ref={btnsRef} className="flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">View Portfolio</a>
            <a href="#contact"  className="btn-ghost">Get In Touch</a>
          </div>
        </div>
      </div>
    </section>
  )
}
