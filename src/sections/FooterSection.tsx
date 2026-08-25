import { FOOTER_POSTER, VIDEOS } from '../data/videos'
import { VideoBackground } from '../components/VideoBackground'

export function FooterSection() {
  return (
    <footer className="flex min-h-[400px] flex-col overflow-hidden bg-black md:flex-row">
      <div className="relative h-[300px] w-full md:h-auto md:w-1/2"><VideoBackground src={VIDEOS.footer} poster={FOOTER_POSTER} /></div>
      <div className="flex w-full flex-col justify-between p-10 sm:p-16 md:w-1/2">
        <div>
          <div className="mb-3 text-white/70"><span className="text-[18px] font-medium tracking-tight sm:text-[19px]">刘东生</span></div>
          <p className="mb-6 text-[15px] font-light tracking-[-0.02em] text-white/65 sm:text-[16px]">把 AI 玩成运营生产力的实干派</p>
          <p className="text-[13px] text-white/45">173 2014 6472（微信同号）</p>
        </div>
        <p className="mt-12 text-[12px] text-white/25">(c) 2026 刘东生. All rights reserved.</p>
      </div>
    </footer>
  )
}
