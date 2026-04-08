"use client";

import { motion } from "framer-motion";
import { Shield, Activity, Layers } from "lucide-react";

const features = [
  {
    title: "Materiali Selezionati",
    description: "Tessuti tecnici premium, resistenti all'acqua, leggeri e robusti.",
    icon: Shield,
  },
  {
    title: "Ergonomia Avanzata",
    description: "Sistema di supporto dorso studiato per portate prolungate senza affaticare.",
    icon: Activity,
  },
  {
    title: "Finiture Artigianali",
    description: "Ogni zip, ogni gancio, ogni dettaglio scelto per durare anni.",
    icon: Layers,
  },
];

export default function Features() {
  return (
    <section id="caratteristiche" className="bg-[#000000] py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl tracking-tighter text-white/90 font-bold mb-6"
          >
            Perché Pechino.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 text-lg md:text-xl max-w-xl mx-auto"
          >
            Nessun compromesso. L'apice del design funzionale e dell'eleganza tecnica, progettato per eccellere in ogni condizione.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group flex flex-col items-center text-center p-8 border border-white/5 rounded-2xl hover:border-[#C8A97E]/30 transition-colors"
            >
              <div className="h-16 w-16 mb-8 rounded-full bg-white/5 flex items-center justify-center text-[#C8A97E] group-hover:scale-110 group-hover:bg-[#C8A97E]/10 transition-all duration-500">
                <feature.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-semibold text-white/90 tracking-tight mb-4">{feature.title}</h3>
              <p className="text-white/60 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
