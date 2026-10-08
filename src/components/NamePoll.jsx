import { useEffect, useRef, useState } from 'react'

const API = 'https://abacus.jasoncameron.dev'
// In dev (npm run dev) every page load starts a fresh, empty poll so it can be re-tested.
const DEV = import.meta.env.DEV
const NAMESPACE = DEV ? `dbbk-wedding-name-poll-dev-${Date.now()}` : 'dbbk-wedding-name-poll-t2'
const STORAGE_KEY = 'name-poll-vote-v4'
const REFRESH_MS = 5000

const OPTIONS = [
  { id: 'douglas', name: 'Douglas' },
  { id: 'beadle', name: 'Beadle' },
  { id: 'beaumont', name: 'Beaumont' },
  { id: 'kempthorne', name: 'Kempthorne' },
  { id: 'nochange', name: "Don't change" },
]

const readVote = () => {
  if (DEV) return null
  try { return localStorage.getItem(STORAGE_KEY) } catch { return null }
}

function CountUp({ value }) {
  const [shown, setShown] = useState(0)
  const from = useRef(0)
  useEffect(() => {
    const start = performance.now()
    const begin = from.current
    let raf
    const tick = (now) => {
      const t = Math.min(1, (now - start) / 900)
      const eased = 1 - Math.pow(1 - t, 4)
      setShown(Math.round(begin + (value - begin) * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
      else from.current = value
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value])
  return <>{shown}</>
}

export default function NamePoll() {
  const [counts, setCounts] = useState(null)
  const [voted, setVoted] = useState(readVote)
  const [stage, setStage] = useState(() => (readVote() ? 'results' : 'choose')) // choose | writing | dropping | results
  const [picked, setPicked] = useState(null)
  const [error, setError] = useState(false)
  const timers = useRef([])

  const load = () =>
    Promise.all(
      OPTIONS.map(o =>
        fetch(`${API}/get/${NAMESPACE}/${o.id}`)
          .then(r => (r.ok ? r.json() : { value: 0 }))
          .then(d => [o.id, d.value ?? 0])
          .catch(() => [o.id, null])
      )
    ).then(entries =>
      setCounts(prev => {
        const next = { ...(prev || {}) }
        entries.forEach(([id, v]) => { if (v !== null) next[id] = Math.max(v, 0) })
        return next
      })
    )

  useEffect(() => {
    load()
    const t = setInterval(() => { if (!document.hidden) load() }, REFRESH_MS)
    const pending = timers.current
    return () => { clearInterval(t); pending.forEach(clearTimeout) }
  }, [])

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))

  const choose = (id) => {
    if (stage !== 'choose') return
    setPicked(id)
    setStage('writing')
    later(() => setStage('dropping'), 2300)
    later(() => {
      setVoted(id)
      try { localStorage.setItem(STORAGE_KEY, id) } catch { /* ignore */ }
      setCounts(c => ({ ...(c || {}), [id]: ((c && c[id]) || 0) + 1 }))
      fetch(`${API}/hit/${NAMESPACE}/${id}`)
        .then(r => { if (!r.ok) throw new Error() })
        .then(load)
        .catch(() => setError(true))
      setStage('results')
    }, 2300 + 1500)
  }

  const total = counts ? Object.values(counts).reduce((a, b) => a + b, 0) : 0
  const max = counts ? Math.max(0, ...Object.values(counts)) : 0
  const pickedName = OPTIONS.find(o => o.id === picked)?.name

  return (
    <section className="relative overflow-hidden bg-[#080808]" id="name-poll">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 blur-sm opacity-40 poll-drift"
          style={{ backgroundImage: "url('glasshouse_rsvp.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="glass w-full max-w-md p-8 md:p-10 rounded-[2.5rem] relative z-10 poll-card">
        <div className="text-center mb-6">
          <p className="text-[9px] uppercase tracking-[0.4em] opacity-30 mb-3">The Big Question</p>
          <h2 className="heading text-xl tracking-[0.25em] uppercase font-light">
            {'What should our name be?'.split(' ').map((w, i) => (
              <span key={i} className="poll-word" style={{ '--w': i }}>{w}&nbsp;</span>
            ))}
          </h2>
          <p className="text-[9px] uppercase tracking-[0.3em] opacity-30 mt-3">
            {stage === 'results' ? 'The votes so far' : stage === 'choose' ? 'Tap one to cast your vote' : 'Writing your vote…'}
          </p>
        </div>

        {stage === 'choose' && (
          <ul className="opt-list">
            {OPTIONS.map((o, i) => (
              <li key={o.id}>
                <button type="button" className="opt heading" style={{ '--n': i }} onClick={() => choose(o.id)}>
                  {o.name}
                  <svg width="26" height="12" viewBox="0 0 26 12" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 6.5 C8 5.5 15 6.5 24 6" /><path d="M19 1.5 L24.5 6 L19.5 10.5" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}

        {(stage === 'writing' || stage === 'dropping') && (
          <div className="poll-stage">
            <div className={`paper-wrap ${stage === 'dropping' ? 'dropping' : ''}`}>
              <svg viewBox="0 0 240 140" preserveAspectRatio="none" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path className="draw-path" d="M8 10 C70 6 170 12 232 8 C234 50 230 90 233 132 C170 136 70 130 7 134 C10 90 5 50 8 10 Z" fill="rgba(255,255,255,0.05)" />
                <path className="draw-path" style={{ animationDelay: '0.3s' }} d="M20 104 C80 102 160 106 220 103" opacity="0.35" />
                <path className="draw-path" style={{ animationDelay: '0.4s' }} d="M20 122 C80 120 160 124 220 121" opacity="0.35" />
              </svg>
              <div className="paper-text">
                <small>I vote…</small>
                <span className="paper-name" style={{ fontSize: pickedName && pickedName.length > 10 ? 32 : pickedName && pickedName.length > 8 ? 36 : 42 }}>{pickedName}</span>
              </div>
              <svg className="pencil" viewBox="0 0 40 40" fill="#080808" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round">
                <path d="M4 36 L8 24 L28 4 L36 12 L16 32 Z" /><path d="M8 24 L16 32" /><path d="M24 8 L32 16" />
              </svg>
            </div>

            <div className={`ballot-box ${stage === 'dropping' ? 'thunk' : ''}`}>
              <svg viewBox="0 0 190 130" width="190" height="130" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path className="draw-path" fill="#0b0b0b" d="M14 34 C60 32 130 36 176 33 C178 66 174 98 177 122 C130 126 60 120 13 124 C16 90 11 62 14 34 Z" />
                <path className="draw-path" d="M52 33 C80 37 110 37 138 33" strokeWidth="3" />
                <path className="draw-path" style={{ animationDelay: '0.3s' }} d="M60 78 C75 70 90 90 105 80 C112 76 120 80 128 76" opacity="0.6" />
                <path className="draw-path" d="M14 34 L26 20 C70 18 120 22 164 19 L176 33" />
                <path className="draw-path" style={{ animationDelay: '0.4s' }} d="M70 27 C90 29 105 29 122 27" strokeWidth="2.4" />
              </svg>
            </div>
          </div>
        )}

        {stage === 'results' && (
          <div className="poll-fade">
            {OPTIONS.map((o, i) => {
              const n = counts?.[o.id] ?? 0
              const pct = total ? (n / total) * 100 : 0
              return (
                <div key={o.id} className={`res-row ${n === max && n > 0 ? 'lead' : ''}`} style={{ '--n': i }}>
                  <div className="res-head heading">
                    <span>{o.name}</span>
                    <span><b><CountUp value={n} /></b><small>{Math.round(pct)}%</small></span>
                  </div>
                  <div className="res-bar"><div className="res-fill" style={{ width: `${pct}%` }} /></div>
                </div>
              )
            })}
          </div>
        )}

        <p className="text-center text-[8px] uppercase tracking-[0.3em] opacity-30 mt-6">
          {error ? "Couldn't save your vote — try again later" : stage === 'results' ? `${total} vote${total === 1 ? '' : 's'} so far · live` : 'One vote each'}
        </p>
      </div>
    </section>
  )
}
