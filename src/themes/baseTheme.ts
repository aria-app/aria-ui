import CSS from 'csstype';

export interface AriaUIBaseTheme {
  fontFamily: CSS.Properties['fontFamily'];
}

export interface AriaUITheme extends AriaUIBaseTheme {
  palette: {
    textPrimary: CSS.Properties['color'];
  };
}

export const baseTheme: AriaUIBaseTheme = {
  fontFamily: 'Nunito, Helvetica, sans-serif',
};
