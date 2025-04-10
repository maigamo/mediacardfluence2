# mediacardfluence2
# 自媒体数据卡片生成工具 | 多平台粉丝数据展示 | Social Media Metrics Card Generator

一款简单易用的自媒体数据卡片生成工具，帮助内容创作者轻松创建专业的社交媒体数据展示卡片，支持微信公众号、小红书、B站、抖音等多平台数据统计与展示。

**关键词**: 自媒体数据展示, 粉丝数统计工具, 社交媒体数据卡片, KOL数据工具, 内容创作者工具, 媒体矩阵展示

## 功能特点

- **多平台支持**: 展示微信公众号、小红书、B站、抖音、视频号、掘金、知乎、X(Twitter)、快手等平台数据
- **自定义设计**: 可调整卡片标题、颜色、字体、尺寸、圆角等外观设置
- **实时预览**: 所有修改即时在预览区域显示
- **高质量导出**: 支持PNG/JPEG格式导出，可自定义尺寸和质量
- **本地存储**: 所有数据保存在本地，无需网络连接，保护用户隐私
- **响应式设计**: 在各种设备上都能良好展示

## 使用方法

### 安装和运行

```bash
# 克隆仓库
git clone https://github.com/maigamo/mediacardfluence2.git

# 进入项目目录
cd mediaCardfluence2

# 安装依赖
npm install

# 启动应用
npm start
```

访问 http://localhost:3000 打开应用。

### 在线使用

访问我们的官方部署版本: [https://your-username.github.io/mediaCardfluence](https://your-username.github.io/mediaCardfluence)


### 基本使用流程

1. **输入数据**：在左侧表单中填入各个平台的粉丝数据和微信联系方式
2. **自定义卡片**：
   - 通过"卡片设置"面板调整卡片标题、尺寸、颜色、字体等
   - 实时查看右侧预览效果
   - 所有设置都会立即应用到预览中
3. **导出图片**：
   - 在同一个卡片设置面板中设置导出选项（格式、质量、缩放比例）
   - 点击"下载图片"按钮导出最终图片

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
)
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

## 更新日志

### v1.0.0 (2023-12-20)
- 项目正式发布
- 完成所有计划功能
- 优化构建配置，支持GitHub Pages部署
- 完善文档和使用指南

### v0.7.0 (2023-12-17)
- 优化存储管理，实现数据压缩
- 添加智能存储清理机制
- 重构组件间数据流，减少冗余存储

### v0.6.0 (2023-12-16)
- 修复了导出图片时圆角显示不正确的问题
- 优化了localStorage存储逻辑，添加了错误处理
- 修复了在某些情况下存储配额超出的问题

### v0.5.0 (2023-12-15)
- 合并卡片样式和导出设置，简化用户操作流程
- 修复了圆角显示和导出不一致的问题
- 修复了文字颜色和背景显示问题

## 许可证

MIT

## 贡献者

- 感谢所有为此项目做出贡献的开发者

## 联系我们

如有任何问题或建议，请通过以下方式联系我们：
- 在GitHub上提交Issue
- 发送邮件至: your-email@example.com
