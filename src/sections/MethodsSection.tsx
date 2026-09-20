import { motion } from 'framer-motion'
import { methods } from '../data/resume'

export function MethodsSection() {
  return (
    <section className="bg-black px-6 pb-16 pt-0 text-center">
      <motion.div className="mx-auto max-w-6xl" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1 }}>
        <h2 className="methods-heading mx-auto text-[clamp(20px,3.8vw,42px)] font-light leading-[1.3] tracking-[-0.02em] text-white text-balance">
          <span className="block">把复杂的运营目标拆解成可执行、可复制的工作流程</span>
          <span className="block mt-1 sm:mt-1.5">让内容策略、AI工具和团队协作真正落地</span>
        </h2>
      </motion.div>
      <motion.div className="mx-auto mt-12 flex max-w-md flex-col items-center gap-4 md:grid md:max-w-6xl md:grid-cols-3 md:items-stretch md:gap-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.2, delay: 0.4 }}>
        {methods.map(([step, name, description]) => (
          <div key={name} className="group relative flex min-h-[128px] w-full flex-col justify-between gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] px-6 py-6 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.04] sm:px-7">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-300 group-hover:via-cyan-400/40" />
            <div className="flex items-center justify-between gap-4">
              <span className="text-[19px] font-light text-white sm:text-[21px]">{name}</span>
              <span className="font-mono text-[11px] tracking-[0.18em] text-white/30 transition-colors group-hover:text-white/60">{step}</span>
            </div>
            <p className="text-[14px] leading-[1.6] text-white/55 transition-colors group-hover:text-white/70 sm:text-[15px]">{description}</p>
          </div>
        ))}
      </motion.div>
      <motion.div className="mt-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1, delay: 0.6 }}>
        <a
          href="https://web.liutongxue.com.cn"
          target="_blank"
          rel="noreferrer noopener"
          className="group inline-flex items-center gap-2 text-[13px] tracking-[0.06em] text-white/35 transition-colors duration-300 hover:text-white/80 sm:text-[14px]"
        >
          <span>这些方法正在真实项目里运转，查看AI项目作品集</span>
          <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
        </a>
      </motion.div>
    </section>
  )
}
