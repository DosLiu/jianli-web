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
    <section id="experience" className="min-h-screen bg-black px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div className="grid grid-cols-1 items-center gap-5 md:grid-cols-3 md:gap-6" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.9 }}>
          {experienceCards.map((item, index) => (
            <motion.button
              key={item.company}
              type="button"
              onClick={(event) => openExperience(item, event.currentTarget)}
              aria-label={`查看${item.company}详细工作经历`}
              className="group flex h-[clamp(500px,68vh,640px)] w-full cursor-pointer flex-col justify-start rounded-sm border border-white/15 bg-white/[0.02] p-6 text-left transition-colors duration-300 hover:border-white/35 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:p-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.12 }}
            >
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
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
              className="relative max-h-[min(760px,calc(100dvh-2rem))] w-full max-w-2xl overflow-y-auto rounded-sm border border-white/20 bg-[#08080b] p-7 shadow-2xl shadow-black/50 sm:p-10"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button ref={closeButtonRef} type="button" aria-label="关闭详细经历" className="absolute right-5 top-4 text-3xl font-light leading-none text-white/45 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60" onClick={() => setSelectedExperience(null)}>×</button>
              <h2 id="experience-dialog-title" className="pr-10 font-sans text-[clamp(24px,4vw,42px)] font-light leading-[1.08] tracking-[-0.04em] text-white">{selectedExperience.company}</h2>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] tracking-[0.1em] text-white/45 sm:text-[13px]">
                <span>{selectedExperience.role}</span>
                <span className="text-white/20">/</span>
                <span>{selectedExperience.period}</span>
              </div>
              <div className="my-8 h-px bg-white/10" />
              <ol className="space-y-6">
                {selectedExperience.details.map((detail, detailIndex) => {
                  const itemNumber = selectedExperience.details.slice(0, detailIndex).filter((entry) => entry.kind === 'item').length + 1
                  const isLabel = detail.kind === 'context' || detail.kind === 'heading'
                  return isLabel ? (
                    <li key={`${detail.kind}-${detail.text}`} className="pt-2 font-sans text-[13px] font-normal leading-[1.5] tracking-[0.04em] text-white/55 sm:text-[15px]">{detail.text}</li>
                  ) : (
                    <li key={detail.text} className="flex gap-4 font-sans text-[15px] leading-[1.75] tracking-normal text-white/80 sm:text-[17px]">
                      <span className="shrink-0 font-mono text-[11px] tracking-[0.12em] text-white/35">{String(itemNumber).padStart(2, '0')}</span>
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
