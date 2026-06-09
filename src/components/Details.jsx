export default function Details() {
  return (
    <section className="relative bg-[#080808]" id="details-cards">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 blur-sm opacity-30"
          style={{ backgroundImage: "url('discoball.png')" }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 max-w-7xl mx-auto w-full">
        <h2 className="heading text-[10px] uppercase tracking-[0.8em] opacity-30 mb-12">Event Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="glass p-10 md:p-12 rounded-[2.5rem] text-center flex flex-col items-center justify-between min-h-[350px]">
            <h3 className="text-[10px] uppercase tracking-[0.4em] mb-8 opacity-40 text-white">Timings</h3>
            <div className="space-y-4 font-light text-sm tracking-widest text-white/80">
              <p>4:00 PM — Arrivals</p>
              <p>4:30 PM — Ceremony</p>
              <p className="opacity-50 italic">Reception to follow</p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 w-full">
              <span className="text-[9px] uppercase tracking-[0.2em] opacity-30 text-white italic">Auckland (NZT)</span>
            </div>
          </div>

          <div className="glass p-10 md:p-12 rounded-[2.5rem] text-center flex flex-col items-center justify-between min-h-[350px]">
            <h3 className="text-[10px] uppercase tracking-[0.4em] mb-8 opacity-40 text-white">Dress Code</h3>
            <div className="flex flex-col items-center">
              <p className="text-2xl md:text-3xl font-light tracking-tight text-white mb-2 leading-tight">
                Colourful<br />Semi-Formal
              </p>
              <p className="text-[9px] uppercase tracking-[0.2em] opacity-40 text-white mt-2">Wear something fun</p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 w-full">
              <span className="text-[9px] uppercase tracking-[0.2em] opacity-30 text-white">Something you feel comfortable in</span>
            </div>
          </div>

          <div className="glass p-10 md:p-12 rounded-[2.5rem] text-center flex flex-col items-center justify-between min-h-[350px]">
            <h3 className="text-[10px] uppercase tracking-[0.4em] mb-8 opacity-40 text-white">Attendance</h3>
            <div className="flex flex-col items-center px-4">
              <p className="text-sm font-light leading-relaxed text-white/80 mb-2">Strictly by invitation only</p>
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 text-white">No Plus Ones</p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 w-full">
              <span className="text-[9px] uppercase tracking-[0.2em] opacity-30 text-white italic">RSVP by September 30th</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}