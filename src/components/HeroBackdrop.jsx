export default function HeroBackdrop({ video = '/four.mp4' }) {
  return (
    <>
      <video className="mp-hero-video" src={video} autoPlay muted loop playsInline />
      <div className="mp-hero-overlay" />
      <div className="mp-hero-gridlines" />
    </>
  )
}
