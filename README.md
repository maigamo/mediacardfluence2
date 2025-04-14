# mediacardfluence2 | 自媒体数据卡片生成工具 | 多平台粉丝数据展示 | Social Media Metrics Card Generator

> 📊 轻松创建精美的社交媒体数据展示卡片 | 跨平台粉丝数据整合 | 自定义样式 | 一键导出 | 自媒体创作者必备工具

MediaCardfluence 是一款专为自媒体创作者、KOL 和内容营销人员设计的数据可视化工具，可以将您在微信、小红书、B站、抖音等多个平台的粉丝数据整合为一张精美专业的数据展示卡片，帮助您在品牌合作中更好地展示自己的社交媒体影响力。

![MediaCardfluence 预览图](https://github.com/maigamo/mediacardfluence2/blob/main/docs/acquiesce.png)

[![GitHub Stars](https://img.shields.io/github/stars/maigamomediacardfluence2?style=social)](https://github.com/maigamo/mediacardfluence2)
[![GitHub Forks](https://img.shields.io/github/forks/maigamo/mediacardfluence2?style=social)](https://github.com/maigamo/mediacardfluence2/fork)

[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue)](https://www.typescriptlang.org/)
[![Material UI](https://img.shields.io/badge/Material_UI-5.17-blue)](https://mui.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-success)](https://maigamo.github.io/mediacardfluence2/)


## 功能特点

- **多平台数据整合**: 同时展示微信公众号、小红书、B站、抖音、视频号、掘金、知乎、X(Twitter)、快手等主流平台的粉丝数据
- **自定义卡片样式**：调整颜色、尺寸、字体、圆角等样式元素，打造个性化展示效果
- **实时预览效果**: 所有修改即时在预览区域显示
- **一键导出高清图片**：支持PNG/JPEG格式，可自定义尺寸和质量
- **智能本地存储**：采用优化的本地存储策略，所有数据保存在本地，无需网络连接，保护用户隐私
- **响应式设计**：完美适配桌面和移动设备，随时随地创建数据卡片
- **零学习成本**：直观易用的界面设计，无需培训即可上手


## 🚀 在线体验

访问我们的 [GitHub Pages 演示站点](https://maigamo.github.io/mediacardfluence2/) 立即体验！


## 🔧 安装和开发

### 前提条件

- Node.js 16.x 或更高版本
- npm 8.x 或更高版本

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/YourUsername/mediacardfluence.git
cd mediacardfluence/mediacardfluence2

# 安装依赖
npm install

# 启动开发服务器
npm start
```

访问 http://localhost:3000 打开应用。

### 构建生产版本

```bash
# 构建优化后的生产版本
npm run build

# 部署到GitHub Pages
npm run deploy
```

## 📱 使用指南

详细的使用方法请查看我们的 [用户指南文档](../docs/USER_GUIDE.md)。

### 基本使用流程

1. **输入数据**：填入各个平台的粉丝数据和联系方式
2. **自定义卡片**：调整卡片样式、配色、大小等
3. **导出图片**：选择格式和质量，一键导出成图片


### 卡片设置选项

| 设置项 | 说明 |
|-------|------|
| 卡片标题 | 自定义显示在卡片顶部的标题文字 |
| 宽高比 | 选择预设的宽高比或自定义宽高 |
| 卡片大小 | 调整卡片的宽度和高度 |
| 边框圆角 | 调整卡片四角的圆角程度 |
| 图标大小 | 调整社交媒体图标的大小 |
| 字体 | 选择卡片使用的字体 |
| 背景颜色 | 自定义卡片的背景颜色 |
| 文字颜色 | 自定义卡片的文字颜色 |
| 导出格式 | 选择导出的图片格式（PNG或JPEG） |
| 缩放比例 | 设置导出图片的缩放比例，影响最终图片分辨率 |
| 质量 | 仅适用于JPEG格式，调整压缩质量 |
## 技术实现

本项目使用现代Web技术栈构建：

- **前端框架**: React 18 + TypeScript
- **UI组件库**: Material UI
- **状态管理**: React Context API
- **图片导出**: html2canvas
- **本地存储**: localStorage

### 存储优化

为了解决localStorage 5MB存储限制的问题，我们实现了以下优化措施：

1. **数据压缩**：
   - 将null值转换为undefined以减少存储体积
   - 将Date对象转换为ISO字符串格式存储
   - 使用结构化JSON格式减少冗余数据

2. **智能存储管理**：
   - 清理过期和冗余数据
   - 自动处理配额超出错误
   - 数据量较大时进行分片存储

## 开发指南

如果您想为本项目贡献代码，请按照以下步骤进行：

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 部署到GitHub Pages

```bash
# 构建并部署到GitHub Pages
npm run deploy
```

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出新功能建议！请查看 [贡献指南](CONTRIBUTING.md) 了解如何参与项目开发。

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。


## 联系我们

如有任何问题或建议，请通过以下方式联系我们：
- 在GitHub上提交Issue
- 发送邮件至: your-email@example.com

## 🔍 关键词

自媒体工具, 社交媒体数据, 数据可视化, 粉丝数据展示, 自媒体数据卡片, KOL工具, 内容创作者工具, 社交媒体影响力, 跨平台数据整合, 品牌合作工具, 媒体资源展示, 数据名片生成, 粉丝统计工具
