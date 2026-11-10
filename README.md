<div align="center">

# jianli-web

**刘东生的个人简历网站 · 内容运营 / AI 工作流**

一个以视频背景为主视觉的单页暗色简历站，用 React + Vite + Tailwind CSS + Framer Motion 构建。

[🌐 在线访问](https://www.liutongxue.com.cn) · [🤖 AI 项目作品集](https://web.liutongxue.com.cn)

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white)

<img src="public/videos/hero-poster.jpg" alt="网站首屏预览" width="820" />

</div>

---

## ✨ 特性

- **视频主视觉**：首屏、数据区、优势区、页脚各配一段背景视频，配合渐变羽化无缝衔接到纯黑底色。
- **鼠标拖动播放首屏视频**：桌面端左右移动鼠标即可前后拖动首屏视频；触屏设备改为自动循环播放。
- **入场动效**：姓名用乱码逐字显现（[`ScrambleIn`](src/components/ScrambleIn.tsx)），核心数据滚动进入视野时数字递增，文案逐行模糊淡入。
- **经历卡片 + 详情弹窗**：卡片展示要点，点击打开完整经历；弹窗支持 `Esc` 关闭、焦点锁定、关闭后焦点回到原卡片。
- **一键复制联系方式**：页脚手机号点击即复制，`Clipboard API` 不可用时自动降级为 `execCommand`。
- **响应式适配**：大量使用 `clamp()`、`dvh` / `svh` 和 `safe-area-inset`，手机和桌面都能正常显示。
- **内容与视图分离**：简历文案集中在一个数据文件，改简历不用改组件。
- **轻量素材**：4 段背景视频经过压缩，总计约 3.6 MB，并为每段视频配了 poster 首帧图。

## 🧭 页面结构

| 顺序 | 区块 | 组件 | 内容 |
| --- | --- | --- | --- |
| 1 | Hero 首屏 | [`HeroSection`](src/sections/HeroSection.tsx) | 姓名、一句话定位、三个能力标签 |
| 2 | 核心数据 | [`MetricsSection`](src/sections/MetricsSection.tsx) | 5 年运营 / 30+ 商家代运营 / 0→1 AI 工作流 |
| 3 | 工作经历 | [`ExperienceSection`](src/sections/ExperienceSection.tsx) | 经历卡片（按时间倒序）与详情弹窗 |
| 4 | 个人优势 | [`AdvantagesSection`](src/sections/AdvantagesSection.tsx) | 视频背景上的逐行优势陈述 |
| 5 | 工作方法 | [`MethodsSection`](src/sections/MethodsSection.tsx) | 内容策略 → AI 生产 → 流程沉淀 |
| 6 | 页脚 | [`FooterSection`](src/sections/FooterSection.tsx) | 联系方式复制、作品集入口、回到顶部 |

## 🛠 技术栈

| 类别 | 选型 |
| --- | --- |
| 框架 | React 18 + TypeScript |
| 构建 | Vite 6 |
| 样式 | Tailwind CSS 3 + PostCSS / Autoprefixer |
| 动效 | Framer Motion 12 |

## 🚀 本地运行

需要 **Node.js 18+**。

```bash
# 克隆仓库
git clone https://github.com/DosLiu/jianli-web.git
cd jianli-web

# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 类型检查 + 生产构建，产物输出到 dist/
npm run build

# 本地预览构建产物
npm run preview
```

## 📁 目录结构

```text
jianli-web/
├── public/
│   ├── favicon.svg
│   └── videos/               # 背景视频（.mp4）及对应首帧图（-poster.jpg）
├── src/
│   ├── components/
│   │   ├── ScrambleIn.tsx    # 乱码逐字显现文字效果
│   │   └── VideoBackground.tsx
│   ├── data/
│   │   ├── resume.ts         # 简历文案：优势、数据、方法、工作经历
│   │   └── videos.ts         # 视频与 poster 路径（含缓存版本号）
│   ├── sections/             # 页面各区块组件
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html                # 页面标题、描述与 Open Graph 分享信息
├── tailwind.config.js
└── vite.config.ts
```

## ✏️ 改成你自己的简历

如果你想参考这个项目做自己的简历站，主要改下面几处：

1. **简历内容**：[`src/data/resume.ts`](src/data/resume.ts)
   - `advantageLines`：个人优势，每行一句
   - `metrics`：核心数据，格式为 `[数值, 说明]`
   - `methods`：工作方法，格式为 `[序号, 标题, 描述]`
   - `experienceCards`：工作经历。`highlights` 是卡片上的要点，`details` 是弹窗里的完整内容，支持 `item`（条目）、`heading`（小标题）、`context`（补充说明）三种类型
2. **首屏姓名、定位语和标签**：[`src/sections/HeroSection.tsx`](src/sections/HeroSection.tsx)
3. **联系方式与作品集链接**：[`src/sections/FooterSection.tsx`](src/sections/FooterSection.tsx)、[`src/sections/MethodsSection.tsx`](src/sections/MethodsSection.tsx)
4. **SEO 与分享卡片**：[`index.html`](index.html) 中的 `title`、`description` 和 `og:*` 标签
5. **背景视频**：替换 `public/videos/` 下的视频和 poster 后，记得更新 [`src/data/videos.ts`](src/data/videos.ts) 里的 `?v=` 版本号，避免浏览器和 CDN 继续用旧缓存

> [!TIP]
> 背景视频建议去掉音轨，并压缩到每段 1–2 MB 以内，首屏会加载得更快。例如：
> `ffmpeg -i input.mp4 -an -vcodec libx264 -crf 28 -preset slow -movflags +faststart output.mp4`

## 📦 部署

`npm run build` 生成的是纯静态文件（`dist/`），可以部署到任意静态托管服务，例如 Vercel、Netlify、Cloudflare Pages、GitHub Pages，或者自己的 Nginx 服务器。

## 📄 许可

这个仓库目前没有附带开源许可证。简历内容、个人信息和视频素材归作者所有，请不要直接复用；如果想参考代码实现，欢迎先联系作者。
