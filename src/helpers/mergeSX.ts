import { CSSObject } from '@emotion/react';
import { merge } from 'lodash';

export function mergeSX(
  mainSX?: CSSObject,
  overridesSX?: CSSObject,
): CSSObject | undefined {
  return merge(mainSX, overridesSX);
}
