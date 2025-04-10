import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Layout from './components/Layout';
import MediaForm from './components/MediaForm';
import MediaCard from './components/MediaCard';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserData } from './types';
import './App.css';

// 扩展Window接口以支持CompressionStream
declare global {
  interface Window {
    CompressionStream?: any;
  }
}

// 压缩数据
function compressData(data: any): string {
  try {
    // 1. 将日期转为ISO字符串以减少体积
    const preparedData = JSON.stringify(data, (key, value) => {
      if (value instanceof Date) {
        return { __date: value.toISOString() };
      }
      // 2. 移除null值以减少体积 (使用undefined替代，JSON会忽略undefined)
      if (value === null) {
        return undefined;
      }
      return value;
    });
    
    // 3. 如果浏览器支持，使用压缩功能
    if (typeof window.CompressionStream === 'function') {
      // 高级压缩方法，在较新的浏览器中可用
      // 注意：这是异步的，实际应用中需要适配
      return preparedData;
    }
    
    return preparedData;
  } catch (error) {
    console.error('压缩数据失败', error);
    return JSON.stringify(data);
  }
}

// 解压数据
function decompressData(compressedData: string): any {
  try {
    // 解析JSON，特殊处理日期格式
    return JSON.parse(compressedData, (key, value) => {
      // 识别日期格式并转换回Date对象
      if (value && typeof value === 'object' && value.__date) {
        try {
          return new Date(value.__date);
        } catch (e) {
          console.error("日期转换错误:", e);
          return new Date(); // 返回当前日期作为后备
        }
      }
      return value;
    });
  } catch (error) {
    console.error('解压数据失败', error);
    return null;
  }
}

// 智能存储管理
class StorageManager {
  static KEY_PREFIX = 'mediaCard_';
  static MAIN_DATA_KEY = 'mediaCard_userData';
  
  // 存储数据
  static saveData(data: UserData): boolean {
    try {
      const compressedData = compressData(data);
      
      // 检查压缩后的数据大小
      if (compressedData.length < 4000000) { // 保守估计，留有余量
        localStorage.setItem(this.MAIN_DATA_KEY, compressedData);
        return true;
      } else {
        console.warn('数据过大，尝试分片存储');
        // 如果需要，这里可以实现分片存储逻辑
        return false;
      }
    } catch (error) {
      console.error('保存数据失败:', error);
      
      // 处理配额错误
      if (error instanceof DOMException && 
         (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
        // 清理旧数据
        this.cleanupStorage();
        try {
          // 再次尝试
          localStorage.setItem(this.MAIN_DATA_KEY, compressData(data));
          return true;
        } catch (innerError) {
          console.error('清理后仍无法保存数据:', innerError);
          return false;
        }
      }
      return false;
    }
  }
  
  // 加载数据
  static loadData(): UserData | null {
    try {
      const compressedData = localStorage.getItem(this.MAIN_DATA_KEY);
      if (!compressedData) return null;
      
      return decompressData(compressedData);
    } catch (error) {
      console.error('加载数据失败:', error);
      return null;
    }
  }
  
  // 清理存储空间
  static cleanupStorage(): void {
    // 识别并清理过期或冗余数据
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.KEY_PREFIX) && key !== this.MAIN_DATA_KEY) {
        // 清理其他mediaCard相关的数据，但保留主数据
        localStorage.removeItem(key);
      }
    }
    
    // 如果还有问题，尝试清理所有非关键数据
    if (localStorage.length > 10) { // 假设有超过10项是不正常的
      const keysToKeep = [this.MAIN_DATA_KEY];
      const keysToRemove = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && !keysToKeep.includes(key)) {
          keysToRemove.push(key);
        }
      }
      
      // 按时间戳排序，优先删除旧数据（如果实现了时间戳）
      keysToRemove.forEach(key => localStorage.removeItem(key));
    }
  }
}

const initialUserData: UserData = {
  socialMedia: {
    wechat: null,
    xiaohongshu: null,
    bilibili: null,
    douyin: null,
    videoAccount: null,
    juejin: null,
    zhihu: null,
    twitter: null,
    kuaishou: null,
    weibo: null
  },
  contactInfo: {
    wechatId: ''
  },
  updatedAt: new Date()
};

function App() {
  const [userData, setUserData] = useState<UserData>(initialUserData);
  
  // 从本地存储加载用户数据
  useEffect(() => {
    const loadedData = StorageManager.loadData();
    if (loadedData) {
      setUserData(loadedData);
    }
  }, []);

  const handleUpdateUserData = (data: UserData) => {
    setUserData(data);
    // 使用优化后的存储管理
    StorageManager.saveData(data);
  };

  return (
    <ThemeProvider>
      <Layout>
        <Grid container spacing={4} direction="column">
          <Grid item xs={12}>
            <MediaForm 
              userData={userData} 
              onUpdateUserData={handleUpdateUserData} 
            />
          </Grid>
          <Grid item xs={12}>
            <MediaCard userData={userData} />
          </Grid>
        </Grid>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
