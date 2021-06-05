import { useMemo } from 'react';

import { getResponsivePropValue } from '../helpers';
import { ResponsiveProp } from '../types';
import { useScreenSizeType } from './useScreenSizeType';

export function useResponsivePropValue<PropType = any>(
  responsiveProp: ResponsiveProp<PropType>,
): PropType | undefined {
  const screenSizeType = useScreenSizeType();

  const value = useMemo(
    () => getResponsivePropValue(responsiveProp, screenSizeType),
    [responsiveProp, screenSizeType],
  );

  return value;
}
