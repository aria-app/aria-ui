import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import React, { FC, ProviderProps } from 'react';

import { AriaUITheme } from './baseTheme';
import { lightTheme } from './lightTheme';

export interface ThemeProviderProps
  extends Partial<ProviderProps<AriaUITheme>> {
  theme?: AriaUITheme;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  theme = lightTheme,
  ...rest
}) => {
  return <EmotionThemeProvider theme={theme} {...rest} />;
};
