function IconBase({ className = '', children, viewBox = '0 0 24 24' }) {
  return (
    <svg
      className={className}
      viewBox={viewBox}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  )
}

export function LinkedInIcon({ className = '' }) {
  return (
    <IconBase className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </IconBase>
  )
}

export function InstagramIcon({ className = '' }) {
  return (
    <IconBase className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1" />
    </IconBase>
  )
}

export function FacebookIcon({ className = '' }) {
  return (
    <IconBase className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </IconBase>
  )
}

export function YouTubeIcon({ className = '' }) {
  return (
    <IconBase className={className}>
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none" />
    </IconBase>
  )
}

export function WhatsAppIcon({ className = '' }) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m9.5 18-2 .8.8-2" />
      <path d="M9.6 9.1c.2-.4.4-.4.6-.4h.6c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .4-.1.6l-.5.6c-.1.1-.1.3 0 .4.2.4.7 1.1 1.5 1.7.8.6 1.4.8 1.8.9.2.1.3 0 .4-.1l.5-.6c.2-.2.4-.3.6-.2l1.3.6c.3.1.4.3.4.5v.6c0 .3-.1.5-.4.6-.5.2-1.3.3-2.3-.1a8.1 8.1 0 0 1-2.9-1.8 8.2 8.2 0 0 1-2-2.9c-.3-1-.2-1.8 0-2.2Z" />
    </IconBase>
  )
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
