import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const LINKS = ['Projects', 'Skills', 'Experience', 'Contact']

export default function Navbar() {
  const navRef = useRef(null)
  const logoRef = useRef(null)
  const linksRef = useRef([])
  const btnRef = useRef(null)

  useEffect(() => {
    // Stamp invisible BEFORE first paint
    // gsap.set(navRef.current, { y: -80, opacity: 0 })
    // gsap.set([logoRef.current, ...linksRef.current, btnRef.current], { opacity: 0, y: -12 })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.to(navRef.current, { y: 0, opacity: 1, duration: 0.9 })
      .to(logoRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4')
      .to(linksRef.current, { opacity: 1, y: 0, duration: 0.45, stagger: 0.07 }, '-=0.35')
      .to(btnRef.current, { opacity: 1, y: 0, duration: 0.45 }, '-=0.3')
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center
                 border-b border-white/[0.07] px-12 xl:px-20"
      style={{
        background: 'rgba(20,19,19,0.88)',
        backdropFilter: 'blur(24px)',
        opacity: 0,              // ✅ hidden before paint
        transform: 'translateY(-80px)',
        WebkitBackdropFilter: 'blur(24px)',
        willChange: 'transform, opacity',
      }}
    >
      <div className="w-full flex items-center justify-between">
        <div ref={logoRef} style={{ opacity: 0, transform: 'translateY(-12px)' }} className="font-sans text-base font-extrabold tracking-tightest text-on-surface select-none">
          {/* SURENCODES.COM */}
          <img src='./assets/logo.svg' alt='logo' className='w-36' />
        </div>
        <div className="flex items-center gap-10">
          {LINKS.map((link, i) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="nav-link"
              ref={el => linksRef.current[i] = el} style={{ opacity: 0, transform: 'translateY(-12px)' }}>
              {link}
            </a>
          ))}
          <button
            ref={btnRef}
            className="font-mono text-[11px] font-bold tracking-widest uppercase
                       px-5 py-2 bg-primary text-[#1000a9] rounded-full
                       cursor-pointer border-none pulse-glow"
            style={{opacity: 0, transform: 'translateY(-12px)', willChange: 'transform, opacity' }}
          >
            Resume
          </button>
        </div>
      </div>
    </nav>
  )
}
