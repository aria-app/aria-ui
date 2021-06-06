import getContrast from 'polished/lib/color/getContrast';

export function isLightColor(color: string): boolean {
  return getContrast(color, 'black') >= 7;
}
