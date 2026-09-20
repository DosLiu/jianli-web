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
    const isMobileViewport = window.innerWidth <= 639
    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches ||
      (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0)
    const shouldAutoplay = isMobileViewport || isTouchDevice
    const playVideo = () => {
      if (!shouldAutoplay) return
      video.loop = true
      video.autoplay = true
      void video.play().catch(() => {})
    }
    const setInitialFrame = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return
      if (shouldAutoplay) {
        playVideo()
        return
      }
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
    video.addEventListener('loadeddata', playVideo)
    video.addEventListener('canplay', playVideo)
    if (video.readyState >= 1) setInitialFrame()
    if (video.readyState >= 2) playVideo()
    const timer = window.setTimeout(() => onEntrance(true), 800)
    return () => {
      window.clearTimeout(timer)
      video.removeEventListener('seeked', seekNext)
      video.removeEventListener('loadedmetadata', setInitialFrame)
      video.removeEventListener('loadeddata', playVideo)
      video.removeEventListener('canplay', playVideo)
      if (frameId.current !== null) window.cancelAnimationFrame(frameId.current)
    }
  }, [onEntrance])

  const handleTouchStart = () => {
    const video = videoRef.current
    if (!video) return
    void video.play().catch(() => {})
  }

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
    <section id="hero" className="relative flex h-[100dvh] min-h-[100svh] flex-col overflow-hidden sm:min-h-[680px]" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onTouchStart={handleTouchStart}>
      <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" src={VIDEOS.hero} poster={HERO_POSTER} muted playsInline autoPlay={typeof window !== 'undefined' && window.innerWidth <= 639} preload="auto" aria-hidden="true" tabIndex={-1} />

      {/* 科技微光与网格背景 */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent z-[1]" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px] z-[2]" />
      <div className="pointer-events-none absolute top-1/4 right-0 h-[450px] w-[450px] rounded-full bg-indigo-500/[0.07] blur-[130px] z-[2]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] z-[2]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <motion.div className="relative z-10 flex flex-1 flex-col justify-end px-4 pb-[calc(clamp(72px,11vh,130px)+env(safe-area-inset-bottom))] pt-20 sm:px-6 sm:pt-24 md:px-8" initial={{ opacity: 0 }} animate={{ opacity: entranceComplete ? 1 : 0 }} transition={{ duration: 1 }}>
        <div className="flex w-full flex-col items-start gap-12 md:flex-row md:items-end md:justify-between md:gap-16">
          <div className="flex w-full max-w-[500px] flex-col gap-3 sm:gap-4">
            <h1 className="w-full text-[clamp(60px,17vw,164px)] font-light leading-[0.86] tracking-[-0.055em] text-white">
              <ScrambleIn text="刘东生" delay={200} triggered={entranceComplete} />
            </h1>

            <motion.p
              className="w-full max-w-full whitespace-nowrap text-left text-[clamp(11.5px,3.6vw,20px)] leading-[1.2] tracking-[-0.025em] text-white/80 lg:text-[20px]"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: entranceComplete ? 1 : 0, y: entranceComplete ? 0 : 25 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
            >
              5年互联网运营经验，具备AI落地与工作流搭建能力
            </motion.p>
          </div>

          {/* 右侧：纯排版极简三行标签，底线与副标题平齐，无多余边框，静态无悬停变色 */}
          <div className="flex flex-col gap-2 pb-0.5 sm:gap-2.5 shrink-0">
            {[
              '短视频矩阵运营',
              '本地生活从0到1',
              'AI工作流搭建',
            ].map((tag, index) => (
              <motion.div
                key={tag}
                className="flex items-center gap-2.5 select-none"
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{
                  opacity: entranceComplete ? 1 : 0,
                  y: entranceComplete ? 0 : 10,
                  filter: entranceComplete ? 'blur(0px)' : 'blur(4px)',
                }}
                transition={{
                  delay: 0.32 + index * 0.1,
                  duration: 0.75,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
              >
                <span className="font-mono text-[14px] text-white/30 sm:text-[15px]">
                  #
                </span>
                <span className="font-sans text-[15px] font-light tracking-[0.05em] text-white/65 sm:text-[16px]">
                  {tag}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 向下滚动指示器 */}
      <motion.button
        type="button"
        onClick={() => {
          document.getElementById('metrics')?.scrollIntoView({ behavior: 'smooth' })
        }}
        aria-label="向下滚动至核心数据"
        className="group absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/35 transition-colors duration-300 hover:text-white sm:bottom-7"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: entranceComplete ? 1 : 0, y: entranceComplete ? 0 : 10 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <span className="font-mono text-[9.5px] tracking-[0.24em] text-white/40 uppercase transition-colors duration-300 group-hover:text-white/80">SCROLL</span>
        <div className="relative flex h-7.5 w-4 items-start justify-center rounded-full border border-white/20 p-1 transition-colors duration-300 group-hover:border-white/50">
          <motion.div
            className="h-1.5 w-1 rounded-full bg-white/70 shadow-[0_0_6px_rgba(255,255,255,0.7)]"
            animate={{ y: [0, 8, 0], opacity: [0.85, 0.25, 0.85] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.button>
    </section>
  )
}
