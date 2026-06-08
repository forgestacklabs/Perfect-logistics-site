"use client";

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';

const ALL_IMAGES = [
  { id: 1,  src: "/images/rustedpipe.png",   caption: "Rusted Pipe Line Replacement Activity @CTS (CKC) Sholinganallur Chennai"  },
  { id: 2,  src: "/images/dgtankclean.png",  caption: "DG Day Tank Cleaning @CTS(SEZ) Mepz"  },
  { id: 3,  src: "/images/curtain.png",   caption: "Air Curtain @CTS ( CREO) Mlr"  },
  { id: 4,  src: "/images/foodcrusher.png",   caption: "Food Crusher Activity @CTS (CREO) Mlr"  },
  { id: 5,  src: "/images/pipeline.png",   caption: "Pipe Line Modification Flow meter Installation Activity @HCL (ELCOT) Madurai"  },
  { id: 6,  src: "/images/image6.jpeg",  /* caption: "Underground Tank Work" */ },
  { id: 7,  src: "/images/image7.jpeg",  /* caption: "Mechanical Works" */ },
  { id: 8,  src: "/images/image8.jpeg",  /* caption: "Electrical Installation" */ },
  { id: 9,  src: "/images/image9.jpeg",  /* caption: "Safety Inspection" */ },
  { id: 10, src: "/images/image10.jpeg", /* caption: "Field Operations" */ },
  { id: 11, src: "/images/image11.jpeg", /* caption: "Site Survey" */ },
  { id: 12, src: "/images/image12.jpeg", /* caption: "Team at Work" */ },
  { id: 13, src: "/images/image13.jpeg", /* caption: "Operations" */ },
  { id: 14, src: "/images/image14.jpeg", /* caption: "Site Work" */ },
  { id: 15, src: "/images/image15.jpeg", /* caption: "Field Team" */ },
  { id: 16, src: "/images/image16.jpeg", /* caption: "Project Execution" */ },
];

const TOTAL = ALL_IMAGES.length;

const CARD_SPRING = {
  type: 'spring' as const,
  stiffness: 50,
  damping: 20,
  mass: 1.4,
};

function getProps(offset: number) {
  const abs = Math.abs(offset);
  return {
    x:          offset * 240,
    scale:      abs === 0 ? 1    : abs === 1 ? 0.75 : 0.56,
    zIndex:     abs === 0 ? 20   : abs === 1 ? 10   : 2,
    brightness: abs === 0 ? 1    : abs === 1 ? 0.5  : 0.25,
    blur:       abs === 0 ? 0    : abs === 1 ? 1.5  : 3.5,
    width:      abs === 0 ? 310  : abs === 1 ? 252  : 200,
    height:     abs === 0 ? 344  : abs === 1 ? 278  : 220,
  };
}

export default function Gallery() {
  const [center, setCenter]     = useState(0);
  const [showAll, setShowAll]   = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [paused, setPaused]     = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => setCenter(c => (c + 1) % TOTAL), []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, 3200);
  }, [advance]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  useEffect(() => {
    if (showAll || paused) { stopTimer(); return; }
    startTimer();
    return stopTimer;
  }, [showAll, paused, startTimer, stopTimer]);

  const goTo = (i: number) => {
    setCenter(i);
    if (!paused && !showAll) startTimer();
  };

  const slots = [-2, -1, 0, 1, 2].map(offset => {
    const idx = (center + offset + TOTAL) % TOTAL;
    return { offset, idx, image: ALL_IMAGES[idx] };
  });

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">

      {/* dot texture */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: 'radial-gradient(circle,rgba(255,255,255,.18) 1px,transparent 1px)',
        backgroundSize: '38px 38px'
      }}/>

      {/* ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[430px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse,rgba(37,99,235,.18) 0%,transparent 70%)' }}/>

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7, ease: 'easeOut' }}
        >
          <p className="text-xs font-bold tracking-[.38em] text-blue-400 uppercase mb-3">Our Work in Action</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Project{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Gallery</span>
          </h2>
          <div className="mt-4 h-1 w-16 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full mx-auto"/>
        </motion.div>

        {/* ── CAROUSEL ── */}
        {!showAll && (
          <div
            className="select-none"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative flex items-center justify-center" style={{ height: 390 }}>
              {slots.map(({ offset, idx, image }) => {
                const p = getProps(offset);
                const isCenter = offset === 0;

                return (
                  <motion.div
                    key={idx}
                    className="absolute cursor-pointer"
                    style={{ zIndex: p.zIndex }}
                    initial={false}
                    animate={{
                      x:      p.x,
                      scale:  p.scale,
                      filter: `brightness(${p.brightness}) blur(${p.blur}px)`,
                    }}
                    transition={CARD_SPRING}
                    onClick={() => isCenter ? setLightbox(idx) : goTo(idx)}
                  >
                    {/* Card — uses relative positioning so next/image fill works */}
                    <div
                      className="relative overflow-hidden rounded-2xl"
                      style={{
                        width:     p.width,
                        height:    p.height,
                        border:    isCenter ? '2px solid rgba(59,130,246,.65)' : '1px solid rgba(255,255,255,.08)',
                        boxShadow: isCenter
                          ? '0 0 80px rgba(37,99,235,.4), 0 36px 72px rgba(0,0,0,.55)'
                          : '0 8px 32px rgba(0,0,0,.4)',
                      }}
                    >
                      <Image
                        src={image.src}
                        alt={/* image.caption */ "Gallery Image"}
                        fill
                        sizes="(max-width: 768px) 200px, 310px"
                        className="object-cover"
                        priority={idx < 3}
                      />

                      {/* Center card overlay */}
                      {isCenter && (
                        <motion.div
                          className="absolute inset-0 z-10 bg-gradient-to-t from-black/72 via-black/5 to-transparent"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: .55, ease: 'easeOut' }}
                        >
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <motion.p
                              className="text-white font-semibold text-sm tracking-wide"
                              initial={{ y: 12, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: .18, duration: .45, ease: 'easeOut' }}
                            >
                              {image.caption}
                            </motion.p>
                            <motion.div
                              className="mt-1.5 h-0.5 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              style={{ originX: 0 }}
                              transition={{ delay: .3, duration: .5, ease: 'easeOut' }}
                            />
                          </div>
                          <div className="absolute top-3 right-3 bg-white/14 backdrop-blur-sm rounded-lg px-2.5 py-1">
                            <span className="text-white text-xs font-medium">🔍 View</span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Paused badge */}
            <AnimatePresence>
              {paused && (
                <motion.div
                  className="flex justify-center mt-2"
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: .25 }}
                >
                  <span className="text-[11px] text-blue-300/50 tracking-[.28em] uppercase">⏸ Paused</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-6">
              {ALL_IMAGES.map((_, i) => (
                <motion.button
                  suppressHydrationWarning
                  key={i}
                  onClick={() => goTo(i)}
                  className="rounded-full outline-none"
                  animate={{
                    width: i === center ? 28 : 8,
                    background: i === center
                      ? 'linear-gradient(to right,#3b82f6,#10b981)'
                      : 'rgba(255,255,255,.18)',
                  }}
                  transition={{ duration: .4, ease: 'easeInOut' }}
                  style={{ height: 8 }}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex justify-center gap-4 mt-5">
              <motion.button
                suppressHydrationWarning
                whileHover={{ scale: 1.1, x: -3 }} whileTap={{ scale: .93 }} transition={CARD_SPRING}
                onClick={() => goTo((center - 1 + TOTAL) % TOTAL)}
                className="w-11 h-11 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white text-lg hover:bg-blue-500/25 transition-colors"
              >←</motion.button>
              <motion.button
                suppressHydrationWarning
                whileHover={{ scale: 1.1, x: 3 }} whileTap={{ scale: .93 }} transition={CARD_SPRING}
                onClick={() => goTo((center + 1) % TOTAL)}
                className="w-11 h-11 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white text-lg hover:bg-blue-500/25 transition-colors"
              >→</motion.button>
            </div>
          </div>
        )}

        {/* See All / Back */}
        <div className="flex justify-center mt-10">
          <motion.button
            suppressHydrationWarning
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59,130,246,.3)' }}
            whileTap={{ scale: .97 }}
            onClick={() => setShowAll(v => !v)}
            className="px-9 py-3.5 rounded-xl font-semibold text-white"
            style={{
              background: showAll ? 'rgba(255,255,255,.07)' : 'linear-gradient(135deg,#2563eb,#059669)',
              border: '1px solid rgba(255,255,255,.13)',
            }}
          >
            {showAll ? '← Back to Carousel' : 'See All Photos →'}
          </motion.button>
        </div>

        {/* Grid */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
              transition={{ duration: .5, ease: 'easeOut' }}
            >
              {ALL_IMAGES.map((image, i) => (
                <motion.div
                  key={image.id}
                  className="relative overflow-hidden rounded-xl cursor-pointer group"
                  style={{ aspectRatio: '4/3' }}
                  initial={{ opacity: 0, scale: .88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * .04, duration: .4, ease: 'easeOut' }}
                  whileHover={{ scale: 1.04, zIndex: 2 }}
                  onClick={() => setLightbox(i)}
                >
                  <Image
                    src={image.src}
                    alt={/* image.caption */ "Gallery Image"}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/68 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-3">
                    {/* <p className="text-white text-xs font-semibold tracking-wide">{image.caption}</p> */}
                  </div>
                  <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-500/75 backdrop-blur rounded-lg px-2 py-0.5">
                    <span className="text-white text-xs">🔍</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: .35, ease: 'easeOut' }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: .88, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: .88, opacity: 0, y: 18 }}
              transition={CARD_SPRING}
              onClick={e => e.stopPropagation()}
            >
              <div className="relative w-full" style={{ height: '80vh' }}>
                <Image
                  src={ALL_IMAGES[lightbox].src}
                  alt={/* ALL_IMAGES[lightbox].caption */ "Gallery Image"}
                  fill
                  className="object-contain rounded-2xl"
                  sizes="100vw"
                />
              </div>
              {/* <div className="mt-4 text-center text-white/90 font-semibold text-lg tracking-wide">
                {ALL_IMAGES[lightbox].caption}
              </div> */}

              <motion.button suppressHydrationWarning whileHover={{ scale: 1.12, x: -3 }} whileTap={{ scale: .92 }} transition={CARD_SPRING}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-11 h-11 rounded-full bg-white/10 backdrop-blur text-white text-lg flex items-center justify-center hover:bg-blue-500/42 transition-colors"
                onClick={() => setLightbox((lightbox - 1 + TOTAL) % TOTAL)}
              >←</motion.button>

              <motion.button suppressHydrationWarning whileHover={{ scale: 1.12, x: 3 }} whileTap={{ scale: .92 }} transition={CARD_SPRING}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-11 h-11 rounded-full bg-white/10 backdrop-blur text-white text-lg flex items-center justify-center hover:bg-blue-500/42 transition-colors"
                onClick={() => setLightbox((lightbox + 1) % TOTAL)}
              >→</motion.button>

              <motion.button suppressHydrationWarning whileHover={{ scale: 1.15, rotate: 90 }} whileTap={{ scale: .9 }} transition={CARD_SPRING}
                className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-red-500/80 text-white text-sm font-bold flex items-center justify-center hover:bg-red-500 shadow-xl"
                onClick={() => setLightbox(null)}
              >✕</motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}