import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import GlobalNav from './components/GlobalNav'
import SiteFooter from './components/SiteFooter'
import StartupLoader from './components/StartupLoader'
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

function App() {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    setShowLoader(true)
  }, [])

  const handleLoaderDone = () => {
    setShowLoader(false)
  }

  return (
    <div className="mp-app">
      {showLoader && <StartupLoader onDone={handleLoaderDone} />}

      <div className="mp-bg-blobs" aria-hidden>
        <span />
        <span />
        <span />
      </div>

      {!showLoader && (
        <>
          <GlobalNav />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ITServicesPage />} />
            <Route path="/it-services" element={<ITServicesPage />} />
            <Route path="/non-it-consulting" element={<NonITConsultingPage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/works" element={<PortfolioPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <SiteFooter />
        </>
      )}
    </div>
  )
}

export default App
