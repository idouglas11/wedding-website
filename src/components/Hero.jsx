import { useEffect, useRef } from 'react'

const imageList = Array.from({ length: 13 }, (_, i) => `images/${i + 1}.JPG`)

export default function Hero() {
  const containerRef = useRef(null)

  useEffect(() => {
    imageList.forEach(src => {
      const img = new Image()
      img.src = src
    })

    const container = containerRef.current
    if (!container) return

    const base = document.createElement('div')
    const top = document.createElement('div')
    base.className = 'bg-layer'
    top.className = 'bg-layer'
    base.style.opacity = '1'
    top.style.opacity = '0'
    container.append(base, top)

    const firstImage = new Image()
    firstImage.onload = () => {
      base.style.backgroundImage = `url('${imageList[0]}')`
      top.style.backgroundImage = `url('${imageList[1]}')`

      let currentIndex = 0
      let nextIndex = 1

      const interval = setInterval(() => {
        top.style.opacity = '1'

        setTimeout(() => {
          base.style.backgroundImage = top.style.backgroundImage
          top.style.transition = 'none'
          top.style.opacity = '0'

          requestAnimationFrame(() => requestAnimationFrame(() => {
            top.style.transition = ''
          }))

          currentIndex = nextIndex
          nextIndex = (currentIndex + 1) % imageList.length
          top.style.backgroundImage = `url('${imageList[nextIndex]}')`
        }, 2000)
      }, 4000)

      return () => clearInterval(interval)
    }
    firstImage.src = imageList[0]

    return () => {
      container.innerHTML = ''
    }
  }, [])

  return (
    <section className="hero-bg" id="home">
      <div ref={containerRef} id="slideshow-container" />
      <div className="hero-overlay" />

      <div className="absolute top-12 z-50 flex flex-wrap justify-center w-full gap-x-4 gap-y-2 md:gap-x-12 px-4">
        <a href="#rsvp" className="nav-link">RSVP</a>
        <a href="#where" className="nav-link">Where</a>
        <a href="#details-cards" className="nav-link">Details</a>
        <a href="#soundtrack" className="nav-link">Playlist</a>
        <a href="#gifts" className="nav-link">Gifts</a>
        <a href="#attendees" className="nav-link">Guests</a>
      </div>

      <div className="ticker-container">
        <div className="ticker-content heading">
          Isobel & Ruby — 08.01.2027 — Tāmaki Makaurau — Isobel & Ruby — 08.01.2027 — Tāmaki Makaurau
        </div>
      </div>

      <div className="absolute bottom-16 flex flex-col items-center z-20">
        <p className="opacity-20 text-[9px] uppercase tracking-[1em]">Scroll to Enter</p>
      </div>
    </section>
  )
}