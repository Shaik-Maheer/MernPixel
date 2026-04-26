const iconShapes = {
  web: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <path d="M3.5 9.5h17" />
      <path d="M7 7.25h.01" />
      <path d="M9.5 7.25h.01" />
    </>
  ),
  commerce: (
    <>
      <path d="M7 9h10l1 10H6L7 9z" />
      <path d="M9 9V7.5a3 3 0 0 1 6 0V9" />
    </>
  ),
  portfolio: (
    <>
      <rect x="3.5" y="5" width="17" height="14.5" rx="2" />
      <path d="M8.5 5v14.5" />
      <path d="M11 9h6" />
      <path d="M11 12h6" />
      <path d="M11 15h4.5" />
      <circle cx="6.2" cy="10.2" r="1.1" fill="currentColor" stroke="none" />
      <path d="M4.9 14.6c.45-.9 1.2-1.35 2.2-1.35 1.05 0 1.8.45 2.25 1.35" />
    </>
  ),
  app: (
    <>
      <rect x="7.5" y="3.5" width="9" height="17" rx="2" />
      <path d="M11 6.5h2" />
      <circle cx="12" cy="17.25" r="0.75" fill="currentColor" stroke="none" />
    </>
  ),
  branding: (
    <>
      <path d="M12 3.5l5.5 5.5L12 20.5 6.5 9 12 3.5z" />
      <path d="M9.75 8.75h4.5" />
      <circle cx="12" cy="11.75" r="0.85" fill="currentColor" stroke="none" />
    </>
  ),
  marketing: (
    <>
      <path d="M4.5 19.5h15" />
      <path d="M5.5 16.5l4.5-4.5 3.5 2.5 4-5" />
      <path d="M15.5 7h2v2" />
    </>
  ),
  academic: (
    <>
      <path d="M4 8.5l8-4 8 4-8 4-8-4z" />
      <path d="M6.5 11v4.25c0 1.4 2.45 2.75 5.5 2.75s5.5-1.35 5.5-2.75V11" />
      <path d="M20 8.5V13" />
    </>
  ),
  hiring: (
    <>
      <circle cx="12" cy="8.25" r="3" />
      <path d="M6 19.5a6 6 0 0 1 12 0" />
      <path d="M19 9.5h2.5" />
      <path d="M20.25 8.25V10.75" />
    </>
  ),
  lectures: (
    <>
      <rect x="4" y="5.5" width="16" height="10.5" rx="1.5" />
      <path d="M12 16v4" />
      <path d="M9 20.5h6" />
      <path d="M8 11l2.5-2.5 2.5 2.5 3-3" />
    </>
  ),
}

export default function ServiceIcon({ type, className = '', strokeWidth = 1.8 }) {
  const shape = iconShapes[type] || iconShapes.web

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {shape}
    </svg>
  )
}
