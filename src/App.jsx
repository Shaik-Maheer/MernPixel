import { useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import ChatbotWidget from './components/ChatbotWidget'
import GlobalNav from './components/GlobalNav'
import WhatsAppFloat from './components/WhatsAppFloat'
import useSmoothScroll from './hooks/useSmoothScroll'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import CareersPage from './pages/CareersPage'
import ClientsPage from './pages/ClientsPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import ITServicesPage from './pages/ITServicesPage'
import NonITConsultingPage from './pages/NonITConsultingPage'
import PortfolioPage from './pages/PortfolioPage'
import StudentsPage from './pages/StudentsPage'
import TeamPage from './pages/TeamPage'

const INTRO_KEY = 'mp_intro_seen_v1'

function App() {
  const location = useLocation()
  useSmoothScroll(location.pathname)
  const [introDone, setIntroDone] = useState(() => {
    if (window.location.pathname !== '/') {
      return true
    }
    return window.localStorage.getItem(INTRO_KEY) === '1'
  })

  const showNav = location.pathname !== '/' || introDone

  const handleIntroComplete = () => {
    window.localStorage.setItem(INTRO_KEY, '1')
    setIntroDone(true)
  }

  return (
    <div className="relative overflow-hidden">
      <div className="cosmic-bg" />
      <GlobalNav visible={showNav} />
      <ChatbotWidget />
      <WhatsAppFloat />

      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage showIntro={!introDone} onIntroComplete={handleIntroComplete} />} />
        <Route path="/works" element={<PortfolioPage />} />
        <Route path="/services" element={<ITServicesPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/it-services" element={<ITServicesPage />} />
        <Route path="/non-it-consulting" element={<NonITConsultingPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
