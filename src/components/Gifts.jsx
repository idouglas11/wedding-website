import { useState } from 'react'

const ACCOUNTS = {
  NZ: {
    fields: [
      { label: 'Account Name', value: 'ISOBEL DOUGLAS, RUBY BEADLE' },
      { label: 'Account Number', value: '38-9024-0687936-00', copy: true },
    ],
  },
  UK: {
    fields: [
      { label: 'Account Name', value: 'Isobel Douglas', copy: true },
      { label: 'Sort Code', value: '04-00-03', copy: true },
      { label: 'Account Number', value: '76624595', copy: true },
    ],
  },
}

const faceStyle = {
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid var(--glass-border)',
}

export default function Gifts() {
  const [flipped, setFlipped] = useState(false)
  const [copied, setCopied] = useState(null)
  const [region, setRegion] = useState('NZ')

  const copyValue = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(label)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      // clipboard unavailable; the number is still visible to copy by hand
    }
  }

  return (
    <section className="relative overflow-visible bg-[#080808] flex flex-col items-center justify-center min-h-[100dvh]" id="gifts">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 blur-sm opacity-40"
          style={{ backgroundImage: "url('fern.webp')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 text-center mb-10 md:mb-16 px-6">
        <h2 className="heading text-xl md:text-2xl tracking-[0.4em] uppercase font-light mb-6 md:mb-8">Giving</h2>
        <p className="max-w-xl mx-auto font-light leading-relaxed opacity-60 text-[11px] md:text-sm">
          Having you there with us is more than enough. We've decided not to have a traditional gift registry; however,
          if you would like to contribute to our honeymoon fund, a portion of all gifts received will be donated to RainbowYOUTH.
        </p>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-center w-full max-w-5xl px-6 items-center md:items-stretch">
        <div className="w-full max-w-sm h-[260px] md:h-[280px]" style={{ perspective: '1000px' }}>
          <div
            className="relative w-full h-full transition-transform duration-700"
            style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'none' }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-center flex flex-col items-center justify-center"
              style={faceStyle}
              aria-hidden={flipped}
            >
              <h3 className="heading text-lg md:text-xl mb-2 tracking-widest uppercase font-light text-white">Honeymoon Fund</h3>
              <button
                type="button"
                onClick={() => setFlipped(true)}
                tabIndex={flipped ? -1 : 0}
                className="text-[9px] uppercase tracking-[0.4em] text-white opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
              >
                Details →
              </button>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] text-center flex flex-col items-center justify-center gap-3 bg-black/60"
              style={{ ...faceStyle, transform: 'rotateY(180deg)' }}
              aria-hidden={!flipped}
            >
              <div className="flex gap-6">
                {Object.keys(ACCOUNTS).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => { setRegion(r); setCopied(null) }}
                    tabIndex={flipped ? 0 : -1}
                    aria-pressed={region === r}
                    className={`text-[10px] uppercase tracking-[0.4em] text-white transition-opacity cursor-pointer pb-1 border-b ${
                      region === r ? 'opacity-100 border-white/60' : 'opacity-40 hover:opacity-100 border-transparent'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <dl className="text-[11px] md:text-xs font-light leading-relaxed space-y-2">
                {ACCOUNTS[region].fields.map((f) => (
                  <div key={f.label}>
                    <dt className="text-[9px] uppercase tracking-[0.3em] opacity-40">{f.label}</dt>
                    <dd className="tracking-wider flex items-center justify-center gap-2">
                      {f.value}
                      {f.copy && (
                        <button
                          type="button"
                          onClick={() => copyValue(f.label, f.value)}
                          tabIndex={flipped ? 0 : -1}
                          aria-label={copied === f.label ? 'Copied' : `Copy ${f.label.toLowerCase()}`}
                          className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          {copied === f.label ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                          ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></svg>
                          )}
                        </button>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="flex justify-center mt-1">
                <button
                  type="button"
                  onClick={() => setFlipped(false)}
                  tabIndex={flipped ? 0 : -1}
                  className="text-[9px] uppercase tracking-[0.4em] text-white opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  ← Back
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-center flex flex-col items-center justify-center h-[260px] md:h-[280px] w-full max-w-sm">
          <h3 className="heading text-lg md:text-xl mb-2 tracking-widest uppercase font-light text-white">Rainbow YOUTH</h3>
          <a href="https://ry.org.nz/" target="_blank" rel="noreferrer" className="text-[9px] uppercase tracking-[0.4em] text-white opacity-40 hover:opacity-100 transition-opacity">
            Check it out →
          </a>
        </div>
      </div>
    </section>
  )
}
