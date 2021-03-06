import { Theme as AriaUITheme } from '../types';

declare module '@emotion/react' {
  // eslint-disable-next-line
  export interface Theme extends AriaUITheme {}
}

export * from './createTheme';
export * from './darkTheme';
export * from './lightTheme';
export * from './ThemeProvider';
