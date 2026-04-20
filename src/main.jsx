import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

document.documentElement.classList.add('no-page-motion')

createRoot(document.getElementById('root')).render(
  <MotionConfig reducedMotion="always">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MotionConfig>,
)
