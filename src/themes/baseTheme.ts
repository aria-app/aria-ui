import CSS from 'csstype';

export interface AriaUIBaseTheme {
  fontFamily: CSS.Properties['fontFamily'];
}

export interface AriaUITheme extends AriaUIBaseTheme {
  palette: {
    backgroundDefault: CSS.Properties['backgroundColor'];
    textPrimary: CSS.Properties['color'];
  };
}

export const baseTheme: AriaUIBaseTheme = {
  fontFamily: 'Nunito, Helvetica, sans-serif',
};
