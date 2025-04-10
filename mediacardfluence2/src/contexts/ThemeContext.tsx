import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from '../theme';

// 定义颜色模式类型
type ColorMode = 'light' | 'dark';

// 定义主题上下文类型
type ThemeContextType = {
  mode: ColorMode;
  toggleColorMode: () => void;
};

// 创建主题上下文
const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
});

// 自定义钩子，用于在组件中访问主题上下文
export const useThemeContext = () => useContext(ThemeContext);

// 主题提供者组件属性类型
interface ThemeProviderProps {
  children: ReactNode;
}

// 主题提供者组件
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // 从本地存储读取主题模式，默认为浅色模式
  const storedMode = localStorage.getItem('themeMode') as ColorMode;
  const [mode, setMode] = useState<ColorMode>(storedMode || 'light');
  
  // 使用useMemo创建主题对象，避免不必要的重新渲染
  const theme = useMemo(() => createAppTheme(mode), [mode]);
  
  // 切换主题模式的函数
  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };
  
  // 主题上下文的值
  const themeContextValue = useMemo(() => ({
    mode,
    toggleColorMode,
  }), [mode]);
  
  return (
    <ThemeContext.Provider value={themeContextValue}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}; 