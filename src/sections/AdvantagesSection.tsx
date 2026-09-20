import { motion } from 'framer-motion'
import { CINEMATIC_POSTER, VIDEOS } from '../data/videos'
import { advantageLines } from '../data/resume'
import { VideoBackground } from '../components/VideoBackground'

export function AdvantagesSection() {
  return (
    <section id="cinematic" className="advantages-section relative flex h-[100dvh] min-h-[680px] items-center justify-center overflow-hidden">
      <VideoBackground src={VIDEOS.cinematic} poster={CINEMATIC_POSTER} />

      {/* 画面对比度暗角与黑场无缝羽化 */}
      <div className="pointer-events-none absolute inset-0 bg-black/30 z-[2]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-48 bg-gradient-to-b from-black via-black/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-56 bg-gradient-to-t from-black via-black/60 to-transparent" />

      <motion.div
        className="relative z-10 w-full px-4 sm:px-6 md:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3.5 text-center sm:gap-4.5">
          {advantageLines.map((line, index) => (
            <motion.p
              key={line}
              className="select-none font-sans text-[22px] font-normal leading-[1.35] tracking-[-0.02em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] sm:text-[30px] md:text-[36px] lg:whitespace-nowrap lg:text-[42px]"
              initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.85, delay: index * 0.32, ease: [0.215, 0.61, 0.355, 1] }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
