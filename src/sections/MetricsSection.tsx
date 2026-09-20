import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { metrics } from '../data/resume'
import { METRICS_POSTER, VIDEOS } from '../data/videos'
import { VideoBackground } from '../components/VideoBackground'

function MetricValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })
  const [display, setDisplay] = useState(value === '0→1' ? '0→0' : value === '30+' ? '0+' : '0年')

  useEffect(() => {
    if (!isInView) return

    if (value === '5年') {
      const controls = animate(0, 5, {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setDisplay(`${Math.round(latest)}年`)
        },
      })
      return () => controls.stop()
    }

    if (value === '30+') {
      const controls = animate(0, 30, {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setDisplay(`${Math.round(latest)}+`)
        },
      })
      return () => controls.stop()
    }

    if (value === '0→1') {
      setDisplay('0→0')
      const timer = window.setTimeout(() => {
        setDisplay('0→1')
      }, 500)
      return () => window.clearTimeout(timer)
    }

    setDisplay(value)
  }, [isInView, value])

  return (
    <span ref={ref} className="tabular-nums tracking-tight">
      {display}
    </span>
  )
}

export function MetricsSection() {
  return (
    <section id="metrics" className="relative min-h-screen overflow-hidden">
      <VideoBackground src={VIDEOS.metrics} poster={METRICS_POSTER} />

      {/* 顶部与底部无缝羽化到纯黑 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black via-black/50 to-transparent z-[2]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/60 to-transparent z-[2]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-32 pt-32">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-8">
          {metrics.map(([value, label], index) => (
            <motion.div
              key={label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <div className="text-[clamp(48px,10vw,96px)] font-light leading-none tracking-[-0.04em] text-white">
                <MetricValue value={value} />
              </div>
              <div className="mt-4 text-[clamp(13px,1.35vw,21px)] leading-[1.2] tracking-normal text-white/80 lg:whitespace-nowrap lg:text-[21px]">
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
