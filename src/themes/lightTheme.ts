import readableColor from 'polished/lib/color/readableColor';

import { Theme } from '../types';
import { baseTheme } from './baseTheme';

const colors = {
  backgroundContrast: '#fff',
  backgroundDefault: '#ddd',
  brandContrast: '#2f2a9b',
  brandPrimary: '#5944ff',
  brandSubtle: '#9b9bf9',
  textPrimary: '#333',
};

export const lightTheme: Theme = {
  ...baseTheme,
  colors,
  getForegroundColor: backgroundColor => {
    if (!backgroundColor || !colors[backgroundColor]) return;

    const resolvedColor = colors[backgroundColor];

    return readableColor(resolvedColor, colors.textPrimary);
  },
  getColor: color => {
    if (!color || !colors[color]) return color;

    return colors[color];
  },
};
