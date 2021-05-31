import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import React, { FC, ProviderProps } from 'react';

import { Theme } from '../types';
import { lightTheme } from './lightTheme';

export interface ThemeProviderProps extends Partial<ProviderProps<Theme>> {
  theme?: Theme;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  theme = lightTheme,
  ...rest
}) => {
  return <EmotionThemeProvider theme={theme} {...rest} />;
};
