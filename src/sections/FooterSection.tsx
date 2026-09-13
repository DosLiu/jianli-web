import { useEffect, useRef, useState } from 'react'
import { FOOTER_POSTER, VIDEOS } from '../data/videos'
import { VideoBackground } from '../components/VideoBackground'

const PHONE_DISPLAY = '173 2014 6472'
const PHONE_RAW = '17320146472'

export function FooterSection() {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    }
  }, [])

  const copyPhone = async () => {
    let ok = false
    try {
      await navigator.clipboard.writeText(PHONE_RAW)
      ok = true
    } catch {
      const input = document.createElement('input')
      input.value = PHONE_RAW
      input.style.position = 'fixed'
      input.style.opacity = '0'
      document.body.appendChild(input)
      input.select()
      try {
        ok = document.execCommand('copy')
      } catch {
        ok = false
      }
      input.remove()
    }
    if (ok) {
      setCopied(true)
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <footer className="flex min-h-[400px] flex-col overflow-hidden bg-black md:flex-row">
      <div className="relative h-[300px] w-full md:h-auto md:w-1/2"><VideoBackground src={VIDEOS.footer} poster={FOOTER_POSTER} /></div>
      <div className="flex w-full flex-col justify-between p-10 sm:p-16 md:w-1/2">
        <div>
          <div className="text-white/75"><span className="text-[22px] font-medium tracking-tight sm:text-[24px]">刘东生</span></div>
          <div className="mt-8 sm:mt-10">
            <div className="inline-flex w-max flex-col items-stretch">
              <p className="text-justify text-[15px] font-light tracking-[-0.02em] text-white/65 [text-align-last:justify] sm:text-[16px]">把 AI 玩成运营生产力的实干派</p>
              <button
                type="button"
                onClick={copyPhone}
                aria-label={`复制手机号 ${PHONE_DISPLAY}（微信同号）`}
                className="group mt-4 flex w-full items-center justify-between gap-2.5 rounded-sm border border-white/15 px-4 py-2.5 text-left transition-colors duration-300 hover:border-white/40 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <span className={`text-[15px] tracking-[0.04em] transition-colors duration-300 sm:text-[16px] ${copied ? 'text-white' : 'text-white/60 group-hover:text-white/90'}`}>{PHONE_DISPLAY}</span>
                <span className="flex items-center gap-2.5">
                  <span className="text-[12px] text-white/40 transition-colors duration-300 group-hover:text-white/60">微信同号</span>
                  <span className={`w-[56px] text-right text-[12px] tracking-[0.06em] transition-all duration-300 ${copied ? 'text-white/90' : 'text-white/35 group-hover:text-white/65'}`}>{copied ? '已复制 ✓' : '复制'}</span>
                </span>
              </button>
              <a
                href="https://dosliu.github.io/liutongxue-web/scene/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="打开AI项目作品集（新标签页）"
                className="group mt-3 flex w-full items-center justify-between rounded-sm border border-white/15 px-4 py-2.5 transition-colors duration-300 hover:border-white/40 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <span className="text-[15px] tracking-[0.04em] text-white/60 transition-colors duration-300 group-hover:text-white/90 sm:text-[16px]">AI 项目作品集</span>
                <span className="text-[12px] tracking-[0.06em] text-white/35 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/65">↗</span>
              </a>
            </div>
          </div>
        </div>
        <p className="mt-12 text-[12px] text-white/25">(c) 2026 刘东生. All rights reserved.</p>
      </div>
    </footer>
  )
}
