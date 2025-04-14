# 项目架构

本文档概述了 MediaCardfluence 项目的技术架构。

## 概述

本项目是一个使用 React 和 TypeScript 构建的现代 Web 应用程序，旨在帮助自媒体创作者生成美观、专业的社交媒体数据展示卡片。用户可以输入各大平台的粉丝数据，快速生成可分享的个性化数字名片，展示其在各社交媒体平台的影响力。项目利用了 TypeScript、React、Material UI 等技术栈，提供响应式设计和高度可定制的用户体验。

## 目录结构

以下是项目主要目录和文件的说明：

```
mediacardfluence2/
├── .git/            # Git 版本控制相关文件
├── .github/         # GitHub 相关配置，如 Actions 工作流
├── node_modules/    # 项目依赖包
├── public/          # 静态资源文件，如图片、字体等，可以直接通过根 URL 访问
├── src/             # 应用程序的核心源代码
│   ├── components/  # 可复用的 UI 组件
│   │   ├── MediaForm.tsx  # 社交媒体数据输入表单
│   │   ├── MediaCard.tsx  # 生成的社交媒体数据卡片
│   │   ├── Layout.tsx     # 整体布局组件
│   │   └── ...      # 其他业务或功能相关的组件
│   ├── contexts/    # React Context，如主题上下文
│   │   └── ThemeContext.tsx # 主题上下文，处理暗色/亮色主题切换
│   ├── utils/       # 工具函数，辅助脚本
│   ├── assets/      # 项目内部使用的资源，如图标、平台数据
│   │   └── socialPlatforms.ts # 社交媒体平台配置和数据
│   ├── types/       # TypeScript 类型定义
│   │   └── index.ts  # 主要的类型定义文件
│   ├── locales/     # 国际化资源文件
│   ├── App.tsx      # 主应用组件
│   ├── index.tsx    # 应用入口点
│   ├── theme.ts     # 主题配置
│   └── types.ts     # 全局类型定义
├── .gitignore       # 指定 Git 忽略的文件和目录
├── package.json     # 项目元数据和依赖管理
├── tsconfig.json    # TypeScript 配置文件
└── README.md        # 项目说明文档
```

## 关键技术栈

*   **基础框架:** React 18
*   **语言:** TypeScript 4.9
*   **UI 库:** Material UI 5.17 (@mui/material, @mui/icons-material)
*   **样式:** Emotion (@emotion/react, @emotion/styled)
*   **图像处理:** html2canvas (用于将卡片导出为图像)
*   **状态管理:** React Context API, React Hooks (useState, useEffect, useCallback)
*   **存储:** 本地存储 (LocalStorage) 包含数据压缩机制
*   **部署:** GitHub Pages

## 核心概念

*   **组件化架构:** 使用功能性组件和 React Hooks 构建模块化、可维护的 UI。
*   **响应式设计:** 适配不同屏幕尺寸，从移动设备到桌面设备。
*   **主题系统:** 支持明亮/暗黑模式切换，一致的设计语言。
*   **本地存储:** 使用 LocalStorage 持久化用户数据，并实现了智能压缩和错误处理。
*   **卡片生成:** 动态生成可分享的社交媒体数据卡片，支持不同尺寸和导出格式。
*   **国际化:** 支持多语言界面，优化用户体验。

## 数据流

1.  用户在 `MediaForm` 组件中输入社交媒体平台的粉丝数量和联系信息。
2.  数据通过 React 状态管理和 props 传递到 `App` 组件。
3.  `App` 组件将数据传递给 `MediaCard` 组件进行可视化呈现。
4.  数据同时通过 `StorageManager` 类持久化到浏览器的 LocalStorage 中，包含智能压缩和错误处理机制。
5.  用户可以通过 `MediaCard` 组件的导出功能将卡片保存为图像文件。
6.  每次应用启动时，`App` 组件尝试从 LocalStorage 恢复用户数据。

## 关键模块详解

### 1. 数据存储与管理

项目使用了自定义的 `StorageManager` 类进行数据管理，包含以下核心功能：

- 数据压缩：通过 `compressData` 函数减小存储数据体积
- 数据解压：通过 `decompressData` 函数恢复数据结构
- 存储配额管理：检测并处理存储配额溢出情况
- 清理机制：`cleanupStorage` 函数用于清理过期或冗余数据

### 2. 卡片生成与导出

`MediaCard` 组件负责卡片的生成与导出，核心功能包括：

- 动态样式配置：允许用户调整卡片尺寸、颜色、字体等
- 响应式布局：根据卡片实际尺寸动态计算布局参数
- 图像导出：使用 html2canvas 将卡片渲染为图像
- 水印功能：支持添加自定义水印

### 3. 输入表单

`MediaForm` 组件负责数据收集，特点包括：

- 节流更新：避免频繁更新导致的性能问题
- 平台分页：支持大量平台的高效展示
- 实时数据验证：确保用户输入有效数据

## 主要数据结构

项目使用了几个核心数据结构（定义在 types.ts 中）：

```typescript
// 社交媒体平台数据，存储各平台粉丝数
export interface SocialMediaData {
  wechat: number | null;
  xiaohongshu: number | null;
  bilibili: number | null;
  douyin: number | null;
  videoAccount: number | null;
  juejin: number | null;
  zhihu: number | null;
  twitter: number | null;
  kuaishou: number | null;
  weibo: number | null;
}

// 联系方式信息
export interface ContactInfo {
  wechatId: string;
  email: string;
}

// 用户完整数据
export interface UserData {
  socialMedia: SocialMediaData;
  contactInfo: ContactInfo;
  updatedAt: Date | string;
}

// 卡片配置选项
export interface CardConfig {
  width: number;
  height: number | 'auto';
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  fontFamily: string;
  iconSize: number;
  cardTitle: string;
  watermark: WatermarkConfig;
}
```

## 未来方向

1. **服务端集成:** 添加服务器端存储和用户认证，实现跨设备数据同步。
2. **社交分享:** 集成社交媒体分享功能，一键分享到各大平台。
3. **数据分析:** 添加数据分析功能，提供粉丝增长趋势和平台影响力洞察。
4. **模板系统:** 开发更多卡片模板和样式选项。
5. **批量导出:** 支持多种尺寸和格式的批量导出功能。
6. **API 集成:** 通过 API 自动获取社交媒体数据，减少手动输入。 