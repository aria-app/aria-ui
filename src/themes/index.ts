import { Theme as AriaUITheme } from './theme';

declare module '@emotion/react' {
  // eslint-disable-next-line
  export interface Theme extends AriaUITheme {}
}

export * from './lightTheme';
export * from './ThemeProvider';
