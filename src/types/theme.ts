import { FontMetrics } from 'capsize';
import CSS from 'csstype';

import { RecursivePartial } from './utilities';

export type ColorName = keyof ThemeColors | 'transparent';

export type Spacing = CSS.Properties<number | string>['marginTop'];

export interface TextVariant {
  fontSize: number;
  fontWeight: CSS.Properties['fontWeight'];
  leading?: number;
}

export interface ThemeBase {
  borderRadii: {
    full: number;
    md: number;
    none: number;
    sm: number;
  };
  fontFamily: CSS.Properties['fontFamily'];
  fontMetrics: FontMetrics;
  getBorderRadius: (
    borderRadius?: keyof Theme['borderRadii'],
  ) => CSS.Properties<number | string>['borderRadius'] | undefined;
  getColor: (colorName?: ColorName) => CSS.Properties['color'] | undefined;
  getForegroundColor: (
    backgroundColorName?: ColorName,
  ) => CSS.Properties['color'];
  getTextVariant: (textVariant?: keyof Theme['textVariants']) => TextVariant;
  screenSizes: {
    lg: number;
    md: number;
    sm: number;
  };
  space: (spacing?: Spacing) => number | string | undefined;
  textVariants: {
    body: TextVariant;
    button: TextVariant;
    display: TextVariant;
    emphasized: TextVariant;
    field: TextVariant;
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

export interface ThemeDetails {
  colors: ThemeColors;
  disabledOpacity: number;
}

export type Theme = ThemeBase & ThemeDetails;

export type ThemeOptions = RecursivePartial<ThemeBase> & ThemeDetails;
