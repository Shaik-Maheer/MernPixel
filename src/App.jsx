import { Navigate, Route, Routes } from 'react-router-dom'
import GlobalNav from './components/GlobalNav'
import SiteFooter from './components/SiteFooter'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import ITServicesPage from './pages/ITServicesPage'

function App() {
  return (
    <div className="app-shell">
      <GlobalNav />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ITServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <SiteFooter />
    </div>
  )
}

export default App
