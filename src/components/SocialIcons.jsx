export function LinkedInIcon({ className = '' }) {
  return <img src="/pics/linkedin_icon.svg" alt="LinkedIn" className={className} />
}

export function InstagramIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig)" />
      <circle cx="12" cy="12" r="5" fill="none" stroke="white" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
      <rect x="5" y="5" width="14" height="14" rx="3" fill="none" stroke="white" strokeWidth="2" />
    </svg>
  )
}

export function FacebookIcon({ className = '' }) {
  return <img src="/pics/facebook_icon.svg" alt="Facebook" className={className} />
}

export function YouTubeIcon({ className = '' }) {
  return <img src="/pics/youtube_icon.svg" alt="YouTube" className={className} />
}

export function WhatsAppIcon({ className = '' }) {
  return <img src="/pics/whatsapp_icon.svg" alt="WhatsApp" className={className} />
}

const iconMap = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
  youtube: YouTubeIcon,
  whatsapp: WhatsAppIcon,
}

export function SocialIcon({ network, className = '' }) {
  const Icon = iconMap[network]
  if (!Icon) {
    return null
  }
  return <Icon className={className} />
}
