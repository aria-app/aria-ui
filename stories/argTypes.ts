import { borderRadii, colors } from './constants';

export const borderRadius = {
  control: { type: 'select' },
  options: [undefined, ...borderRadii],
};

export const color = {
  control: { type: 'select' },
  options: [undefined, ...colors],
};

export const spacing = { control: { type: 'number' } };
