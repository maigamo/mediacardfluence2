import React, { useRef, useState } from 'react';
import { Box, Typography, Paper, Button, Grid, CircularProgress, Chip } from '@mui/material';
import html2canvas from 'html2canvas';
import { UserData, CardConfig, ExportOptions } from '../types';
import { socialPlatforms } from '../assets/socialPlatforms';
import CardStyleConfig from './CardStyleConfig';
import DownloadIcon from '@mui/icons-material/Download';

interface MediaCardProps {
  userData: UserData;
}

const formatNumber = (num: number | null | undefined): string => {
  if (num === null || num === undefined) return '0';
  
  if (num >= 100000000) { // 亿级别
    const formatted = (num / 100000000).toFixed(1);
    // 如果小数点后是0，则移除小数部分
    return `${formatted.endsWith('.0') ? formatted.slice(0, -2) : formatted}亿`;
  } else if (num >= 10000) { // 万级别
    const formatted = (num / 10000).toFixed(1);
    // 如果小数点后是0，则移除小数部分
    return `${formatted.endsWith('.0') ? formatted.slice(0, -2) : formatted}万`;
  } else if (num >= 1000) { // 千级别
    const formatted = (num / 1000).toFixed(1);
    // 如果小数点后是0，则移除小数部分
    return `${formatted.endsWith('.0') ? formatted.slice(0, -2) : formatted}千`;
  }
  
  return num.toString();
};

const MediaCard: React.FC<MediaCardProps> = ({ userData }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  
  // 默认卡片样式配置
  const [cardConfig, setCardConfig] = useState<CardConfig>({
    width: 800,
    height: 450,
    backgroundColor: '#1a1a2e',
    textColor: '#ffffff',
    borderRadius: 12,
    fontFamily: 'Inter, system-ui, sans-serif',
    iconSize: 28,
    cardTitle: '我的自媒体',
    watermark: {
      enabled: false,
      text: '自媒体数据卡片',
      opacity: 0.5,
      fontSize: 16,
      position: 'bottomRight',
      color: '#ffffff'
    }
  });
  
  // 默认导出选项
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'png',
    quality: 90,
    scale: 2,
    aspectRatio: '16:9'
  });
  
  // 计算总粉丝数
  const totalFollowers = Object.values(userData.socialMedia)
    .filter((followers): followers is number => followers !== null && followers !== undefined)
    .reduce((sum, followers) => sum + followers, 0);
  
  // 日期格式化
  const formatDate = (date: Date | string | any): string => {
    try {
      // 尝试将任何日期格式转换为可以使用的Date对象
      const dateObj = date instanceof Date ? date : new Date(date);
      
      // 检查是否是有效的日期对象
      if (isNaN(dateObj.getTime())) {
        return new Date().toISOString().split('T')[0]; // 回退到当前日期
      }
      
      return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
    } catch (error) {
      console.error('日期格式化错误:', error);
      return new Date().toISOString().split('T')[0]; // 错误时返回当前日期
    }
  };
  
  // 根据宽高比设置尺寸
  const getCardDimensions = () => {
    const { width } = cardConfig;
    const { aspectRatio } = exportOptions;
    
    if (aspectRatio === '16:9') {
      return { width, height: Math.round(width * 9 / 16) };
    } else if (aspectRatio === '4:3') {
      return { width, height: Math.round(width * 3 / 4) };
    } else if (aspectRatio === '1:1') {
      return { width, height: width };
    }
    
    // 如果没有预设的宽高比，则使用config中的高度
    return { width, height: cardConfig.height };
  };
  
  // 导出图片
  const handleExport = async () => {
    if (!cardRef.current) return;
    
    setIsExporting(true);
    setExportProgress(10);
    
    try {
      setExportProgress(25);
      
      // 延迟更新进度，模拟处理过程
      setTimeout(() => setExportProgress(50), 300);
      
      // 获取当前计算出的卡片尺寸，确保导出图片尺寸与预览一致
      const dimensions = getCardDimensions();
      
      // 处理白色背景问题
      // 当背景为白色时，使用纯白色而不是默认透明背景，避免灰色
      const exactBackgroundColor = cardConfig.backgroundColor.toLowerCase() === '#ffffff' || 
                                cardConfig.backgroundColor.toLowerCase() === '#fff' 
                                ? '#ffffff' : cardConfig.backgroundColor;
      
      const canvas = await html2canvas(cardRef.current, {
        scale: exportOptions.scale,
        backgroundColor: exactBackgroundColor,
        useCORS: true,
        logging: false,
        width: dimensions.width,
        height: dimensions.height,
        onclone: (document, clone) => {
          // 确保克隆元素保留原始样式
          const element = clone.querySelector('[data-ref="card"]') as HTMLElement;
          if (element) {
            // 将borderRadius应用到所有相关属性以确保跨浏览器兼容
            const borderRadiusValue = `${cardConfig.borderRadius}px`;
            element.style.borderRadius = borderRadiusValue;
            // 添加额外的圆角属性以确保在不同浏览器中正常工作
            element.style.webkitBorderRadius = borderRadiusValue;
            
            element.style.backgroundColor = exactBackgroundColor;
            // 移除可能影响导出的属性
            element.style.overflow = 'hidden';
            
            // 确保水印在导出图片时可见
            if (cardConfig.watermark.enabled) {
              const watermarkElement = clone.querySelector('[data-watermark]') as HTMLElement;
              if (watermarkElement) {
                watermarkElement.style.visibility = 'visible';
                watermarkElement.style.opacity = cardConfig.watermark.opacity.toString();
              }
            }
            
            // 修复所有平台项的背景颜色问题
            const platformItems = clone.querySelectorAll('[data-platform-item]');
            platformItems.forEach((item: Element) => {
              const platformItem = item as HTMLElement;
              platformItem.style.background = 'rgba(255, 255, 255, 0.08)';
              platformItem.style.backdropFilter = 'blur(4px)';
            });
            
            // 调整右下角统计部分的背景色
            const statsBox = clone.querySelector('[data-stats-box]') as HTMLElement;
            if (statsBox) {
              const isWhiteBg = exactBackgroundColor.toLowerCase() === '#ffffff' || 
                             exactBackgroundColor.toLowerCase() === '#fff';
              statsBox.style.background = isWhiteBg ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.3)';
              statsBox.style.backdropFilter = 'blur(4px)';
            }
          }
          // 设置导出进度为75%
          setExportProgress(75);
        }
      });
      
      // 根据用户选择的格式导出
      let image;
      if (exportOptions.format === 'jpeg') {
        image = canvas.toDataURL('image/jpeg', exportOptions.quality / 100);
      } else {
        // 对于PNG格式，可以保留透明度
        if (cardConfig.borderRadius > 0) {
          // 创建一个新的canvas来应用圆角
          const roundedCanvas = document.createElement('canvas');
          roundedCanvas.width = canvas.width;
          roundedCanvas.height = canvas.height;
          const ctx = roundedCanvas.getContext('2d')!;
          
          // 先填充背景色，避免透明导致的灰色问题
          ctx.fillStyle = exactBackgroundColor;
          ctx.fillRect(0, 0, roundedCanvas.width, roundedCanvas.height);
          
          // 创建圆角路径
          const radius = cardConfig.borderRadius * exportOptions.scale;
          ctx.beginPath();
          ctx.moveTo(radius, 0);
          ctx.lineTo(roundedCanvas.width - radius, 0);
          ctx.quadraticCurveTo(roundedCanvas.width, 0, roundedCanvas.width, radius);
          ctx.lineTo(roundedCanvas.width, roundedCanvas.height - radius);
          ctx.quadraticCurveTo(roundedCanvas.width, roundedCanvas.height, roundedCanvas.width - radius, roundedCanvas.height);
          ctx.lineTo(radius, roundedCanvas.height);
          ctx.quadraticCurveTo(0, roundedCanvas.height, 0, roundedCanvas.height - radius);
          ctx.lineTo(0, radius);
          ctx.quadraticCurveTo(0, 0, radius, 0);
          ctx.closePath();
          
          // 剪裁并绘制原始画布内容
          ctx.clip();
          ctx.drawImage(canvas, 0, 0);
          
          image = roundedCanvas.toDataURL('image/png');
        } else {
          image = canvas.toDataURL('image/png');
        }
      }
      
      const link = document.createElement('a');
      link.href = image;
      link.download = `自媒体数据卡片_${formatDate(new Date())}.${exportOptions.format}`;
      
      // 完成进度为100%
      setExportProgress(100);
      
      // 延迟下载，让用户看到进度条完成
      setTimeout(() => {
        link.click();
        setIsExporting(false);
      }, 500);
    } catch (error) {
      console.error('导出图片失败:', error);
      setIsExporting(false);
    }
  };
  
  // 卡片样式配置变更
  const handleCardConfigChange = (newConfig: CardConfig) => {
    // 当宽度变化且选择了固定宽高比时，确保高度也相应变化
    if (newConfig.width !== cardConfig.width && exportOptions.aspectRatio !== 'custom') {
      const { width } = newConfig;
      let height: number;
      
      if (exportOptions.aspectRatio === '16:9') {
        height = Math.round(width * 9 / 16);
      } else if (exportOptions.aspectRatio === '4:3') {
        height = Math.round(width * 3 / 4);
      } else if (exportOptions.aspectRatio === '1:1') {
        height = width;
      } else {
        height = newConfig.height;
      }
      
      setCardConfig({ ...newConfig, height });
    } else {
      setCardConfig(newConfig);
    }
  };
  
  // 导出选项变更
  const handleExportOptionsChange = (newOptions: ExportOptions) => {
    setExportOptions(newOptions);
    
    // 当宽高比变化时，自动调整卡片高度以匹配
    if (newOptions.aspectRatio !== exportOptions.aspectRatio) {
      const { width } = cardConfig;
      let height: number;
      
      if (newOptions.aspectRatio === '16:9') {
        height = Math.round(width * 9 / 16);
      } else if (newOptions.aspectRatio === '4:3') {
        height = Math.round(width * 3 / 4);
      } else if (newOptions.aspectRatio === '1:1') {
        height = width;
      } else {
        height = cardConfig.height;
      }
      
      setCardConfig(prev => ({ ...prev, height }));
    }
  };
  
  // 获取当前卡片尺寸
  const { width, height } = getCardDimensions();
  
  const renderWatermark = () => {
    if (!cardConfig.watermark.enabled) return null;
    
    const { text, opacity, fontSize, position, color } = cardConfig.watermark;
    
    // 定位样式映射
    const positionStyles: Record<string, React.CSSProperties> = {
      bottomRight: { bottom: 10, right: 10, textAlign: 'right' },
      bottomLeft: { bottom: 10, left: 10, textAlign: 'left' },
      topRight: { top: 10, right: 10, textAlign: 'right' },
      topLeft: { top: 10, left: 10, textAlign: 'left' },
      center: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    };
    
    return (
      <div 
        data-watermark="true"
        style={{
          position: 'absolute',
          ...positionStyles[position],
          opacity,
          color,
          fontSize: `${fontSize}px`,
          fontFamily: cardConfig.fontFamily,
          zIndex: 10,
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        {text}
      </div>
    );
  };
  
  return (
    <div style={{ position: 'relative' }}>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ 
          fontWeight: 600, 
          color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#1a1a2e',
          borderBottom: '2px solid',
          borderColor: 'primary.main',
          pb: 1,
          mb: 3
        }}>
          预览卡片
        </Typography>
        
        <CardStyleConfig 
          cardConfig={cardConfig}
          exportOptions={exportOptions}
          onConfigChange={handleCardConfigChange}
          onExportOptionsChange={handleExportOptionsChange}
        />
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Paper 
            ref={cardRef}
            data-ref="card"
            elevation={8}
            sx={{
              width: `${width}px`,
              maxWidth: '100%',
              height: `${height}px`,
              aspectRatio: exportOptions.aspectRatio === '1:1' ? '1 / 1' : 'auto',
              bgcolor: cardConfig.backgroundColor,
              color: cardConfig.textColor,
              p: 4,
              mb: 3,
              position: 'relative',
              overflow: 'hidden',
              borderRadius: `${cardConfig.borderRadius}px !important`,
              fontFamily: cardConfig.fontFamily,
              backgroundImage: 'none',
              boxShadow: '0 10px 30px rgba(0,0,0,0.25)'
            }}
          >
            {cardConfig.watermark.enabled && renderWatermark()}
            
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold', 
              mb: 2, 
              fontFamily: 'inherit',
              color: cardConfig.textColor
            }}>
              {cardConfig.cardTitle}
            </Typography>
            
            {userData.contactInfo.wechatId && (
              <Chip
                label={`微信：${userData.contactInfo.wechatId}`}
                variant="outlined"
                sx={{ 
                  mb: 3, 
                  fontFamily: 'inherit', 
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: cardConfig.textColor,
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  '& .MuiChip-label': { px: 1.5 }
                }}
              />
            )}
            
            <Grid container spacing={3}>
              {socialPlatforms.map(platform => {
                const followers = userData.socialMedia[platform.id];
                if (followers === null || followers === undefined || followers === 0) return null;
                
                return (
                  <Grid item xs={12} sm={6} md={4} key={platform.id}>
                    <Box 
                      data-platform-item="true"
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 2,
                        p: 1.5,
                        borderRadius: '12px',
                        background: 'rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(4px)',
                        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        '&:hover': {
                          background: 'rgba(255,255,255,0.12)',
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 20px rgba(0,0,0,0.15)'
                        }
                      }}>
                      <Box 
                        component="img"
                        sx={{ 
                          width: cardConfig.iconSize, 
                          height: cardConfig.iconSize, 
                          mr: 1.5,
                          filter: 'none',
                          borderRadius: '50%',
                          padding: '3px',
                          background: `rgba(255,255,255,0.2)`,
                          objectFit: 'contain',
                          flexShrink: 0,
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                        alt={platform.name}
                        src={platform.pngPath}
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          // 确保SVG图标在任何背景下都可见
                          const isLightBg = cardConfig.backgroundColor.replace(/\s/g, '').toLowerCase() === '#ffffff' || 
                                         cardConfig.backgroundColor.replace(/\s/g, '').toLowerCase() === '#fff';
                          // 特殊处理掘金图标
                          if (platform.id === 'juejin') {
                            target.style.filter = isLightBg ? 'invert(49%) sepia(98%) saturate(2259%) hue-rotate(202deg) brightness(103%) contrast(101%)' : 'brightness(0) invert(1)';
                          } else {
                            target.style.filter = isLightBg ? 'none' : 'brightness(0) invert(1)';
                          }
                          target.src = platform.iconPath;
                        }}
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%' }}>
                        <Typography variant="caption" sx={{ 
                          fontFamily: 'inherit',
                          opacity: 0.7,
                          fontSize: '0.7rem',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {platform.name}
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          fontFamily: 'inherit',
                          fontWeight: 'bold',
                          fontSize: '0.9rem',
                          minWidth: '70px',
                          overflow: 'visible'
                        }}>
                          {formatNumber(followers)}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
            
            <Box 
              data-stats-box="true"
              sx={{ 
                position: 'absolute', 
                bottom: 20, 
                right: 20,
                background: cardConfig.backgroundColor.toLowerCase() === '#ffffff' || 
                           cardConfig.backgroundColor.toLowerCase() === '#fff' 
                           ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(4px)',
                padding: '10px 15px',
                borderRadius: '8px'
              }}
            >
              <Typography variant="body2" sx={{ 
                fontFamily: 'inherit',
                fontWeight: 'bold'
              }}>
                总粉丝: {formatNumber(totalFollowers)}
              </Typography>
              <Typography variant="caption" sx={{ 
                fontFamily: 'inherit',
                opacity: 0.7
              }}>
                更新日期: {formatDate(userData.updatedAt)}
              </Typography>
            </Box>
          </Paper>
          
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleExport}
            disabled={isExporting}
            startIcon={<DownloadIcon />}
            sx={{ 
              mb: 4, 
              minWidth: '200px', 
              position: 'relative',
              borderRadius: '30px',
              py: 1.2,
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
              boxShadow: '0 4px 15px rgba(37, 117, 252, 0.4)',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              '&:hover': {
                background: 'linear-gradient(90deg, #5910b0 0%, #1d5fd8 100%)',
                transform: 'translateY(-3px)',
                boxShadow: '0 8px 25px rgba(37, 117, 252, 0.5)',
              },
              '&:active': {
                transform: 'translateY(1px)',
                boxShadow: '0 2px 8px rgba(37, 117, 252, 0.4)',
              }
            }}
          >
            {isExporting ? (
              <>
                <CircularProgress
                  size={24}
                  variant="determinate"
                  value={exportProgress}
                  sx={{ position: 'absolute', left: 16 }}
                />
                导出中 {exportProgress}%
              </>
            ) : '下载图片'}
          </Button>
        </Box>
      </Box>
      
      {isExporting && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1000,
          }}
        >
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <CircularProgress 
              variant="determinate" 
              value={exportProgress} 
              color="inherit" 
            />
            <Typography variant="body2" sx={{ mt: 2 }}>
              导出进度: {exportProgress}%
            </Typography>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default MediaCard; 