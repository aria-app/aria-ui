import { useMediaQuery } from 'react-responsive';

import { Theme } from '../types';
import { useThemeWithDefault } from './useThemeWithDefault';

export function useScreenSizeType(): keyof Theme['screenSizes'] {
  const { screenSizes } = useThemeWithDefault();

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
