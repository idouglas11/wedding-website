export default function Where() {
  return (
    <section className="relative overflow-hidden bg-[#080808]" id="where">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 blur-sm opacity-40"
          style={{ backgroundImage: "url('glasshouse.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="heading text-[10px] uppercase tracking-[0.8em] opacity-30 mb-4">Location</h2>
        <h3 className="heading text-4xl font-light tracking-tight text-white mb-8 text-center w-full">
          Glasshouse Morningside
        </h3>
        <div className="glass max-w-2xl w-full p-12 rounded-[3rem] text-center backdrop-blur-sm">
          <p className="font-light leading-relaxed opacity-60 text-sm md:text-base text-white">
            The celebration will be held at Glasshouse Morningside in Auckland.<br />
            Please reach out if you need accommodation recommendations.
          </p>
          <div className="mt-10 pt-10 border-t border-white/5">
            <a
              href="https://www.google.com/maps/place/Glasshouse+Morningside/@-36.8754397,174.7367426,17z/data=!3m1!4b1!4m6!3m5!1s0x6d0d471054e80c29:0x9682a1fdcfcf088a!8m2!3d-36.8754397!4d174.7367426!16s%2Fg%2F11fjqxq_y7?entry=ttu&g_ep=EgoyMDI2MDMwMS4xIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noreferrer"
              className="inline-block px-8 py-3 border border-white/10 rounded-full text-[9px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all"
            >
              View Map
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}