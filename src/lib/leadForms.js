const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const normalizeWhatsAppBase = (baseUrl) => {
  if (!baseUrl) {
    return ''
  }
  return baseUrl.replace(/\?+$/, '')
}

export const isValidEmail = (value) => EMAIL_REGEX.test(String(value || '').trim())

export const isValidPhone = (value) => {
  const digits = String(value || '').replace(/\D/g, '')
  return digits.length >= 10
}

export const createWhatsAppLeadHref = (baseUrl, message) => {
  const base = normalizeWhatsAppBase(baseUrl)
  if (!base) {
    return ''
  }
  return `${base}?text=${encodeURIComponent(message || '')}`
}

export const createMailtoLeadHref = ({ to, subject, lines }) => {
  const body = Array.isArray(lines) ? lines.join('\n') : ''
  return `mailto:${to}?subject=${encodeURIComponent(subject || 'New inquiry')}&body=${encodeURIComponent(body)}`
}

export const openLeadChannel = (href) => {
  if (!href) {
    return false
  }
  window.open(href, '_blank', 'noopener,noreferrer')
  return true
}

