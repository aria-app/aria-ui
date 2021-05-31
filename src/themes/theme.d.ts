import CSS from 'csstype';

export interface ThemeBase {
  fontFamily: CSS.Properties['fontFamily'];
}

export interface Theme extends ThemeBase {
  palette: {
    backgroundDefault: CSS.Properties['backgroundColor'];
    textPrimary: CSS.Properties['color'];
  };
}

export type ThemeOptions = RecursivePartial<Theme>;
