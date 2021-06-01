import readableColor from 'polished/lib/color/readableColor';

import { Theme } from '../types';
import { baseTheme } from './baseTheme';

const colors = {
  backgroundContrast: '#111',
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
    if (!backgroundColor || !colors[backgroundColor]) return;

    const resolvedColor = colors[backgroundColor];

    return readableColor(resolvedColor, colors.textPrimary);
  },
  getColor: color => {
    if (!color || !colors[color]) return;

    return colors[color];
  },
};
