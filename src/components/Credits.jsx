import { useEffect, useRef } from 'react'

export default function Credits() {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const isExplodedRef = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    const textEl = textRef.current
    if (!container || !textEl) return

    // Kinetic mouse effect
    const handleMouseMove = (e) => {
      const { left, top, width, height } = container.getBoundingClientRect()
      const dx = e.clientX - (left + width / 2)
      const dy = e.clientY - (top + height / 2)
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < 300) {
        const force = (300 - distance) / 20
        container.style.transform = `translate(${(dx / distance) * -force * 15}px, ${(dy / distance) * -force * 15}px)`
      } else {
        container.style.transform = 'translate(0px, 0px)'
      }
    }
    document.addEventListener('mousemove', handleMouseMove)

    // Prepare exploding letters
    const specialSpan = textEl.querySelector('span')
    const isobelText = 'ISOBEL'
    const mainText = 'Website built and designed by '

    const wrap = (text) =>
      text.split('').map(char =>
        `<span class="letter-unit inline-block transition-all duration-[2000ms] ease-in-out" style="letter-spacing: inherit;">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('')

    textEl.innerHTML = `${wrap(mainText)}<span class="${specialSpan.className} inline-block font-bold" style="white-space: nowrap;">${wrap(isobelText)}</span>`

    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleClick = () => {
    if (isExplodedRef.current) return
    isExplodedRef.current = true

    const letters = document.querySelectorAll('.letter-unit')
    letters.forEach(letter => {
      const randomY = Math.random() * 500 + 400
      const randomX = (Math.random() - 0.5) * 500
      const randomRot = (Math.random() - 0.5) * 450
      letter.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRot}deg)`
      letter.style.opacity = '0'
    })

    setTimeout(() => {
      letters.forEach(letter => {
        letter.style.transform = 'translate(0, 0) rotate(0deg)'
        letter.style.opacity = ''
      })
      setTimeout(() => { isExplodedRef.current = false }, 2000)
    }, 2500)
  }

  return (
    <section
      className="relative overflow-hidden bg-[#080808] cursor-pointer"
      id="credits"
      onClick={handleClick}
    >
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 blur-sm opacity-40"
          style={{ backgroundImage: "url('tawha.jpeg')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div
        ref={containerRef}
        id="kinetic-container"
        className="relative z-10 transition-transform duration-700 ease-out flex flex-col items-center"
      >
        <div className="float-animation">
          <p
            ref={textRef}
            id="exploding-text"
            className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-white/20 font-light text-center select-none whitespace-nowrap"
          >
            Website built and designed by{' '}
            <span className="heading inline-block ml-[2px] text-white opacity-100 tracking-[0.2em] md:tracking-[0.4em] font-medium italic text-[7px] md:text-[8px]">
              ISOBEL
            </span>
          </p>
        </div>
      </div>

      <a
        href="#home"
        className="absolute bottom-12 z-20 text-[8px] uppercase tracking-[0.8em] opacity-20 hover:opacity-100 hover:tracking-[1em] transition-all duration-700 ease-in-out"
      >
        Back to Top
      </a>
    </section>
  )
}