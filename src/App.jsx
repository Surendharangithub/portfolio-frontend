import { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'

export default function App() {
  const glowRef = useRef(null);

  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}`)
        console.log('response', response);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    }
    fetching();
  }, [])
  console.log('Chjecking', import.meta.env.VITE_API_URL)

  useEffect(() => {
    const onMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px'
        glowRef.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <Helmet>
        <title>Surendharan | Full Stack Developer</title>
        <meta property="og:image" content="./assets/hero.png" />
      </Helmet>
      <div ref={glowRef} className="cursor-glow" />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        {/* <Projects /> */}
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
