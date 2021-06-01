import { lightTheme } from '../src';
import { Theme } from '../src/types';

export const borderRadii = Object.keys(
  lightTheme.borderRadii,
) as (keyof Theme['borderRadii'])[];

export const buttonVariants = ['contained', 'outlined', 'text'];

export const colors = Object.keys(
  lightTheme.colors,
) as (keyof Theme['colors'])[];

export const textVariants = Object.keys(
  lightTheme.textVariants,
) as (keyof Theme['textVariants'])[];
