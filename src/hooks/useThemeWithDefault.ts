import { useTheme } from '@emotion/react';
import { isEmpty } from 'lodash';

import { lightTheme } from '../themes';
import { Theme } from '../types';

export function useThemeWithDefault(): Theme {
  const providedTheme = useTheme();

  return isEmpty(providedTheme) ? lightTheme : providedTheme;
}
