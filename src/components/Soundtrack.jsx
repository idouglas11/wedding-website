export default function Soundtrack() {
  return (
    <section className="relative overflow-hidden bg-[#080808]" id="soundtrack">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 blur-sm opacity-40"
          style={{ backgroundImage: "url('P.jpeg')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <h2 className="heading text-[10px] uppercase tracking-[0.8em] opacity-30 mb-12">The Soundtrack</h2>
      <div className="w-full max-w-2xl glass rounded-[32px] p-2 overflow-hidden shadow-2xl">
        <iframe
          style={{ borderRadius: '24px' }}
          src="https://open.spotify.com/embed/playlist/59HAyZ4tQI678OFbR35ksp?utm_source=generator"
          width="100%"
          height="380"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </section>
  )
}