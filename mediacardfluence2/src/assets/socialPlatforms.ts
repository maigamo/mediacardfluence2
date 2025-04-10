export interface SocialPlatform {
  id: string;
  name: string;
  color: string;
  iconPath: string;
  pngPath: string;
}

export const socialPlatforms: SocialPlatform[] = [
  {
    id: 'wechat',
    name: '微信公众号',
    color: '#07C160',
    iconPath: '/icons/wechat.svg',
    pngPath: '/icons/wechat.png'
  },
  {
    id: 'xiaohongshu',
    name: '小红书',
    color: '#FE2C55',
    iconPath: '/icons/xiaohongshu.svg',
    pngPath: '/icons/xiaohongshu.png'
  },
  {
    id: 'bilibili',
    name: 'B站',
    color: '#00A1D6',
    iconPath: '/icons/bilibili.svg',
    pngPath: '/icons/bilibili.png'
  },
  {
    id: 'douyin',
    name: '抖音',
    color: '#000000',
    iconPath: '/icons/douyin.svg',
    pngPath: '/icons/douyin.png'
  },
  {
    id: 'videoAccount',
    name: '视频号',
    color: '#FA5151',
    iconPath: '/icons/videoAccount.svg',
    pngPath: '/icons/videoAccount.png'
  },
  {
    id: 'juejin',
    name: '掘金',
    color: '#1E80FF',
    iconPath: '/icons/juejin.svg',
    pngPath: '/icons/juejin.png'
  },
  {
    id: 'zhihu',
    name: '知乎',
    color: '#0084FF',
    iconPath: '/icons/zhihu.svg',
    pngPath: '/icons/zhihu.png'
  },
  {
    id: 'twitter',
    name: 'X(Twitter)',
    color: '#000000',
    iconPath: '/icons/twitter.svg',
    pngPath: '/icons/twitter.png'
  },
  {
    id: 'kuaishou',
    name: '快手',
    color: '#FF5E00',
    iconPath: '/icons/kuaishou.svg',
    pngPath: '/icons/kuaishou.png'
  },
  {
    id: 'weibo',
    name: '微博',
    color: '#E6162D',
    iconPath: '/icons/weibo.svg',
    pngPath: '/icons/weibo.png'
  }
]; 