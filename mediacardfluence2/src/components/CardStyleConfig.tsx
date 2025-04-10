import React from 'react';
import {
  Box,
  Typography,
  Slider,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Switch,
  FormControlLabel
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CardConfig, ExportOptions, AspectRatio } from '../types';

interface CardStyleConfigProps {
  cardConfig: CardConfig;
  exportOptions: ExportOptions;
  onConfigChange: (config: CardConfig) => void;
  onExportOptionsChange: (options: ExportOptions) => void;
}

const CardStyleConfig: React.FC<CardStyleConfigProps> = ({
  cardConfig,
  exportOptions,
  onConfigChange,
  onExportOptionsChange
}) => {
  const handleChange = (property: keyof CardConfig, value: any) => {
    onConfigChange({
      ...cardConfig,
      [property]: value
    });
  };

  const handleWatermarkChange = (property: keyof CardConfig['watermark'], value: any) => {
    onConfigChange({
      ...cardConfig,
      watermark: {
        ...cardConfig.watermark,
        [property]: value
      }
    });
  };

  const handleExportOptionChange = (property: keyof ExportOptions, value: any) => {
    onExportOptionsChange({
      ...exportOptions,
      [property]: value
    });
  };

  // 处理宽高比变化
  const handleAspectRatioChange = (
    _event: React.MouseEvent<HTMLElement>,
    newAspectRatio: AspectRatio,
  ) => {
    if (newAspectRatio !== null) {
      handleExportOptionChange('aspectRatio', newAspectRatio);
    }
  };

  const fontFamilies = [
    'Arial, sans-serif',
    'Helvetica, sans-serif',
    'Georgia, serif',
    'Tahoma, sans-serif',
    'Verdana, sans-serif',
    'Times New Roman, serif',
    'Courier New, monospace'
  ];

  const watermarkPositions = [
    { value: 'bottomRight', label: '右下角' },
    { value: 'bottomLeft', label: '左下角' },
    { value: 'topRight', label: '右上角' },
    { value: 'topLeft', label: '左上角' },
    { value: 'center', label: '居中' }
  ];

  return (
    <Accordion sx={{ mb: 2 }} defaultExpanded={false}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="card-style-config-content"
        id="card-style-config-header"
      >
        <Typography variant="subtitle1">卡片设置</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography gutterBottom>卡片标题</Typography>
            <TextField
              fullWidth
              size="small"
              value={cardConfig.cardTitle}
              onChange={(e) => handleChange('cardTitle', e.target.value)}
              placeholder="我的自媒体"
            />
          </Grid>
          
          <Grid item xs={12}>
            <Typography gutterBottom>宽高比</Typography>
            <ToggleButtonGroup
              color="primary"
              value={exportOptions.aspectRatio}
              exclusive
              onChange={handleAspectRatioChange}
              aria-label="宽高比"
              size="small"
              fullWidth
            >
              <ToggleButton value="16:9">16:9</ToggleButton>
              <ToggleButton value="4:3">4:3</ToggleButton>
              <ToggleButton value="1:1">1:1</ToggleButton>
              <ToggleButton value="custom">自定义</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>卡片大小</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="宽度"
                type="number"
                size="small"
                value={cardConfig.width}
                onChange={(e) => handleChange('width', Number(e.target.value))}
                inputProps={{ min: 400, max: 1200 }}
              />
              <TextField
                label="高度"
                type="number"
                size="small"
                value={cardConfig.height}
                onChange={(e) => handleChange('height', Number(e.target.value))}
                inputProps={{ min: 225, max: 675 }}
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>边框圆角</Typography>
            <Slider
              value={cardConfig.borderRadius}
              onChange={(_, value) => handleChange('borderRadius', value)}
              step={1}
              marks
              min={0}
              max={20}
              valueLabelDisplay="auto"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>图标大小</Typography>
            <Slider
              value={cardConfig.iconSize}
              onChange={(_, value) => handleChange('iconSize', value)}
              step={2}
              marks
              min={16}
              max={40}
              valueLabelDisplay="auto"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="font-family-label">字体</InputLabel>
              <Select
                labelId="font-family-label"
                id="font-family-select"
                value={cardConfig.fontFamily}
                label="字体"
                onChange={(e) => handleChange('fontFamily', e.target.value)}
              >
                {fontFamilies.map((font) => (
                  <MenuItem key={font} value={font} style={{ fontFamily: font }}>
                    {font.split(',')[0]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="背景颜色"
              type="color"
              size="small"
              value={cardConfig.backgroundColor}
              onChange={(e) => handleChange('backgroundColor', e.target.value)}
              sx={{ width: '100%' }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="文字颜色"
              type="color"
              size="small"
              value={cardConfig.textColor}
              onChange={(e) => handleChange('textColor', e.target.value)}
              sx={{ width: '100%' }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>水印设置</Typography>
            <FormControlLabel 
              control={
                <Switch 
                  checked={cardConfig.watermark.enabled}
                  onChange={(e) => handleWatermarkChange('enabled', e.target.checked)}
                />
              } 
              label="显示水印" 
            />
          </Grid>

          {cardConfig.watermark.enabled && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="水印文字"
                  size="small"
                  value={cardConfig.watermark.text}
                  onChange={(e) => handleWatermarkChange('text', e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>水印位置</InputLabel>
                  <Select
                    value={cardConfig.watermark.position}
                    label="水印位置"
                    onChange={(e) => handleWatermarkChange('position', e.target.value)}
                  >
                    {watermarkPositions.map((pos) => (
                      <MenuItem key={pos.value} value={pos.value}>
                        {pos.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography gutterBottom>透明度</Typography>
                <Slider
                  value={cardConfig.watermark.opacity}
                  onChange={(_, value) => handleWatermarkChange('opacity', value)}
                  step={0.1}
                  min={0.1}
                  max={1}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography gutterBottom>字体大小</Typography>
                <Slider
                  value={cardConfig.watermark.fontSize}
                  onChange={(_, value) => handleWatermarkChange('fontSize', value)}
                  step={1}
                  min={10}
                  max={36}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}px`}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="水印颜色"
                  type="color"
                  size="small"
                  value={cardConfig.watermark.color}
                  onChange={(e) => handleWatermarkChange('color', e.target.value)}
                  sx={{ width: '100%' }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>导出设置</Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="export-format-label">导出格式</InputLabel>
              <Select
                labelId="export-format-label"
                id="export-format-select"
                value={exportOptions.format}
                label="导出格式"
                onChange={(e) => handleExportOptionChange('format', e.target.value)}
              >
                <MenuItem value="png">PNG (支持透明背景)</MenuItem>
                <MenuItem value="jpeg">JPEG (小文件体积)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>缩放比例</Typography>
            <Slider
              value={exportOptions.scale}
              onChange={(_, value) => handleExportOptionChange('scale', value)}
              step={0.5}
              marks={[
                { value: 1, label: '1x' },
                { value: 2, label: '2x' },
                { value: 3, label: '3x' },
              ]}
              min={1}
              max={3}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}x`}
            />
          </Grid>
          
          {exportOptions.format === 'jpeg' && (
            <Grid item xs={12}>
              <Typography gutterBottom>质量</Typography>
              <Box sx={{ px: 1 }}>
                <Slider
                  value={exportOptions.quality}
                  onChange={(_, value) => handleExportOptionChange('quality', value)}
                  step={5}
                  marks={[
                    { value: 60, label: '低' },
                    { value: 80, label: '中' },
                    { value: 100, label: '高' },
                  ]}
                  min={60}
                  max={100}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}%`}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default CardStyleConfig; 