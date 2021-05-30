import { AriaUITheme } from './baseTheme';

declare module '@emotion/react' {
  // eslint-disable-next-line
  export interface Theme extends AriaUITheme {}
}

export * from './lightTheme';
