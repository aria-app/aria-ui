import {
  ButtonVariant,
  lightTheme,
  StackAlignment,
  StackDirection,
} from '../src';
import { Theme } from '../src/types';

export const borderRadii = Object.keys(
  lightTheme.borderRadii,
) as (keyof Theme['borderRadii'])[];

export const buttonVariants: ButtonVariant[] = [
  'contained',
  'outlined',
  'minimal',
];

export const colors = Object.keys(
  lightTheme.colors,
) as (keyof Theme['colors'])[];

export const stackAlignments: StackAlignment[] = [
  'stretch',
  'start',
  'center',
  'end',
];

export const stackDirections: StackDirection[] = [
  'column',
  'column-reverse',
  'row',
  'row-reverse',
];

export const textVariants = Object.keys(
  lightTheme.textVariants,
) as (keyof Theme['textVariants'])[];
