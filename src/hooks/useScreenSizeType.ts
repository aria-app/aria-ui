import { useTheme } from '@emotion/react';
import { useMediaQuery } from 'react-responsive';

import { Theme } from '../types';

export function useScreenSizeType(): keyof Theme['screenSizes'] {
  const theme = useTheme();

  if (!theme) {
    throw new Error(
      'A theme must be provided to use the useScreenSizeType hook.',
    );
  }

  const isLg = useMediaQuery({
    query: `(min-width: ${theme.screenSizes.lg}px)`,
  });
  const isMd = useMediaQuery({
    query: `(min-width: ${theme.screenSizes.sm}px)`,
  });

  if (isLg) return 'lg';

  if (isMd) return 'md';

  return 'sm';
}
