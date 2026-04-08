"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const TOTAL_FRAMES = 192;

export default function PechinoZaino() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedPercent, setLoadedPercent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load images process
  useEffect(() => {
    let loaded = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `/frames/frame_${paddedIndex}_delay-0.041s.jpg`;
      img.onload = () => {
        loaded++;
        setLoadedPercent(Math.round((loaded / TOTAL_FRAMES) * 100));
        if (loaded === TOTAL_FRAMES) {
          setIsLoading(false);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);

    return () => {
      // Cleanup references if unmounted during load
      setImages([]);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Canvas Drawing Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0 || isLoading) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      // Calculate active frame based on spring value
      const progress = smoothProgress.get();
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
      );

      const targetImage = images[frameIndex];

      if (targetImage && targetImage.complete) {
        // Adjust Canvas Internal Size smoothly
        const { clientWidth, clientHeight } = canvas.parentElement || {
          clientWidth: window.innerWidth,
          clientHeight: window.innerHeight,
        };
        canvas.width = clientWidth;
        canvas.height = clientHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw image "contain" logic
        const imageAspect = targetImage.width / targetImage.height;
        const canvasAspect = canvas.width / canvas.height;
        
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasAspect > imageAspect) {
          drawHeight = canvas.height;
          drawWidth = targetImage.width * (canvas.height / targetImage.height);
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        } else {
          drawWidth = canvas.width;
          drawHeight = targetImage.height * (canvas.width / targetImage.width);
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        }

        ctx.drawImage(targetImage, offsetX, offsetY, drawWidth, drawHeight);

        // Disegna un rettangolo nero in basso a destra per coprire il watermark generato da tool esterni
        ctx.fillStyle = "#000000";
        const watermarkWidth = drawWidth * 0.2; // 20% della larghezza
        const watermarkHeight = drawHeight * 0.05; // 5% dell'altezza
        ctx.fillRect(
          offsetX + drawWidth - watermarkWidth,
          offsetY + drawHeight - watermarkHeight,
          watermarkWidth,
          watermarkHeight + 5 // +5 for extra safe bleeding to edges
        );
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [smoothProgress, images, isLoading]);

  // Transform Mappings for Beats
  // Mappatura Y: [inizio, inizio+0.1, fine-0.1, fine] -> [20, 0, 0, -20]
  // Mappatura opacity: [inizio, inizio+0.1, fine-0.1, fine] -> [0, 1, 1, 0]

  // Start indicator
  const indicatorOp = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  // Beat A: 0.00 - 0.20
  const opA = useTransform(smoothProgress, [0, 0.1, 0.1, 0.2], [0, 1, 1, 0]);
  const yA = useTransform(smoothProgress, [0, 0.1, 0.1, 0.2], [20, 0, 0, -20]);

  // Beat B: 0.25 - 0.45
  const opB = useTransform(smoothProgress, [0.25, 0.35, 0.35, 0.45], [0, 1, 1, 0]);
  const yB = useTransform(smoothProgress, [0.25, 0.35, 0.35, 0.45], [20, 0, 0, -20]);

  // Beat C: 0.50 - 0.70
  const opC = useTransform(smoothProgress, [0.50, 0.60, 0.60, 0.70], [0, 1, 1, 0]);
  const yC = useTransform(smoothProgress, [0.50, 0.60, 0.60, 0.70], [20, 0, 0, -20]);

  // Beat D: 0.75 - 0.95
  const opD = useTransform(smoothProgress, [0.75, 0.85, 0.85, 0.95], [0, 1, 1, 0]);
  const yD = useTransform(smoothProgress, [0.75, 0.85, 0.85, 0.95], [20, 0, 0, -20]);
  
  // Custom pointer events enabler. If Opacity high, allow clicking CTA.
  const [allowPointerD, setAllowPointerD] = useState(false);
  
  useEffect(() => {
    const unsub = opD.on("change", (val) => {
      setAllowPointerD(val > 0.8);
    });
    return unsub;
  }, [opD]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#000000]">
          <div className="w-12 h-12 border-4 border-white/10 border-t-[#C8A97E] rounded-full animate-spin mb-8"></div>
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C8A97E] transition-all duration-300 ease-out"
              style={{ width: `${loadedPercent}%` }}
            ></div>
          </div>
          <p className="text-[#C8A97E] mt-4 font-mono text-sm tracking-widest uppercase">
            Loading {loadedPercent}%
          </p>
        </div>
      )}

      {/* 400vh Container for scroll hijacking */}
      <div ref={containerRef} className="relative h-[400vh] w-full bg-[#000000]">
        
        {/* Sticky Canvas & UI Overlay */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain"
          />

          {/* Absolute Typography Overlays */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center">
            
            {/* Scroll Indicator */}
            <motion.div
              style={{ opacity: indicatorOp }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
              <span className="text-white/60 uppercase tracking-widest text-xs mb-4">Scorri per scoprire</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent"></div>
            </motion.div>

            {/* Beat A */}
            <motion.div
              style={{ opacity: opA, y: yA }}
              className="absolute inset-0 flex flex-col items-center justify-start pt-32 md:pt-0 md:justify-center text-center px-4"
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl tracking-tighter font-bold text-white/90">
                PORTALO OVUNQUE.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-white/60 max-w-xl">
                Costruito per durare. Pensato per chi non si ferma mai.
              </p>
            </motion.div>

            {/* Beat B */}
            <motion.div
              style={{ opacity: opB, y: yB }}
              className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-0 md:justify-center md:pl-24 lg:pl-32 px-6"
            >
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl tracking-tighter font-bold text-white/90 max-w-3xl leading-[1.1]">
                COSTRUZIONE SENZA COMPROMESSI
              </h2>
              <p className="mt-6 text-lg md:text-xl text-white/60 max-w-xl">
                Ogni cucitura. Ogni dettaglio. Ogni scelta di materiale.
              </p>
            </motion.div>

            {/* Beat C */}
            <motion.div
              style={{ opacity: opC, y: yC }}
              className="absolute inset-0 flex flex-col justify-start pt-24 md:pt-0 md:justify-center items-end text-right md:pr-24 lg:pr-32 px-6"
            >
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl tracking-tighter font-bold text-white/90 max-w-2xl leading-[1.1]">
                SPAZIO PENSATO
              </h2>
              <p className="mt-6 text-lg md:text-xl text-white/60 max-w-xl">
                Organizzazione interna su misura. Tutto al suo posto, sempre.
              </p>
            </motion.div>

            {/* Beat D */}
            <motion.div
              style={{ opacity: opD, y: yD }}
              className="absolute inset-0 flex flex-col items-center justify-end pb-32 md:pb-0 md:justify-center text-center px-4"
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl tracking-tighter font-bold text-white/90 mb-6">
                PECHINO.
              </h2>
              <p className="text-lg md:text-xl text-white/60 mb-12">
                Il compagno di viaggio che non delude mai.
              </p>
              <a
                href="#scopri"
                className={`pointer-events-auto bg-[#C8A97E] text-black font-semibold px-8 py-4 rounded-full shadow-[0_0_24px_rgba(200,169,126,0.4)] hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(200,169,126,0.6)] transition-all duration-300 ${!allowPointerD && 'pointer-events-none'}`}
              >
                Scopri Pechino →
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
}
