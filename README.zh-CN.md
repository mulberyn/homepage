# 🌿 Leaf

[English](./README.md) | **简体中文**

**Leaf** 是一个温暖、清爽、可完全自定义的个人学术主页,走「小清新」路线:
奶油色暖底、珊瑚色点缀、信纸般的排版与轻盈的动效。基于 **React + Vite +
Tailwind CSS + Framer Motion**(全 TypeScript)构建,几分钟即可部署到
**GitHub Pages**。

<p align="center">
  <em>滚动感知悬浮导航 · 暖色明暗主题 · 固定身份侧栏 · 信纸式分区 · 时间线与奖项折叠 · 扁平圆弧背景</em>
</p>

---

## ✨ 特性

- **滚动感知的悬浮顶部导航** — 页面顶部时透明通栏;稍一滚动便收缩成带发丝
  边框、毛玻璃背景与柔和阴影的圆角「胶囊」。向下滚动自动收起,向上滚动立即
  回归。链接通过 scroll-spy 高亮当前小节;手机端收进汉堡菜单,以流畅的
  `grid-template-rows` 动画展开。
- **身份侧栏** — 头像、姓名、可点击的 **@handle**、身份、坐标与社交链接,
  宽屏(≥960px)下固定在内容旁,窄屏下折叠到页面顶部。
- **信纸般的阅读体验** — 居中的阅读栏、1.8 倍行高、衬线正文,分区之间仅以
  暖色细线分隔 — 没有厚重的卡片和边框。
- **暖色明 / 暗主题** — 亮色(奶油底 `#FDF8F5` + 珊瑚色 `#E88F7A`)与温暖
  的深色(`#2D2A26` + 柔和的 `#D4A08A`)。两种模式都保持温暖不冰冷;选择会
  被记住,默认跟随系统偏好。
- **个性化细节** — 加载时逐笔写出的手写体品牌字、教育经历中的校徽徽章、
  经历与论文的虚线竖向时间线、带金/银牌图标的奖项「展开更多」折叠。
- **扁平圆弧背景** — 极低透明度的装饰性 SVG 圆弧与圆圈,适配任意屏幕,
  绝不喧宾夺主。
- **排版** — 标题与界面用 **Inter**,正文用衬线体 **Lora**,品牌字用手写体
  **Dancing Script**。
- **轻盈动效** — 克制的 Framer Motion `whileInView` 上浮渐显与安静的悬停
  反馈,全局尊重 `prefers-reduced-motion`。
- **零代码自定义** — 所有内容集中在一个注释详尽的文件:
  [`src/config/data.ts`](src/config/data.ts)。
- **SEO、PWA、键盘导航、打印样式** — Open Graph + JSON-LD 元数据、可安装
  可离线的 PWA、`j`/`k`/`1`–`9`/`g`/`t` 快捷键,以及省墨的简历打印样式。

---

## 🚀 快速开始(5 分钟)

把 Leaf 变成你自己的主页,只需要编辑**一个文件**:`src/config/data.ts`。

### 1. 本地开发

> **前置要求:**[Node.js](https://nodejs.org/) 18 或更新版本(`node -v`)。

```bash
# 1. 克隆仓库(或在 GitHub 上点 "Use this template" / "Fork")
git clone https://github.com/<username>/<repository-name>.git
cd <repository-name>

# 2. 安装依赖
npm install

# 3. 启动开发服务器(打开 http://localhost:5173)
npm run dev
```

### 2. 填写你的信息

打开 **`src/config/data.ts`**,编辑 `userData` 对象 — 姓名、简介、教育、
经历、论文、奖项和社交链接。文件注释非常详细,无需改动其他任何文件。

> 💡 在 `about` 简介中用 `**双星号**` 包住词语,即可获得柔和的荧光笔
> 高亮效果。

### 3. 替换占位图片

把你的文件放进 **`public/`**,并在 `data.ts` 中指向它们:

| 文件              | 用途                 | 在 `data.ts` 中的写法      |
| ----------------- | -------------------- | -------------------------- |
| `public/avatar.*` | 头像(方形)         | `avatar: '/avatar.jpeg'`   |
| `public/thumb1.*` | 论文缩略图(可选)   | `thumbnail: '/thumb1.svg'` |

### 4. 构建生产版本

```bash
npm run build      # 类型检查 + 输出静态文件到 ./dist
npm run preview    # 本地预览生产构建
```

---

## 🌐 部署到 GitHub Pages

### 方式 A — GitHub Actions 自动部署 ✅(推荐)

仓库自带 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)。
每次推送到 `main` 都会自动构建站点、把 base path 设为
`/<repository-name>/`,并用内置的 `GITHUB_TOKEN` 把 `dist/` 发布到
`gh-pages` 分支 — 无需配置任何 secret。

一次性设置:在 **Settings → Pages** 中把 **Source** 设为 *Deploy from a
branch*,分支选 **`gh-pages`**,目录选 **`/ (root)`**。然后推送即可:

```bash
git push origin main
```

站点将上线于 `https://<username>.github.io/<repository-name>/`。

> 若首次运行无法推送,请在 **Settings → Actions → General → Workflow
> permissions** 中启用 **Read and write permissions**。

### 方式 B — 手动部署

参照 [`.env.example`](.env.example) 创建 `.env`,写入
`VITE_BASE_URL=/<repository-name>/`,然后:

```bash
npm run deploy
```

### 自定义域名 / 用户站点

把 `VITE_BASE_URL` 设为 `/`(CI 部署改 `deploy.yml`,手动部署改
`.env`)即可从根路径提供服务。自定义域名还需在 **Settings → Pages →
Custom domain** 中设置 — 参见
[官方指南](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)。

| 变量            | 默认值 | 说明                                                         |
| --------------- | ------ | ------------------------------------------------------------ |
| `VITE_BASE_URL` | `/`    | 站点的公共基础路径。GitHub Pages 项目站点用 `/<repository-name>/`。 |

---

## 📁 项目结构

```
.
├── .github/workflows/deploy.yml   # CI:构建并部署到 gh-pages
├── public/                        # 静态资源(头像、缩略图、favicon)
├── src/
│   ├── components/
│   │   ├── TopNav.tsx             # 滚动感知悬浮导航胶囊 + 移动端下拉菜单
│   │   ├── ProfileSidebar.tsx     # 固定身份卡片(头像、社交链接)
│   │   ├── MainContent.tsx        # 全部分区 + 简介高亮
│   │   ├── Section.tsx            # 极简分区包装(分隔线 + 渐显)
│   │   ├── ArcBackground.tsx      # 扁平装饰性 SVG 圆弧与圆圈
│   │   ├── ThemeToggle.tsx        # 暖色明 / 暗主题切换
│   │   ├── TimelineList.tsx       # 虚线竖向时间线
│   │   ├── TimelineItem.tsx       # 经历条目
│   │   ├── PublicationItem.tsx    # 论文条目
│   │   ├── EducationItem.tsx      # 带校徽徽章的教育经历
│   │   ├── AwardsList.tsx         # 奖项 + 行内「展开更多」折叠
│   │   ├── AwardItem.tsx          # 单条奖项(奖牌图标)
│   │   ├── SocialLinks.tsx        # 图标链接(GitHub、邮箱等)
│   │   └── Seo.tsx                # Meta 标签 + Open Graph + JSON-LD
│   ├── hooks/
│   │   ├── useHeaderScroll.ts     # 导航胶囊状态:notTop / 下滑隐藏
│   │   ├── useScrollSpy.ts        # 当前小节追踪 + 平滑滚动
│   │   └── useKeyboardNav.ts      # j/k、方向键、1–9、g/G、t 快捷键
│   ├── config/
│   │   └── data.ts                # 👈 你的全部个人信息都在这里
│   ├── context/
│   │   └── ThemeContext.tsx       # 全局主题状态
│   ├── styles/
│   │   └── index.css              # Tailwind + CSS 变量主题 + 打印样式
│   ├── App.tsx                    # 布局:背景、导航、侧栏、内容、SEO
│   └── main.tsx                   # React 入口
├── vite.config.ts                 # base path(VITE_BASE_URL)+ PWA 配置
├── tailwind.config.js
└── package.json
```

---

## 🎨 自定义速查表

| 我想要…               | 这样做                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------ |
| 修改任何文字/内容     | 编辑 `src/config/data.ts`                                                                  |
| 调整或隐藏某个分区    | 在 `data.ts` 的 `navItems` 中重排 / 删除条目                                               |
| 换头像                | 替换 `public/avatar.jpeg` 并更新 `data.ts` 中的 `avatar`                                   |
| 修改 `@handle` 链接   | 设置 `data.ts` 中的 `githubHandle` / `githubUrl`                                           |
| 换校徽                | 把 logo 放进 `public/`,并在教育条目上设置 `logo`                                          |
| 高亮 / 折叠某条奖项   | 设置该奖项的 `highlight: true/false`                                                       |
| 调整主题色            | 编辑 `src/styles/index.css` 中的 `--color-primary`(亮色)与 `[data-theme='dark']` 区块 |
| 调整背景圆弧          | 编辑 `src/components/ArcBackground.tsx`                                                    |

> ⌨️ **键盘快捷键:**`j`/`k` 或 ↑/↓ 在小节间移动 · `1`–`9` 直接跳转 ·
> `g`/`G` 跳到第一/最后一节 · `t` 切换主题。

---

## 🛠️ 可用脚本

| 命令                | 作用                                     |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | 启动带热更新的 Vite 开发服务器           |
| `npm run typecheck` | 用 `tsc --noEmit` 做类型检查             |
| `npm run build`     | 类型检查 + 生产构建到 `./dist`           |
| `npm run preview`   | 本地预览生产构建                         |
| `npm run deploy`    | 构建并把 `./dist` 发布到 `gh-pages` 分支 |

---

## 💐 致谢

Leaf 受到了这些优秀项目的启发:

- **[mem.ac](https://mem.ac/)** — 内容结构(关于 / 教育 / 经历 / 论文 /
  奖项)以及「安静的个人学术主页」这一整体思路。
- **[Astro Theme Pure](https://github.com/cworld1/astro-theme-pure)** —
  滚动感知的悬浮顶部导航:透明到胶囊的形态变化、下滑隐藏行为,以及移动端
  `grid-template-rows` 下拉菜单。
- 用 ❤️ 与 [React](https://react.dev/)、[Vite](https://vite.dev/)、
  [Tailwind CSS](https://tailwindcss.com/)、
  [Framer Motion](https://www.framer.com/motion/) 构建。

---

## 📄 许可证

MIT — 可自由使用、修改与分享。欢迎但不强求署名。
