# 部署指南

本文档提供了将 MediaCardfluence 项目部署到生产环境的说明。

## 推荐平台：Vercel

Vercel 是 Next.js 的创建者，提供了与 Next.js 功能（如 Server Components, Route Handlers, Edge Functions等）无缝集成的最佳部署体验。

### 通过 Vercel 部署

1.  **注册/登录 Vercel:** 访问 [vercel.com](https://vercel.com/) 并使用你的 GitHub, GitLab, 或 Bitbucket 账号登录。
2.  **导入项目:**
    *   点击 "Add New..." -> "Project"。
    *   选择你的 Git 仓库提供商并授权 Vercel 访问。
    *   找到并选择 `MediaCardfluence` 项目仓库。
    *   Vercel 通常会自动检测到这是 Next.js 项目，并配置好构建设置。
3.  **配置项目:**
    *   **Root Directory:** 确保 Vercel 检测到的根目录是包含 `package.json` 和 `next.config.mjs` 的 `mediacardfluence2` 目录。
    *   **Build Command:** 通常是 `next build` (或 `npm run build`)。
    *   **Output Directory:** Vercel 会自动处理 Next.js 的输出目录 (`.next`)。
    *   **Install Command:** 通常是 `npm install` 或 `yarn install`。
4.  **环境变量:**
    *   在项目设置的 "Environment Variables" 部分添加所有必需的环境变量 (例如 `DATABASE_URL`, `OPENAI_API_KEY`, `NEXT_PUBLIC_...` 等)。
    *   区分 "Production", "Preview", 和 "Development" 环境。
    *   **重要:** 切勿将敏感密钥直接硬编码到代码中。
5.  **部署:** 点击 "Deploy" 按钮。
6.  **域名配置 (可选):** 部署成功后，你可以将自定义域名添加到 Vercel 项目中。

### 持续部署

默认情况下，Vercel 会设置 Git 集成，每次推送到主分支 (或其他指定分支) 时都会自动触发新的部署。

## 其他部署选项

虽然 Vercel 是首选，但你也可以将 Next.js 应用部署到其他平台。

### 1. Netlify

Netlify 也提供了对 Next.js 的良好支持。

*   **适配器:** 可能需要使用 `@netlify/plugin-nextjs` (通常会自动安装)。
*   **配置:** 类似于 Vercel，通过连接 Git 仓库进行部署。
*   **环境变量:** 在 Netlify UI 中配置。

### 2. AWS Amplify

AWS Amplify 提供托管服务。

*   **配置:** 连接 Git 仓库，Amplify 会尝试检测框架并配置构建设置。
*   **环境变量:** 在 Amplify 控制台中设置。

### 3. Docker (自托管或云平台)

你可以将 Next.js 应用容器化，并部署到支持 Docker 的任何平台 (如 AWS ECS, Google Cloud Run, Kubernetes 等)。

*   **Dockerfile:** 需要创建一个 `Dockerfile` 来构建生产镜像。Next.js 官方文档提供了示例。
    ```dockerfile
    # Install dependencies only when needed
    FROM node:18-alpine AS deps
    # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
    RUN apk add --no-cache libc6-compat
    WORKDIR /app

    # Install dependencies based on the preferred package manager
    COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
    RUN \
      if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
      elif [ -f package-lock.json ]; then npm ci; \
      elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
      else echo "Lockfile not found." && exit 1; \
      fi


    # Rebuild the source code only when needed
    FROM node:18-alpine AS builder
    WORKDIR /app
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .

    # Next.js collects completely anonymous telemetry data about general usage.
    # Learn more here: https://nextjs.org/telemetry
    # Uncomment the following line in case you want to disable telemetry during the build.
    # ENV NEXT_TELEMETRY_DISABLED 1

    RUN npm run build

    # Production image, copy all the files and run next
    FROM node:18-alpine AS runner
    WORKDIR /app

    ENV NODE_ENV production
    # Uncomment the following line in case you want to disable telemetry during runtime.
    # ENV NEXT_TELEMETRY_DISABLED 1

    RUN addgroup --system --gid 1001 nodejs
    RUN adduser --system --uid 1001 nextjs

    COPY --from=builder /app/public ./public

    # Set the correct permission for prerender cache
    RUN mkdir .next
    RUN chown nextjs:nodejs .next

    # Automatically leverage output traces to reduce image size
    # https://nextjs.org/docs/advanced-features/output-file-tracing
    COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
    COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

    USER nextjs

    EXPOSE 3000

    ENV PORT 3000

    CMD ["node", "server.js"]
    ```
    *   **注意:** 上述 Dockerfile 来自 Next.js 官方示例，请确保它与你的项目和 Node.js 版本兼容。根目录需要调整为 `mediacardfluence2`。
*   **构建与运行:**
    ```bash
    # 从项目根目录 (mediaCardfluence-version/v1-大文件拆分前/mediaCardfluence/mediaCardfluence2-root)
    docker build -t mediacardfluence ./mediacardfluence2
    docker run -p 3000:3000 mediacardfluence
    ```
*   **环境变量:** 需要通过 Docker 环境变量 (`-e` 参数或 `.env` 文件) 传递给容器。

### 4. Node.js 服务器

可以将 Next.js 应用作为独立的 Node.js 服务器运行。

*   **构建:** 运行 `npm run build` (在 `mediacardfluence2` 目录下)。
*   **运行:** 运行 `npm start` (在 `mediacardfluence2` 目录下)。这会启动 Next.js 的生产服务器。
*   **部署:** 需要配置一个反向代理 (如 Nginx 或 Apache) 来处理传入请求并将它们转发到 Next.js 服务器 (通常监听端口 3000)。还需要一个进程管理器 (如 PM2 或 systemd) 来确保 Node.js 进程持续运行。

## 构建过程

无论选择哪个平台，核心构建步骤通常涉及：

1.  **安装依赖:** `npm install` (或 `yarn`, `pnpm i`)
2.  **构建应用:** `npm run build`

此命令会优化应用程序，编译 TypeScript，打包 JavaScript，并生成静态资源和 Serverless Functions/Edge Functions。

## 注意事项

*   **环境变量:** 确保所有必需的环境变量在部署环境中都已正确设置。
*   **数据库迁移:** 如果你的应用使用数据库，确保在部署流程中有数据库迁移的步骤。
*   **性能监控:** 考虑集成性能监控工具 (如 Vercel Analytics, Sentry, Datadog) 来跟踪生产环境中的应用性能和错误。 