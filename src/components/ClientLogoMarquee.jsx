import { useEffect, useMemo, useState } from 'react'

const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'https://mernpixel.onrender.com')
  .replace(/\/+$/, '')
  .replace(/\/api$/, '')

const defaultClients = [
  { _id: 'fallback-1', name: 'Client1', logoUrl: '/clients/IMG_3824.PNG', website: '' },
  { _id: 'fallback-2', name: 'Client2', logoUrl: '/clients/IMG_7487.PNG', website: '' },
  { _id: 'fallback-3', name: 'Client3', logoUrl: '/clients/IMG_7516.PNG', website: '' },
]

export default function ClientLogoMarquee({
  section = 'home',
  title = 'Clients',
  tagline = 'Trusted by growing brands.',
  showHeading = true,
}) {
  const [clients, setClients] = useState(defaultClients)

  useEffect(() => {
    const params = new URLSearchParams()
    params.set('section', section)
    fetch(`${baseUrl}/api/admin/clients?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setClients(data)
        }
      })
      .catch(console.error)
  }, [section])

  const renderClients = useMemo(() => {
    const list = Array.isArray(clients) && clients.length > 0 ? clients : defaultClients
    return [...list, ...list]
  }, [clients])

  return (
    <div className="w-full">
      {showHeading && (
        <div className="text-center mb-7">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{title}</h2>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">{tagline}</p>
        </div>
      )}

      <div className="mp-client-marquee">
        <div className="mp-client-marquee-track">
          {renderClients.map((client, index) => {
            const key = `${client._id || client.logoUrl || 'logo'}-${index}`
            const logo = (
              <img
                src={client.logoUrl}
                alt={client.name || 'Client Logo'}
                className="h-10 md:h-12 lg:h-14 w-auto object-contain"
                loading="lazy"
              />
            )

            return client.website ? (
              <a
                key={key}
                href={client.website}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 px-6 py-4 bg-white/90 border border-slate-200 rounded-2xl shadow-sm hover:-translate-y-1 transition-transform"
                aria-label={client.name || 'Client'}
              >
                {logo}
              </a>
            ) : (
              <div
                key={key}
                className="shrink-0 px-6 py-4 bg-white/90 border border-slate-200 rounded-2xl shadow-sm"
                aria-label={client.name || 'Client'}
              >
                {logo}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
