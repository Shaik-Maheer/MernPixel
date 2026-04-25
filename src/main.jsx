import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <MotionConfig reducedMotion="never">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MotionConfig>
  </HelmetProvider>,
)
