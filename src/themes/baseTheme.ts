import { isNumber } from 'lodash';

import { ThemeBase } from '../types';

const borderRadii = {
  full: 9999,
  md: 6,
  none: 0,
  sm: 2,
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
    leading: 16,
  },
  display: {
    fontSize: 72,
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

export const baseTheme: ThemeBase = {
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
