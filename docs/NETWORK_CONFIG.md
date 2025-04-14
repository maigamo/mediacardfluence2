# 网络配置指南

本文档描述了 MediaCardfluence 项目部署后的网络相关配置。

## 域名配置

将自定义域名指向你的应用程序是常见的需求。

### 使用 Vercel

1.  登录 Vercel 并导航到你的项目。
2.  转到 "Settings" -> "Domains"。
3.  添加你的自定义域名。
4.  Vercel 会提供 DNS 记录（通常是 A 记录或 CNAME 记录），你需要在你的域名注册商处配置这些记录。
5.  Vercel 会自动处理域名的验证和 SSL 证书的颁发（通过 Let's Encrypt）。

### 使用其他平台 (Netlify, AWS, 自托管等)

1.  **DNS 配置:** 在你的域名注册商处，将域名的 DNS 记录（通常是 A 记录或 CNAME 记录）指向你的托管平台的 IP 地址或提供的 CNAME 目标。
2.  **平台配置:** 在你的托管平台（如 Netlify, AWS Load Balancer/CloudFront）上添加并验证你的自定义域名。

## HTTPS/SSL 证书

**强烈建议**为你的应用程序启用 HTTPS，以确保数据传输安全并提高用户信任度。

*   **Vercel/Netlify:** 这些平台通常会自动为你配置的自定义域名颁发和续订免费的 Let's Encrypt SSL 证书。
*   **AWS (CloudFront/ALB):** 你可以使用 AWS Certificate Manager (ACM) 来免费颁发和管理 SSL 证书。
*   **自托管 (Nginx/Apache):**
    *   **Let's Encrypt:** 可以使用 Certbot 工具自动获取和续订免费的 Let's Encrypt 证书。
    *   **商业证书:** 购买商业 SSL 证书并在你的 Web 服务器（Nginx/Apache）上进行配置。

## 端口

*   **开发环境:** Next.js 开发服务器默认运行在 `http://localhost:3000`。
*   **生产环境 (Vercel/Netlify等):** 这些平台通常处理端口映射。你的应用内部可能监听 3000 端口，但外部通过标准的 HTTP (80) 和 HTTPS (443) 端口访问。
*   **生产环境 (Docker/自托管):**
    *   Next.js 生产服务器 (`npm start`) 默认监听 3000 端口 (可以通过 `PORT` 环境变量更改)。
    *   通常会使用反向代理 (如 Nginx) 监听 80 和 443 端口，并将请求转发到 Next.js 应用监听的端口 (例如 3000)。

## 防火墙和安全组

如果你的应用部署在云基础设施（如 AWS, GCP, Azure）或自托管服务器上：

*   确保防火墙或安全组规则允许外部流量访问你的应用程序所需的端口（通常是 HTTP/80 和 HTTPS/443）。
*   限制对数据库或其他内部服务的访问，只允许来自应用程序服务器的流量。

## CDN (内容分发网络)

*   **Vercel/Netlify/CloudFront:** 这些平台内置了 CDN 功能，可以自动缓存你的静态资源（JavaScript, CSS, 图片等）到全球边缘节点，减少延迟并提高加载速度。
*   **自托管:** 你可以考虑使用独立的 CDN 服务（如 Cloudflare, Fastly）来缓存静态资源，并将 CDN 配置为指向你的源服务器。

## API 路由和外部服务

*   **防火墙:** 如果你的 API 路由需要访问外部 API 或数据库，确保出站防火墙规则允许这些连接。
*   **IP 白名单:** 某些外部服务可能需要将你的服务器 IP 地址添加到其白名单中才能访问。
Vercel 等平台的 IP 地址可能是动态的或来自一个范围，请查阅其文档了解如何处理这种情况 (例如，使用 Vercel 的 Secure Compute 功能获取静态出站 IP)。

---

请根据你的具体部署环境和需求调整此文档。 