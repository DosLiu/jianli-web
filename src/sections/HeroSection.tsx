import { useEffect, useRef, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { HERO_POSTER, VIDEOS } from '../data/videos'
import { ScrambleIn } from '../components/ScrambleIn'

export function HeroSection({ entranceComplete, onEntrance }: { entranceComplete: boolean; onEntrance: (value: boolean) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const lastX = useRef<number | null>(null)
  const targetTime = useRef(0)
  const isSeeking = useRef(false)
  const queuedTime = useRef<number | null>(null)
  const pendingClientX = useRef<number | null>(null)
  const frameId = useRef<number | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const setInitialFrame = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return
      const startTime = Math.min(0.1, video.duration)
      video.currentTime = startTime
      targetTime.current = startTime
    }
    const seekNext = () => {
      isSeeking.current = false
      if (queuedTime.current !== null) {
        const next = queuedTime.current
        queuedTime.current = null
        video.currentTime = next
        isSeeking.current = true
      }
    }
    video.addEventListener('seeked', seekNext)
    video.addEventListener('loadedmetadata', setInitialFrame)
    if (video.readyState >= 1) setInitialFrame()
    const timer = window.setTimeout(() => onEntrance(true), 800)
    return () => {
      window.clearTimeout(timer)
      video.removeEventListener('seeked', seekNext)
      video.removeEventListener('loadedmetadata', setInitialFrame)
      if (frameId.current !== null) window.cancelAnimationFrame(frameId.current)
    }
  }, [onEntrance])

  const updateVideoFromPointer = () => {
    frameId.current = null
    const video = videoRef.current
    const clientX = pendingClientX.current
    if (!video || !video.duration || clientX === null) return
    if (lastX.current === null) {
      lastX.current = clientX
      targetTime.current = video.currentTime
      return
    }
    const delta = clientX - lastX.current
    lastX.current = clientX
    const viewportWidth = Math.max(window.innerWidth, 1)
    targetTime.current = Math.max(0, Math.min(video.duration, targetTime.current + (delta / viewportWidth) * video.duration * 0.8))
    if (isSeeking.current) {
      queuedTime.current = targetTime.current
    } else {
      video.currentTime = targetTime.current
      isSeeking.current = true
    }
  }

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    pendingClientX.current = event.clientX
    if (frameId.current === null) frameId.current = window.requestAnimationFrame(updateVideoFromPointer)
  }

  const handleMouseLeave = () => {
    lastX.current = null
    pendingClientX.current = null
    if (frameId.current !== null) {
      window.cancelAnimationFrame(frameId.current)
      frameId.current = null
    }
  }

  return (
    <section id="hero" className="relative flex h-[100dvh] min-h-[100svh] flex-col overflow-hidden sm:min-h-[680px]" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" src={VIDEOS.hero} poster={HERO_POSTER} muted playsInline preload="auto" aria-hidden="true" tabIndex={-1} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <motion.div className="relative z-10 flex flex-1 flex-col justify-end px-4 pb-[calc(clamp(72px,11vh,130px)+env(safe-area-inset-bottom))] pt-20 sm:px-6 sm:pt-24 md:px-8" initial={{ opacity: 0 }} animate={{ opacity: entranceComplete ? 1 : 0 }} transition={{ duration: 1 }}>
        <div className="flex w-full flex-col items-start gap-12 md:flex-row md:items-end md:justify-between md:gap-16">
          <div className="flex w-full max-w-[500px] flex-col gap-3 sm:gap-4">
            <h1 className="w-full text-[clamp(60px,17vw,164px)] font-light leading-[0.86] tracking-[-0.055em] text-white"><ScrambleIn text="刘东生" delay={200} triggered={entranceComplete} /></h1>
            <motion.p className="w-full max-w-full whitespace-nowrap text-left text-[clamp(11.5px,3.6vw,20px)] leading-[1.2] tracking-[-0.025em] text-white/80 lg:text-[20px]" initial={{ opacity: 0, y: 25 }} animate={{ opacity: entranceComplete ? 1 : 0, y: entranceComplete ? 0 : 25 }} transition={{ delay: 0.2, duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}>5年互联网运营经验，具备AI落地与工作流搭建能力</motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
