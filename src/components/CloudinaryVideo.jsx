import { useMemo, useState } from 'react'

export default function CloudinaryVideo({
  src,
  sources = [],
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  ...rest
}) {
  const sourceList = useMemo(() => {
    if (Array.isArray(sources) && sources.length > 0) {
      return sources.filter(Boolean)
    }
    if (src) {
      return [src]
    }
    return []
  }, [sources, src])

  const [sourceIndex, setSourceIndex] = useState(0)
  const [prevSourceList, setPrevSourceList] = useState(sourceList)

  if (sourceList !== prevSourceList) {
    setPrevSourceList(sourceList)
    setSourceIndex(0)
  }

  const activeSrc = sourceList[Math.min(sourceIndex, Math.max(sourceList.length - 1, 0))]

  const handleError = () => {
    setSourceIndex((current) => {
      if (current >= sourceList.length - 1) {
        return current
      }
      return current + 1
    })
  }

  if (!activeSrc) {
    return null
  }

  return (
    <video
      className={className}
      src={activeSrc}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      onError={handleError}
      {...rest}
    />
  )
}
