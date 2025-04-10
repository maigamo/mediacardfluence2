export interface SocialMediaData {
  [key: string]: number | null;
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

export interface ContactInfo {
  wechatId: string;
}

export interface UserData {
  socialMedia: SocialMediaData;
  contactInfo: ContactInfo;
  updatedAt: Date;
}

export interface WatermarkConfig {
  enabled: boolean;
  text: string;
  opacity: number;
  fontSize: number;
  position: 'bottomRight' | 'bottomLeft' | 'topRight' | 'topLeft' | 'center';
  color: string;
}

export interface CardConfig {
  width: number;
  height: number;
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  fontFamily: string;
  iconSize: number;
  cardTitle: string;
  watermark: WatermarkConfig;
}

export interface ExportOptions {
  format: 'png' | 'jpeg';
  quality: number;
  scale: number;
  aspectRatio: '16:9' | '4:3' | '1:1' | 'custom';
}

export type AspectRatio = '16:9' | '4:3' | '1:1' | 'custom'; 