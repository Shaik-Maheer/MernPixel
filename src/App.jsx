import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import GlobalNav from './components/GlobalNav'
import SiteFooter from './components/SiteFooter'
import WhatsAppFloat from './components/WhatsAppFloat'
import ChatbotWidget from './components/ChatbotWidget'
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
import PricingPage from './pages/PricingPage'
import StudentsPage from './pages/StudentsPage'
import TeamPage from './pages/TeamPage'

function App() {
  const location = useLocation()

  useSmoothScroll(location.pathname)

  return (
    <div className="min-h-screen font-sans selection:bg-purple-200">
      <GlobalNav />

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Routes location={location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ITServicesPage />} />
                <Route path="/it-services" element={<ITServicesPage />} />
                <Route path="/pricing" element={<PricingPage />} />
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
            </motion.div>
          </AnimatePresence>

      <SiteFooter />
      <WhatsAppFloat />
      <ChatbotWidget />
    </div>
  )
}

export default App
