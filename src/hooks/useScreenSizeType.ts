import { useTheme } from '@emotion/react';
import { isEmpty } from 'lodash';
import { useMediaQuery } from 'react-responsive';

import { lightTheme } from '../themes';
import { Theme } from '../types';

export function useScreenSizeType(): keyof Theme['screenSizes'] {
  const theme = useTheme();
  const { screenSizes } = isEmpty(theme) ? lightTheme : theme;

  const isLg = useMediaQuery({
    query: `(min-width: ${screenSizes.lg}px)`,
  });
  const isMd = useMediaQuery({
    query: `(min-width: ${screenSizes.sm}px)`,
  });

  if (isLg) return 'lg';

  if (isMd) return 'md';

  return 'sm';
}
