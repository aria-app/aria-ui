import { isNumber, merge } from 'lodash';
import readableColor from 'polished/lib/color/readableColor';

import { Theme, ThemeBase, ThemeOptions } from '../types';

const borderRadii = {
  full: 9999,
  md: 8,
  none: 0,
  sm: 4,
};

const textVariants = {
  body: {
    fontSize: 16,
    fontWeight: 400,
    leading: 24,
  },
  button: {
    fontSize: 16,
    fontWeight: 600,
  },
  display: {
    fontSize: 72,
    fontWeight: 600,
  },
  field: {
    fontSize: 16,
    fontWeight: 600,
  },
  header: {
    fontSize: 24,
    fontWeight: 600,
  },
  helper: {
    fontSize: 14,
    fontWeight: 400,
  },
  label: {
    fontSize: 16,
    fontWeight: 600,
  },
};

export function createTheme(themeOptions: ThemeOptions): Theme {
  const baseTheme: ThemeBase = {
    borderRadii,
    fontFamily: 'Nunito, Helvetica, sans-serif',
    // Metrics for Nunito derived from https://seek-oss.github.io/capsize/
    fontMetrics: {
      capHeight: 705,
      ascent: 1011,
      descent: -353,
      lineGap: 0,
      unitsPerEm: 1000,
    },
    getBorderRadius: borderRadius => borderRadius && borderRadii[borderRadius],
    getColor: color => {
      if (!color) return color;

      const themeColor = themeOptions.colors[color as keyof Theme['colors']];

      if (!themeColor) return color;

      return themeColor;
    },
    getForegroundColor: backgroundColor => {
      const themeColor =
        themeOptions.colors[backgroundColor as keyof Theme['colors']] ||
        backgroundColor;

      if (!themeColor || backgroundColor === 'transparent')
        return themeOptions.colors.textPrimary;

      return readableColor(themeColor, themeOptions.colors.textPrimary);
    },
    getTextVariant: textVariant =>
      textVariant && textVariants[textVariant]
        ? textVariants[textVariant]
        : textVariants.body,
    screenSizes: {
      lg: 1024,
      md: 768,
      sm: 480,
    },
    space: spacing => (isNumber(spacing) ? spacing * 4 : spacing),
    textVariants,
  };
  return merge({}, baseTheme, themeOptions);
}
