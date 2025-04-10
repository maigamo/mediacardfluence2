import React from 'react';
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Box,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExportOptions, AspectRatio } from '../types';

interface ExportConfigProps {
  exportOptions: ExportOptions;
  onOptionsChange: (options: ExportOptions) => void;
}

const ExportConfig: React.FC<ExportConfigProps> = ({
  exportOptions,
  onOptionsChange
}) => {
  // 处理属性变化
  const handleChange = (property: keyof ExportOptions, value: any) => {
    onOptionsChange({
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
      handleChange('aspectRatio', newAspectRatio);
    }
  };

  return (
    <Accordion sx={{ mb: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="export-config-content"
        id="export-config-header"
      >
        <Typography variant="subtitle1">导出设置</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
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
            <FormControl fullWidth size="small">
              <InputLabel id="export-format-label">导出格式</InputLabel>
              <Select
                labelId="export-format-label"
                id="export-format-select"
                value={exportOptions.format}
                label="导出格式"
                onChange={(e) => handleChange('format', e.target.value)}
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
              onChange={(_, value) => handleChange('scale', value)}
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
                  onChange={(_, value) => handleChange('quality', value)}
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

export default ExportConfig; 