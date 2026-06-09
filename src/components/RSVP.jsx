import { useState } from 'react'

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzxKdYYAuVsUz3fTmhWScZ3S6w0hSyt1kGKSOzalSQ_WgYyh0V8FquvBUAYB6p9zP2d/exec'

export default function RSVP({ onSubmitSuccess }) {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    fetch(SCRIPT_URL, { method: 'POST', body: new FormData(e.target) })
      .then(() => {
        setSubmitted(true)
        onSubmitSuccess?.()
      })
  }

  const handleReset = () => {
    setSubmitted(false)
    setSending(false)
  }

  return (
    <section className="relative overflow-hidden bg-[#080808]" id="rsvp">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 blur-sm opacity-40"
          style={{ backgroundImage: "url('glasshouse_rsvp.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="glass w-full max-w-md p-10 rounded-[2.5rem] relative z-10">
        <div className="text-center mb-10">
          <h2 className="heading text-2xl tracking-[0.3em] uppercase font-light">RSVP</h2>
          <p className="text-[9px] uppercase tracking-[0.3em] opacity-30 mt-2">
            Closing September 30th 2026
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[9px] uppercase tracking-[0.3em] opacity-40 mb-1 block">Full Name</label>
              <input type="text" name="name" required placeholder="Name" className="w-full bg-transparent border-b border-white/10 py-2 outline-none font-light text-sm placeholder:opacity-20" />
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-[0.3em] opacity-40 mb-1 block">Email</label>
              <input type="email" name="email" required placeholder="Email" className="w-full bg-transparent border-b border-white/10 py-2 outline-none font-light text-sm placeholder:opacity-20" />
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-[0.3em] opacity-40 mb-1 block">Attendance</label>
              <select name="attendance" className="w-full bg-transparent border-b border-white/10 py-2 outline-none font-light text-sm appearance-none cursor-pointer">
                <option className="bg-[#080808]">See you there!</option>
                <option className="bg-[#080808]">Sorry, I can't make it</option>
              </select>
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-[0.3em] opacity-40 mb-1 block">Dietary Requirements</label>
              <input type="text" name="dietary" placeholder="Vegan, GF, etc." className="w-full bg-transparent border-b border-white/10 py-2 outline-none font-light text-sm placeholder:opacity-20" />
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-[0.3em] opacity-40 mb-1 block">Song Request</label>
              <input type="text" name="song" placeholder="Artist - Track" className="w-full bg-transparent border-b border-white/10 py-2 outline-none font-light text-sm placeholder:opacity-20" />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full py-4 rounded-full mt-4 bg-white text-black hover:bg-neutral-200 transition-all duration-500 uppercase tracking-[0.4em] text-[9px] font-semibold disabled:opacity-60"
            >
              {sending ? 'Sending...' : 'Submit Response'}
            </button>
          </form>
        ) : (
          <div className="rsvp-success show">
            <svg width="120" height="120" viewBox="0 0 120 120" role="img" aria-label="Posted letter animation">
              <path className="draw" d="M40 52 Q60 36 80 52 L80 92 Q80 98 74 98 L46 98 Q40 98 40 92 Z" />
              <path className="draw" d="M50 62 L70 62" />
              <rect className="letter" x="52" y="44" width="16" height="12" rx="2" />
              <path className="draw shine" d="M88 44 L92 48 L100 38" />
            </svg>
            <p className="heading text-[10px] uppercase tracking-[0.5em] opacity-70">
              Your response has been sent
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-4 px-6 py-2 border border-white/10 rounded-full text-[8px] uppercase tracking-[0.3em] opacity-40 hover:opacity-100 hover:bg-white hover:text-black transition-all"
            >
              Submit Another Response
            </button>
          </div>
        )}
      </div>
    </section>
  )
}