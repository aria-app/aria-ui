import readableColor from 'polished/lib/color/readableColor';

import { Theme } from '../types';
import { baseTheme } from './baseTheme';

const colors: Theme['colors'] = {
  backgroundContrast: '#333',
  backgroundDefault: '#555',
  brandContrast: '#9b9bf9',
  brandPrimary: '#5944ff',
  brandSubtle: '#2f2a9b',
  textPrimary: '#fff',
};

export const darkTheme: Theme = {
  ...baseTheme,
  colors,
  getForegroundColor: backgroundColor => {
    const themeColor = colors[backgroundColor as keyof Theme['colors']];

    if (!backgroundColor || !themeColor) return colors.textPrimary;

    const resolvedColor = themeColor;

    return readableColor(resolvedColor, colors.textPrimary);
  },
  getColor: color => {
    const themeColor = colors[color as keyof Theme['colors']];

    if (!color || !themeColor) return color;

    return themeColor;
  },
};
