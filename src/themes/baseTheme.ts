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
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 'inherit',
  },
  button: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1,
  },
  display: {
    fontSize: '72px',
    fontWeight: 600,
    lineHeight: 1,
  },
  header: {
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: 1,
  },
  helper: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1,
  },
  label: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1,
  },
};

export const baseTheme: ThemeBase = {
  borderRadii,
  fontFamily: 'Nunito, Helvetica, sans-serif',
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
