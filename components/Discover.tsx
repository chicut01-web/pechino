"use client";

import { motion } from "framer-motion";

export default function Discover() {
  return (
    <section id="scopri" className="bg-[#000000] py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C8A97E]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl tracking-tighter text-white/90 font-bold mb-6"
        >
          Fatto per te.
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-16"
        >
          Pechino è disponibile in quantità limitata. Entra nella lista e scopri come ottenerlo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          <div className="relative group p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent">
            {/* Outer Glow */}
            <div className="absolute -inset-1 rounded-2xl bg-[#C8A97E]/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-black border border-[#C8A97E]/30 rounded-xl p-8 shadow-[0_0_40px_rgba(200,169,126,0.1)]">
              <form className="flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="La tua email migliore"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#C8A97E]/50 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-[#C8A97E] text-black font-semibold tracking-wide py-4 rounded-lg shadow-[0_0_24px_rgba(200,169,126,0.4)] hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(200,169,126,0.6)] transition-all duration-300"
                >
                  Entra nella lista
                </button>
              </form>
              <p className="text-white/40 text-xs mt-6 uppercase tracking-widest text-center">
                Produzione limitata. Qualità senza compromessi.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
