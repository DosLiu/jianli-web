import { motion } from 'framer-motion'
import { metrics } from '../data/resume'
import { METRICS_POSTER, VIDEOS } from '../data/videos'
import { VideoBackground } from '../components/VideoBackground'

export function MetricsSection() {
  return (
    <section id="metrics" className="relative min-h-screen overflow-hidden">
      <VideoBackground src={VIDEOS.metrics} poster={METRICS_POSTER} />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-32 pt-32">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-8">
          {metrics.map(([value, label], index) => (
            <motion.div key={label} className="text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: index * 0.15 }}>
              <div className="text-[clamp(48px,10vw,96px)] font-light leading-none tracking-[-0.04em] text-white">{value}</div>
              <div className="mt-4 text-[clamp(13px,1.35vw,21px)] leading-[1.2] tracking-normal text-white/80 lg:whitespace-nowrap lg:text-[21px]">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
