import { useEffect, useRef } from 'react'

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzxKdYYAuVsUz3fTmhWScZ3S6w0hSyt1kGKSOzalSQ_WgYyh0V8FquvBUAYB6p9zP2d/exec'

export default function Attendees({ refreshSignal }) {
  const gridRef = useRef(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    grid.innerHTML = '<p class="opacity-20 italic text-sm">Gathering the guestlist...</p>'

    fetch(SCRIPT_URL + '?nocache=' + Date.now())
      .then(r => r.json())
      .then(data => {
        if (!data.names || data.names.length === 0) {
          grid.innerHTML = '<p class="opacity-20 italic uppercase tracking-widest text-[10px]">The list is growing...</p>'
          return
        }
        grid.innerHTML = ''
        const count = data.names.length
        const isMobile = window.innerWidth < 768
        const baseSize = Math.max(0.5, 2.2 - count * 0.015)
        const finalSize = isMobile ? baseSize * 0.7 : baseSize
        const maxRem = isMobile ? 1.2 : 1.8

        data.names.forEach(name => {
          const span = document.createElement('span')
          span.className = 'name-slot flex-shrink-1 text-center'
          span.innerText = name
          span.style.fontSize = `clamp(0.5rem, ${finalSize}vw, ${maxRem}rem)`
          grid.appendChild(span)
        })

        // After rendering, shrink font until names fit within the container height
        const shrinkToFit = () => {
          const slots = grid.querySelectorAll('.name-slot')
          let iterations = 0
          while (grid.scrollHeight > grid.clientHeight && iterations < 40) {
            slots.forEach(el => {
              const current = parseFloat(getComputedStyle(el).fontSize)
              if (current > 7) el.style.fontSize = `${current * 0.95}px`
            })
            iterations++
          }
        }
        // Two rAF passes to let the browser fully lay out before measuring
        requestAnimationFrame(() => requestAnimationFrame(shrinkToFit))
      })
      .catch(() => {
        grid.innerHTML = 'Error loading names.'
      })
  }, [refreshSignal])

  return (
    <section className="relative bg-[#080808] flex flex-col items-center" id="attendees">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 blur-sm opacity-40"
          style={{ backgroundImage: "url('glasshouse_4.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center flex-1 min-h-0">
        <h2 className="heading text-[10px] uppercase tracking-[0.8em] opacity-30 mb-8 text-center flex-shrink-0">
          We are excited to host...
        </h2>
        <div id="names-grid" ref={gridRef} className="mb-12" />
        <p className="text-[8px] uppercase tracking-[0.4em] opacity-20 mb-10 flex-shrink-0">
          See you in Auckland
        </p>
      </div>
    </section>
  )
}
