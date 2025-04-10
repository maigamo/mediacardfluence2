import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  TextField, 
  Typography, 
  Button, 
  Box,
  InputAdornment,
  Paper,
  Divider,
  Tooltip,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { SocialMediaData, ContactInfo, UserData } from '../types';
import { socialPlatforms } from '../assets/socialPlatforms';
import { useThemeContext } from '../contexts/ThemeContext';

interface MediaFormProps {
  userData: UserData;
  onUpdateUserData: (data: UserData) => void;
}

const initialSocialMediaData: SocialMediaData = {
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
};

const initialContactInfo: ContactInfo = {
  wechatId: ''
};

const MediaForm: React.FC<MediaFormProps> = ({ userData, onUpdateUserData }) => {
  const { mode } = useThemeContext();
  const isDarkMode = mode === 'dark';
  
  const [socialMedia, setSocialMedia] = useState<SocialMediaData>(
    userData.socialMedia || initialSocialMediaData
  );
  const [contactInfo, setContactInfo] = useState<ContactInfo>(
    userData.contactInfo || initialContactInfo
  );

  // 当父组件传入的userData变化时更新组件状态
  useEffect(() => {
    if (userData) {
      setSocialMedia(userData.socialMedia || initialSocialMediaData);
      setContactInfo(userData.contactInfo || initialContactInfo);
    }
  }, [userData]);

  // 当本地状态变化时更新父组件
  useEffect(() => {
    onUpdateUserData({
      socialMedia,
      contactInfo,
      updatedAt: new Date()
    });
  }, [socialMedia, contactInfo, onUpdateUserData]);

  const handleSocialMediaChange = (platform: string, value: string) => {
    const numValue = value === '' ? null : Number(value);
    setSocialMedia(prev => ({
      ...prev,
      [platform]: numValue
    }));
  };

  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo(prev => ({
      ...prev,
      wechatId: e.target.value
    }));
  };

  const handleReset = () => {
    setSocialMedia(initialSocialMediaData);
    setContactInfo(initialContactInfo);
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        borderRadius: '12px',
        backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#ffffff',
        border: '1px solid',
        borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
        boxShadow: isDarkMode 
          ? '0 8px 20px rgba(0,0,0,0.2)' 
          : '0 10px 25px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease'
      }}
    >
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          fontWeight: 600, 
          color: isDarkMode ? '#fff' : '#1a1a2e',
          borderBottom: '2px solid',
          borderColor: 'primary.main',
          pb: 1,
          mb: 3
        }}
      >
        输入您的社交媒体数据
      </Typography>
      
      <Grid container spacing={3}>
        {socialPlatforms.map(platform => (
          <Grid item xs={12} sm={6} md={4} key={platform.id}>
            <TextField
              fullWidth
              label={platform.name}
              type="number"
              value={socialMedia[platform.id] === null ? '' : socialMedia[platform.id]}
              onChange={(e) => handleSocialMediaChange(platform.id, e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box 
                      component="img"
                      sx={{ 
                        width: 20, 
                        height: 20,
                        mr: 1,
                        objectFit: 'contain',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.15)'
                        }
                      }}
                      alt={platform.name}
                      src={platform.pngPath}
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = platform.iconPath;
                      }}
                    />
                  </InputAdornment>
                ),
                endAdornment: <InputAdornment position="end">粉丝</InputAdornment>,
                sx: {
                  borderRadius: '10px',
                  transition: 'all 0.3s ease',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                    transition: 'border-color 0.3s ease'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
                    boxShadow: '0 0 8px rgba(0,0,0,0.05)'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: platform.color,
                    boxShadow: `0 0 0 2px ${platform.color}25`
                  },
                  '&:hover': {
                    transform: 'translateY(-2px)'
                  }
                }
              }}
              inputProps={{
                min: 0,
                max: 999999999,
              }}
              sx={{
                '& .MuiInputLabel-root': {
                  color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: platform.color
                }
              }}
            />
          </Grid>
        ))}
        
        <Grid item xs={12}>
          <Divider sx={{ my: 2, borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              mt: 2, 
              fontWeight: 600,
              color: isDarkMode ? '#fff' : '#1a1a2e'
            }}
          >
            联系方式
          </Typography>
          <TextField
            fullWidth
            label="微信号"
            value={contactInfo.wechatId}
            onChange={handleContactInfoChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box 
                    component="img"
                    sx={{ 
                      width: 20, 
                      height: 20,
                      mr: 1,
                      objectFit: 'contain'
                    }}
                    alt="微信"
                    src="/icons/wechat.png"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "/icons/wechat.svg";
                    }}
                  />
                </InputAdornment>
              ),
              sx: {
                borderRadius: '10px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#07C160'
                }
              }
            }}
            inputProps={{
              maxLength: 50,
            }}
            sx={{
              '& .MuiInputLabel-root': {
                color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#07C160'
              }
            }}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Tooltip title="重置所有数据">
              <IconButton 
                onClick={handleReset}
                sx={{ 
                  backgroundColor: isDarkMode ? 'rgba(255,0,0,0.1)' : 'rgba(255,0,0,0.05)', 
                  color: '#f44336',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'rgba(255,0,0,0.15)' : 'rgba(255,0,0,0.1)',
                    transform: 'translateY(-3px) rotate(10deg)',
                    boxShadow: '0 6px 12px rgba(244,67,54,0.2)'
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="更新日期">
              <IconButton 
                onClick={() => onUpdateUserData({
                  socialMedia,
                  contactInfo,
                  updatedAt: new Date()
                })}
                sx={{ 
                  backgroundColor: isDarkMode ? 'rgba(0,255,0,0.1)' : 'rgba(0,255,0,0.05)', 
                  color: '#4caf50',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'rgba(0,255,0,0.15)' : 'rgba(0,255,0,0.1)',
                    transform: 'translateY(-3px) rotate(-10deg)',
                    boxShadow: '0 6px 12px rgba(76,175,80,0.2)'
                  }
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MediaForm; 