import { borderRadii, colors, statuses } from './constants';

export const borderRadius = {
  control: { type: 'select' },
  options: [undefined, ...borderRadii],
};

export const color = {
  control: { type: 'select' },
  options: [undefined, ...colors],
};

export const spacing = { control: { type: 'number' } };

export const status = {
  control: { type: 'inline-radio' },
  options: [undefined, ...statuses],
};
