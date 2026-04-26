function stripTrailingSlash(value) {
  return value.replace(/\/+$/, '')
}

const DEFAULT_API_BASE_URL = 'https://mernpixel.onrender.com'

function buildChatEndpoint(apiBase) {
  const base = stripTrailingSlash(apiBase)

  if (/\/api\/chat$/i.test(base)) {
    return base
  }

  if (/\/api$/i.test(base)) {
    return `${base}/chat`
  }

  return `${base}/api/chat`
}

function resolveApiBaseUrl() {
  const envBase = (import.meta.env.VITE_API_BASE_URL?.trim() || '').replace(/\/+$/, '').replace(/\/api$/, '')
  if (envBase) {
    return stripTrailingSlash(envBase)
  }

  return DEFAULT_API_BASE_URL
}

export async function sendChatMessage({ message, history = [] }) {
  const apiBase = resolveApiBaseUrl()
  const endpoint = buildChatEndpoint(apiBase)

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, history }),
  })

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(payload.error || `Request failed with status ${response.status}`)
  }

  if (!payload.reply || typeof payload.reply !== 'string') {
    throw new Error('Invalid chatbot response from server.')
  }

  return payload.reply
}
