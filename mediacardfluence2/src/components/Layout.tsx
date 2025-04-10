import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  Link,
  Switch,
  FormControlLabel,
  Container,
  Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import InfoIcon from '@mui/icons-material/Info';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '../contexts/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const { mode, toggleColorMode } = useThemeContext();
  const isDarkMode = mode === 'dark';

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const handleYearChange = () => {
    const currentYear = new Date().getFullYear();
    return currentYear;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="static" 
        elevation={0} 
        sx={{ 
          background: isDarkMode 
            ? 'linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)' 
            : 'linear-gradient(90deg, #ffffff 0%, #f8f9fa 100%)',
          borderBottom: '1px solid',
          borderColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
        }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ py: 1 }}>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => toggleDrawer(true)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                flexGrow: 1, 
                fontWeight: 600,
                background: isDarkMode 
                  ? 'linear-gradient(90deg, #fff 30%, #e0e0e0 100%)' 
                  : 'linear-gradient(90deg, #1a1a2e 30%, #0f3460 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Box
                component="img"
                src="/logo.svg"
                alt="Logo"
                sx={{ 
                  height: 32, 
                  mr: 1.5,
                  borderRadius: '8px',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'rotate(10deg)' }
                }}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              mediacardfluence2
            </Typography>

            {!isMobile && (
              <>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isDarkMode}
                      onChange={toggleColorMode}
                      color="primary"
                      sx={{
                        '& .MuiSwitch-track': {
                          bgcolor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
                        }
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', color: isDarkMode ? '#fff' : '#1a1a2e' }}>
                      {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                      <Typography sx={{ ml: 1, fontSize: '0.9rem' }}>
                        {isDarkMode ? '浅色模式' : '深色模式'}
                      </Typography>
                    </Box>
                  }
                  sx={{ mr: 2 }}
                />
                <Button
                  component="a"
                  href="https://github.com/yourusername/mediacardfluence"
                  target="_blank"
                  color={isDarkMode ? 'inherit' : 'primary'}
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  sx={{ 
                    mr: 2,
                    borderRadius: '8px',
                    textTransform: 'none',
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.3)' : undefined,
                    '&:hover': {
                      borderColor: isDarkMode ? 'rgba(255,255,255,0.5)' : undefined,
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : undefined
                    }
                  }}
                >
                  GitHub
                </Button>
                <Button
                  component="a"
                  href="#about"
                  color={isDarkMode ? 'inherit' : 'primary'}
                  variant="outlined"
                  startIcon={<InfoIcon />}
                  sx={{ 
                    borderRadius: '8px',
                    textTransform: 'none',
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.3)' : undefined,
                    '&:hover': {
                      borderColor: isDarkMode ? 'rgba(255,255,255,0.5)' : undefined,
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : undefined
                    }
                  }}
                >
                  关于
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer 
        anchor="left" 
        open={drawerOpen} 
        onClose={() => toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: isDarkMode ? '#1a1a2e' : '#fff',
            color: isDarkMode ? '#fff' : '#1a1a2e'
          }
        }}
      >
        <Box sx={{ width: 280 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              borderBottom: '1px solid',
              borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>菜单</Typography>
            <IconButton onClick={() => toggleDrawer(false)} color="inherit">
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            <ListItem>
              <ListItemIcon sx={{ color: isDarkMode ? '#fff' : '#1a1a2e', minWidth: '40px' }}>
                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </ListItemIcon>
              <ListItemText
                primary={
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isDarkMode}
                        onChange={toggleColorMode}
                        color="primary"
                      />
                    }
                    label={isDarkMode ? '浅色模式' : '深色模式'}
                    sx={{ color: isDarkMode ? '#fff' : '#1a1a2e' }}
                  />
                }
              />
            </ListItem>
            <ListItem
              button
              component="a"
              href="https://github.com/yourusername/mediacardfluence"
              target="_blank"
              sx={{ 
                borderRadius: '8px', 
                mx: 1, 
                my: 0.5,
                '&:hover': {
                  backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                }
              }}
            >
              <ListItemIcon sx={{ color: isDarkMode ? '#fff' : '#1a1a2e', minWidth: '40px' }}>
                <GitHubIcon />
              </ListItemIcon>
              <ListItemText primary="GitHub" />
            </ListItem>
            <ListItem 
              button 
              component="a" 
              href="#about"
              sx={{ 
                borderRadius: '8px', 
                mx: 1, 
                my: 0.5,
                '&:hover': {
                  backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                }
              }}
            >
              <ListItemIcon sx={{ color: isDarkMode ? '#fff' : '#1a1a2e', minWidth: '40px' }}>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="关于" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Container 
        component="main" 
        maxWidth="lg" 
        sx={{ 
          flexGrow: 1, 
          py: 4,
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        {children}
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? '#f8f9fa'
              : '#0f3460',
          borderTop: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'light'
              ? 'rgba(0,0,0,0.1)'
              : 'rgba(255,255,255,0.1)'
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="body2" 
            align="center" 
            sx={{ 
              color: (theme) => 
                theme.palette.mode === 'light'
                  ? 'rgba(0,0,0,0.6)'
                  : 'rgba(255,255,255,0.6)'
            }}
          >
            {'版权所有 © '}
            <Link color="inherit" href="#" sx={{ fontWeight: 500 }}>
              mediacardfluence2
            </Link>{' '}
            {handleYearChange()}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 