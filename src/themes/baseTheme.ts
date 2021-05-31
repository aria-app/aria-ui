import { ThemeBase } from '../types';

export const baseTheme: ThemeBase = {
  fontFamily: 'Nunito, Helvetica, sans-serif',
  space: spacing => spacing * 4,
  textVariants: {
    body: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: 1,
    },
    display: {
      fontSize: '72px',
      fontWeight: 600,
      lineHeight: 1,
    },
    header: {
      fontSize: '24px',
      fontWeight: 400,
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
  },
};
