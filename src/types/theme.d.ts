import CSS from 'csstype';

export type ColorName = keyof ThemeColors | 'transparent';

export type Spacing = number | 'auto';

export interface TextVariant {
  fontSize: CSS.Properties['fontSize'];
  fontWeight: CSS.Properties['fontWeight'];
  lineHeight: CSS.Properties['lineHeight'];
}

export interface ThemeBase {
  borderRadii: {
    full: number;
    md: number;
    none: number;
    sm: number;
  };
  fontFamily: CSS.Properties['fontFamily'];
  getBorderRadius: (
    borderRadius?: keyof Theme['borderRadii'],
  ) => CSS.Properties<number | string>['borderRadius'] | undefined;
  getTextVariant: (textVariant?: keyof Theme['textVariants']) => TextVariant;
  screenSizes: {
    lg: number;
    md: number;
    sm: number;
  };
  space: (spacing?: Spacing) => Spacing | undefined;
  textVariants: {
    body: TextVariant;
    button: TextVariant;
    display: TextVariant;
    header: TextVariant;
    helper: TextVariant;
    label: TextVariant;
  };
}

export interface ThemeColors {
  backgroundContrast: CSS.Properties['color'];
  backgroundDefault: CSS.Properties['color'];
  border: CSS.Properties['color'];
  brandContrast: CSS.Properties['color'];
  brandPrimary: CSS.Properties['color'];
  brandSubtle: CSS.Properties['color'];
  error: CSS.Properties['color'];
  success: CSS.Properties['color'];
  textPrimary: CSS.Properties['color'];
  textSecondary: CSS.Properties['color'];
  warning: CSS.Properties['color'];
}

export interface Theme extends ThemeBase {
  colors: ThemeColors;
  getColor: (color?: ColorName) => CSS.Properties['color'] | undefined;
  getForegroundColor: (backgroundColor?: ColorName) => CSS.Properties['color'];
}

export type ThemeOptions = RecursivePartial<Theme>;
