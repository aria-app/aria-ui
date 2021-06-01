import { isArray, isNil } from 'lodash';
import last from 'lodash/last';

import { ResponsiveProp, Theme } from '../types';

export function getResponsivePropValue<PropType>(
  basePropValue: ResponsiveProp<PropType>,
  screenSize: keyof Theme['screenSizes'],
): PropType | undefined {
  if (isNil(basePropValue) || !isArray(basePropValue)) return basePropValue;

  if (screenSize === 'sm' || basePropValue.length === 1) {
    return basePropValue[0];
  }

  if (screenSize === 'md' || basePropValue.length === 2) {
    return basePropValue[1];
  }

  return last(basePropValue);
}
