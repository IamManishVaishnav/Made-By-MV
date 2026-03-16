import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Community from '../components/Community'
import TheShelf from '../components/TheShelf'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Experience />
      <Community />
      <TheShelf />
      <Footer />
    </>
  )
}
