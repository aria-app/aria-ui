import styled from '@emotion/styled';
import React, { ElementType } from 'react';
import { PolymorphicComponentProps } from 'react-polymorphic-box';

import { Theme } from '../types';

export type TextOwnProps = {
  color?: keyof Theme['colors'];
  colorIsBackground?: boolean;
  component?: ElementType;
  variant?: keyof Theme['textVariants'];
};

const TextRoot = styled.span<TextOwnProps>(
  ({ color = 'textPrimary', colorIsBackground, theme, variant = 'body' }) => {
    const themeColor = colorIsBackground
      ? theme.getForegroundColor(color)
      : theme.getColor(color);
    return {
      color: themeColor || 'inherit',
      fontFamily: theme.fontFamily,
      ...theme.textVariants[variant],
    };
  },
);

export type TextProps<E extends ElementType> = PolymorphicComponentProps<
  E,
  TextOwnProps
>;

const defaultElement = 'span';

export function Text<E extends ElementType = typeof defaultElement>({
  component = defaultElement,
  ...rest
}: TextProps<E>): JSX.Element {
  return <TextRoot as={component} {...rest}></TextRoot>;
}