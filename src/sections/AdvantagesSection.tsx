import { motion } from 'framer-motion'
import { CINEMATIC_POSTER, VIDEOS } from '../data/videos'
import { advantageLines } from '../data/resume'
import { VideoBackground } from '../components/VideoBackground'

export function AdvantagesSection() {
  return (
    <section id="cinematic" className="relative flex h-[100dvh] min-h-[680px] items-center justify-center overflow-hidden">
      <VideoBackground src={VIDEOS.cinematic} poster={CINEMATIC_POSTER} />
      <div className="absolute inset-x-0 top-0 z-10 h-[180px] bg-gradient-to-b from-[#010103] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[28%] bg-gradient-to-t from-[#010103] via-[#010103]/45 to-transparent" />
      <motion.div className="relative z-10 w-full px-2 sm:px-4 md:px-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.5 }}>
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3 text-center sm:gap-4" style={{ transform: 'perspective(1200px) rotateX(9deg)', transformOrigin: '50% 50%' }}>
          {advantageLines.map((line, index) => (
            <motion.p key={line} className="select-none font-sans text-[22px] font-normal leading-[1.35] tracking-[-0.02em] text-white sm:text-[30px] md:text-[36px] lg:whitespace-nowrap lg:text-[42px]" initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.85, delay: index * 0.32, ease: [0.215, 0.61, 0.355, 1] }}>
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
