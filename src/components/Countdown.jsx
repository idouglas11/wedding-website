import { useEffect, useState } from 'react'

const WEDDING_DATE = new Date('Jan 8, 2027 17:00:00').getTime()

function pad(n) {
  return n.toString().padStart(2, '0')
}

export default function Countdown() {
  const [time, setTime] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' })

  useEffect(() => {
    const tick = () => {
      const dist = WEDDING_DATE - Date.now()
      if (dist < 0) return
      setTime({
        days: pad(Math.floor(dist / 86400000)),
        hours: pad(Math.floor((dist % 86400000) / 3600000)),
        minutes: pad(Math.floor((dist % 3600000) / 60000)),
        seconds: pad(Math.floor((dist % 60000) / 1000)),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative overflow-hidden bg-[#080808]" id="countdown">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 blur-sm opacity-40"
          style={{ backgroundImage: "url('glasshouse_3.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <h2 className="heading text-[9px] uppercase tracking-[0.8em] opacity-30 mb-20">Counting Down</h2>
      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        {[['days', 'Days'], ['hours', 'Hours'], ['minutes', 'Minutes'], ['seconds', 'Seconds']].map(([key, label]) => (
          <div key={key} className="countdown-item">
            <span className="countdown-val">{time[key]}</span>
            <span className="countdown-label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}