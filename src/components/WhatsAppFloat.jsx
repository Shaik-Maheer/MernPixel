import { motion } from 'framer-motion'
import { business } from '../data/siteData'
import { WhatsAppIcon } from './SocialIcons'

export default function WhatsAppFloat() {
  const MotionAnchor = motion.a

  return (
    <MotionAnchor
      href={business.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Open WhatsApp chat"
      className="wa-float cursor-target"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="wa-float-icon">
        <WhatsAppIcon />
      </span>
    </MotionAnchor>
  )
}
