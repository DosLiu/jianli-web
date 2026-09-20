import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { experienceCards, type ExperienceCard } from '../data/resume'

export function ExperienceSection() {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceCard | null>(null)
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!selectedExperience) return
    const previousOverflow = document.body.style.overflow
    const previousActiveElement = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedExperience(null)
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      ;(lastTriggerRef.current ?? previousActiveElement)?.focus?.()
    }
  }, [selectedExperience])

  const openExperience = (item: ExperienceCard, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger
    setSelectedExperience(item)
  }

  return (
    <section id="experience" className="relative bg-black px-6 py-24 overflow-hidden">
      {/* 科技感微光与空间纵深 */}
      <div className="pointer-events-none absolute -top-32 right-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.04] blur-[160px]" />
      <div className="pointer-events-none absolute -bottom-20 left-10 h-[450px] w-[450px] rounded-full bg-indigo-500/[0.04] blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div className="grid grid-cols-1 items-center gap-5 md:grid-cols-3 md:gap-6" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.9 }}>
          {experienceCards.map((item, index) => (
            <motion.button
              key={item.company}
              type="button"
              onClick={(event) => openExperience(item, event.currentTarget)}
              aria-label={`查看${item.company}详细工作经历`}
              className="group relative flex min-h-[clamp(460px,60vh,540px)] w-full cursor-pointer flex-col justify-start rounded-xl border border-white/10 bg-white/[0.02] p-6 text-left shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:p-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.12 }}
            >
              {/* 卡片顶部高光边 */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-300 group-hover:via-cyan-400/40" />
              <div>
                <p className="mb-5 font-sans text-[clamp(19px,2.2vw,30px)] font-light leading-[1.12] tracking-[-0.04em] text-white">{item.company}</p>
                <p className="text-[12px] uppercase tracking-[0.12em] text-white/55 sm:text-[13px]">{item.role}</p>
                <p className="mt-2 text-[11px] tracking-[0.08em] text-white/30 sm:text-[12px]">{item.period}</p>
              </div>
              <ul className="mt-8 space-y-5 border-t border-white/10 pt-6">
                {item.highlights.map((detail, detailIndex) => (
                  <li key={detail} className="flex gap-3 font-sans text-[clamp(14px,1.25vw,18px)] leading-[1.55] tracking-normal text-white/80 sm:text-[18px]">
                    <span className="mt-[0.55em] shrink-0 font-mono text-[10px] tracking-[0.12em] text-white/30">0{detailIndex + 1}</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-auto pt-8 text-[11px] tracking-[0.12em] text-white/30 transition-colors group-hover:text-white/70">点击查看详细经历 ↗</span>
            </motion.button>
          ))}
        </motion.div>
        {selectedExperience && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="experience-dialog-title"
            onClick={() => setSelectedExperience(null)}
          >
            <motion.div
              ref={dialogRef}
              className="relative max-h-[min(760px,calc(100dvh-2rem))] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/15 bg-[#09090d]/95 p-7 shadow-[0_24px_70px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:p-10"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              {/* 弹窗顶部极细光线 */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

              <button
                ref={closeButtonRef}
                type="button"
                aria-label="关闭详细经历"
                className="group absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-sm font-light text-white/50 transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white sm:right-6 sm:top-6"
                onClick={() => setSelectedExperience(null)}
              >
                ✕
              </button>
              <h2 id="experience-dialog-title" className="pr-10 font-sans text-[clamp(24px,4vw,40px)] font-light leading-[1.08] tracking-[-0.04em] text-white">
                {selectedExperience.company}
              </h2>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] tracking-[0.1em] text-white/45 sm:text-[13px]">
                <span>{selectedExperience.role}</span>
                <span className="text-white/20">/</span>
                <span>{selectedExperience.period}</span>
              </div>
              <div className="my-7 h-px bg-white/10" />
              <ol className="space-y-5">
                {selectedExperience.details.map((detail, detailIndex) => {
                  const itemNumber = selectedExperience.details.slice(0, detailIndex).filter((entry) => entry.kind === 'item').length + 1
                  const isHeading = detail.kind === 'heading'
                  const isContext = detail.kind === 'context'
                  return (isHeading || isContext) ? (
                    <li
                      key={`${detail.kind}-${detail.text}`}
                      className={`font-sans ${
                        isHeading
                          ? 'mt-7 mb-2 flex items-center gap-2.5 text-[15px] font-medium tracking-wide text-white sm:text-[16px] before:h-3 before:w-0.5 before:rounded-full before:bg-cyan-400'
                          : 'pt-1 text-[13px] font-normal tracking-[0.06em] text-white/50 sm:text-[14px]'
                      }`}
                    >
                      {detail.text}
                    </li>
                  ) : (
                    <li key={detail.text} className="flex gap-4 font-sans text-[15px] leading-[1.75] tracking-normal text-white/80 sm:text-[16px]">
                      <span className="shrink-0 font-mono text-[11px] tracking-[0.12em] text-white/35 pt-0.5">{String(itemNumber).padStart(2, '0')}</span>
                      <span>{detail.text}</span>
                    </li>
                  )
                })}
              </ol>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
