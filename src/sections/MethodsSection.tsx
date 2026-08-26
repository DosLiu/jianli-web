import { motion } from 'framer-motion'
import { methods } from '../data/resume'

export function MethodsSection() {
  return (
    <section className="bg-black px-6 pb-16 pt-0 text-center">
      <motion.div className="mx-auto max-w-6xl -translate-y-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1 }}>
        <h2 className="methods-heading mx-auto text-[clamp(28px,4vw,44px)] font-light leading-[1.2] tracking-[-0.02em] text-white">
          <span>把复杂的运营目标拆解成可执行、可复制的</span>
          <span>工作流程，让内容策略、AI工具和团队协作真正落地。</span>
        </h2>
      </motion.div>
      <motion.div className="mx-auto mt-12 flex max-w-md -translate-y-8 flex-col items-center gap-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.2, delay: 0.4 }}>
        {methods.map(([, name, description]) => (
          <div key={name} className="flex min-h-[118px] w-full flex-col gap-3 rounded-lg border border-white/10 px-6 py-6 text-left sm:px-7">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[19px] font-light text-white sm:text-[21px]">{name}</span>
            </div>
            <p className="text-[14px] leading-[1.6] text-white/55 sm:text-[15px]">{description}</p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
