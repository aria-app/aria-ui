import { isNumber, merge } from 'lodash';

import { isLightColor } from '../helpers';
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
    getColor: colorName => {
      if (!colorName) return colorName;

      const themeColor =
        themeOptions.colors[colorName as keyof Theme['colors']];

      if (!themeColor) return colorName;

      return themeColor;
    },
    getForegroundColor: backgroundColorName => {
      const themeColor =
        themeOptions.colors[backgroundColorName as keyof Theme['colors']] ||
        backgroundColorName;

      if (!themeColor || backgroundColorName === 'transparent')
        return themeOptions.colors.textPrimary;

      const isLightTheme = isLightColor(
        themeOptions.colors.backgroundContrast || 'white',
      );
      const darkColor = isLightTheme
        ? themeOptions.colors.textPrimary
        : 'black';

      return isLightColor(themeColor) ? darkColor : '#fff';
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
