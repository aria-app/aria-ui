import CSS from 'csstype';

export interface TextVariant {
  fontSize: CSS.Properties['fontSize'];
  fontWeight: CSS.Properties['fontWeight'];
  lineHeight: CSS.Properties['lineHeight'];
}

export interface ThemeBase {
  fontFamily: CSS.Properties['fontFamily'];
  space: (spacing: number) => number;
  textVariants: {
    body: TextVariant;
    display: TextVariant;
    header: TextVariant;
    helper: TextVariant;
    label: TextVariant;
  };
}

export interface Theme extends ThemeBase {
  colors: {
    backgroundDefault: CSS.Properties['color'];
    brandContrast: CSS.Properties['color'];
    brandPrimary: CSS.Properties['color'];
    brandSubtle: CSS.Properties['color'];
    textPrimary: CSS.Properties['color'];
  };
}

export type ThemeOptions = RecursivePartial<Theme>;
