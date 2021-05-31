import { ThemeBase } from '../types';

export const baseTheme: ThemeBase = {
  fontFamily: 'Nunito, Helvetica, sans-serif',
  space: spacing => spacing * 4,
  textVariants: {
    body: {
      fontSize: '16px',
      fontWeight: 400,
    },
    helper: {
      fontSize: '14px',
      fontWeight: 400,
    },
    label: {
      fontSize: '16px',
      fontWeight: 600,
    },
  },
};
