import { Helmet } from 'react-helmet-async'

export default function SEO({ title, description }) {
  const defaultDesc = "MERNpixel is a product studio engineered for outcomes. We design and build products that move the metric."
  const siteTitle = title ? `${title} | MERNpixel` : 'MERNpixel | Performance-first Product Studio'

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
    </Helmet>
  )
}
