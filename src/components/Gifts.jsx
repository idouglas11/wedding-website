export default function Gifts() {
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

      <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-center w-full max-w-5xl px-6">
        <div className="glass p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-center flex flex-col items-center justify-center min-h-[220px] md:min-h-[250px] w-full max-w-sm">
          <h3 className="heading text-lg md:text-xl mb-2 tracking-widest uppercase font-light text-white">Honeymoon Fund</h3>
          <a href="" target="_blank" rel="noreferrer" className="text-[9px] uppercase tracking-[0.4em] text-white opacity-40 hover:opacity-100 transition-opacity">
            Link coming soon...
          </a>
        </div>

        <div className="glass p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-center flex flex-col items-center justify-center min-h-[220px] md:min-h-[250px] w-full max-w-sm">
          <h3 className="heading text-lg md:text-xl mb-2 tracking-widest uppercase font-light text-white">Rainbow YOUTH</h3>
          <a href="https://ry.org.nz/" target="_blank" rel="noreferrer" className="text-[9px] uppercase tracking-[0.4em] text-white opacity-40 hover:opacity-100 transition-opacity">
            Check it out →
          </a>
        </div>
      </div>
    </section>
  )
}