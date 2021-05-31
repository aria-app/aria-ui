import { lightTheme } from '../src';
import { Theme } from '../src/types';

export const colors = Object.keys(
  lightTheme.colors,
) as (keyof Theme['colors'])[];

export const textVariants = Object.keys(
  lightTheme.textVariants,
) as (keyof Theme['textVariants'])[];
