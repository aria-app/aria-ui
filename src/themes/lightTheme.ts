import readableColor from 'polished/lib/color/readableColor';

import { Theme } from '../types';
import { baseTheme } from './baseTheme';

const colors: Theme['colors'] = {
  backgroundContrast: '#fff',
  backgroundDefault: '#e5e5e5',
  border: '#ccc',
  brandContrast: '#2f2a9b',
  brandPrimary: '#5944ff',
  brandSubtle: '#9b9bf9',
  textPrimary: '#333',
  textSecondary: '#777',
};

export const lightTheme: Theme = {
  ...baseTheme,
  colors,
  getForegroundColor: backgroundColor => {
    const themeColor =
      colors[backgroundColor as keyof Theme['colors']] || backgroundColor;

    if (!themeColor || backgroundColor === 'transparent')
      return colors.textPrimary;

    return readableColor(themeColor, colors.textPrimary);
  },
  getColor: color => {
    const themeColor = colors[color as keyof Theme['colors']];

    if (!color || !themeColor) return color;

    return themeColor;
  },
};
