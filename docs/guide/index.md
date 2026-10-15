# 指南

本指南面向第一次接触本项目的同学，手把手教你从零开始：安装环境 → 获取代码 → 安装依赖 → 本地运行 → 修改文档 → 构建发布。跟着做即可，无需任何前置知识。

## 一、这个项目是什么

「慧泉软件组件库」是一个基于 **VitePress** 的文档网站，仅供内部使用，用来记录各类组件（积木组件、通用组件等）的用法，方便开发时查阅。

技术栈非常简单：

| 项目 | 说明 |
| --- | --- |
| 运行平台 | Node.js（本地开发用，网站本身是纯静态页面） |
| 框架 | VitePress（Vue 官方文档框架） |
| 页面语言 | 中文（zh-CN） |
| 文档格式 | Markdown（`.md` 文件） |

你只需要会一点 [Markdown](https://markdown.com.cn/basic-syntax/) 基础（标题、列表、表格），就可以参与写文档。

## 二、环境准备

需要下载安装两个软件：**Node.js** 和 **Git**。

### 2.1 安装 Node.js

Node.js 是运行本项目所需的服务环境，必须安装。

**第 1 步：下载**

打开官网下载页面：<https://nodejs.org/zh-cn>，下载 **LTS（长期支持版）**，Windows 选择 `.msi` 安装包（64-bit）。

> 国内网络较慢时，也可用淘宝镜像站下载：<https://npmmirror.com/mirrors/node/>

**第 2 步：安装**

双击下载的 `.msi` 文件，一路点 **Next** 即可：

1. 阅读并接受许可协议
2. 安装路径保持默认（如 `C:\Program Files\nodejs\`），或改成你喜欢的目录
3. 其他选项全部保持默认，继续 Next
4. 点击 **Install**，等待安装完成
5. 点击 **Finish**

**第 3 步：验证是否安装成功**

按 `Win + R`，输入 `cmd`，回车打开「命令提示符」，输入以下命令：

```bash
node -v
```

```bash
npm -v
```

如果分别显示出版本号（例如 `v20.x.x`、`10.x.x`），说明安装成功。

> **提示：如果提示「不是内部或外部命令」**，说明环境变量没生效。关闭当前命令行窗口，重新打开一个新的再试一次；若仍不行，重启电脑后再试。

### 2.2 安装 Git（可选，推荐）

Git 用于下载代码和版本管理。如果你是拿到现成的代码压缩包，可以跳过本节；如果要从 GitHub 拉取代码，建议安装。

**第 1 步：下载**

打开官网：<https://git-scm.com/downloads/win>，页面通常会自动开始下载 Windows 安装包。

**第 2 步：安装**

双击安装包，选项全部保持默认，一路 **Next / Install** 即可。

**第 3 步：验证**

打开命令提示符，输入：

```bash
git --version
```

显示出版本号（如 `git version 2.x.x`）即安装成功。

### 2.3（可选）把 npm 切换到国内镜像

npm 默认源在国外，下载依赖可能很慢甚至超时。建议先切换到国内镜像，在命令提示符中执行：

```bash
npm config set registry https://registry.npmmirror.com
```

切换后不影响使用，之后想恢复官方源可执行：

```bash
npm config set registry https://registry.npmjs.org
```

## 三、获取项目代码

### 方式一：用 Git 克隆（推荐）

1. 选择一个放代码的目录，例如 `D:\Myproject`
2. 打开命令提示符，执行：

```bash
cd /d D:\Myproject
```

3. 克隆仓库：

```bash
git clone https://github.com/Mbear17/HQ-comp.git
```

4. 进入项目目录：

```bash
cd HQ-comp
```

### 方式二：下载压缩包

如果不用 Git，可直接在 GitHub 页面 <https://github.com/Mbear17/HQ-comp> 点击绿色 **Code** 按钮 → **Download ZIP**，解压到任意目录（路径中尽量不要包含空格和中文），解压后的文件夹就是项目根目录。

### 确认目录结构

进入项目根目录后，你应该能看到类似这样的结构：

```
HQ-comp/                  ← 项目根目录
├── docs/                 ← 所有文档内容
│   ├── .vitepress/       ← 站点配置（导航、侧边栏等）
│   ├── comp/             ← 组件文档页面
│   │   └── block/        ← 积木组件、通用组件
│   ├── index.md          ← 网站首页
│   └── public/           ← 静态资源（图片等）
├── package.json          ← 依赖与脚本配置
├── package-lock.json
└── README.md
```

## 四、安装依赖

在**项目根目录**（就是 `package.json` 所在的目录）下执行：

```bash
npm install
```

- 首次安装需要下载依赖，视网络情况大约需要 1～5 分钟
- 安装过程中出现 `warn`（警告）是正常的，不用理会
- 只要最后没有红色的 `error`，并且命令行恢复可输入状态，就说明成功
- 安装完成后，项目里会多出一个 `node_modules` 文件夹（依赖包目录，不需要提交到 git）

## 五、本地运行（开发模式）

仍在项目根目录下，执行：

```bash
npm run docs:dev
```

看到类似下面的输出，表示启动成功：

```
  VITEPRESS v2.0.0-alpha.16  ready in xxx ms

  ➜  Local:   http://localhost:5173/HQ-comp/
  ➜  Network: use --host to expose
```

**第 1 步：** 用浏览器打开终端里显示的地址，通常是：

```
http://localhost:5173/HQ-comp/
```

**第 2 步：** 看到「慧泉软件组件库」首页，说明运行成功 🎉

**常用操作：**

| 操作 | 说明 |
| --- | --- |
| 保持命令行窗口开着 | 关掉窗口 = 停止服务，网页就打不开了 |
| 停止服务 | 在命令行窗口按 `Ctrl + C` |
| 热更新 | 修改 `.md` 文件保存后，浏览器会自动刷新，无需重启 |

## 六、修改与新增文档

### 6.1 修改已有文档

1. 用任意文本编辑器（推荐 [VS Code](https://code.visualstudio.com/)，免费好用）打开 `docs` 目录下的 `.md` 文件
   - 例如组件文档在 `docs\comp\block\ins-def-1001.md`
2. 修改内容并保存
3. 切到浏览器查看效果（开发模式下会自动刷新）

### 6.2 新增一个文档页面

以在「积木组件」下新增一个组件页为例：

**第 1 步：** 在 `docs\comp\block\` 下新建 Markdown 文件，例如 `ins-def-9999.md`，写入内容：

```markdown
# ins-def-9999 示例组件

这里是组件说明……

## 用法

……
```

**第 2 步：** 打开 `docs\.vitepress\config.mts`，在 `sidebar` →「积木组件」的 `items` 列表末尾加一行：

```ts
{ text: 'ins-def-9999 示例组件', link: '/comp/block/ins-def-9999' },
```

**第 3 步：** 保存后刷新浏览器，左侧侧边栏就能看到新页面了。

> 如果是新增一个**大分类**（新目录），除了侧边栏，通常还要在 `config.mts` 顶部的 `nav` 中加对应导航项。

## 七、构建与发布

开发调试完成后，如果需要生成正式部署的静态网站，执行：

```bash
npm run docs:build
```

构建产物会输出到：

```
docs\.vitepress\dist\
```

该目录就是可以直接部署到 Web 服务器的静态文件（部署路径为 `/HQ-comp/`）。

本仓库的约定是：**构建产物 `docs/.vitepress/dist/` 也随代码一起提交**。因此如果你改的是正式文档，build 完成后请把 `dist` 目录的变更一并提交到 git。

构建后想在本地预览正式产物，可执行：

```bash
npm run docs:preview
```

然后访问终端显示的地址即可。

## 八、常用命令速查

| 命令 | 作用 | 在哪里执行 |
| --- | --- | --- |
| `npm install` | 安装/更新依赖（首次必做） | 项目根目录 |
| `npm run docs:dev` | 启动本地开发服务器 | 项目根目录 |
| `npm run docs:build` | 构建生产环境静态文件 | 项目根目录 |
| `npm run docs:preview` | 本地预览构建产物 | 项目根目录 |
| `node -v` / `npm -v` / `git --version` | 检查环境是否安装成功 | 任意位置 |

## 九、常见问题（FAQ）

**Q1：`npm install` 很慢或经常失败？**
先按 2.3 节切换到国内镜像源，然后删除 `node_modules` 和 `package-lock.json`，重新执行 `npm install`。

**Q2：启动报错 `Port 5173 is already in use`？**
说明 5173 端口被占用（可能已有一个开发服务在跑）。要么关掉已有的服务窗口，要么让 VitePress 换个端口启动：

```bash
npm run docs:dev -- --port 5174
```

**Q3：浏览器打开显示 404？**
注意地址末尾要带 `/HQ-comp/`，完整地址是 `http://localhost:5173/HQ-comp/`，不是 `http://localhost:5173/`。

**Q4：修改了 `config.mts` 但页面没变化？**
开发服务器一般会自动重启。若没反应，在命令行按 `Ctrl + C` 停止后，重新执行 `npm run docs:dev`。

**Q5：路径里能有中文或空格吗？**
尽量避免。建议项目放在类似 `D:\Myproject\HQ-comp` 这样纯英文、无空格的路径下，可减少不必要的奇怪问题。

**Q6：需要安装 Vue、Vite 之类的其他软件吗？**
不需要。Node.js 装好后，其余全部通过 `npm install` 自动从 `package.json` 安装，没有额外软件。

到这里，你就完成了从环境安装到跑起项目的全部流程。接下来可以自由浏览组件文档，或按第六节的方法开始撰写/完善文档内容。
