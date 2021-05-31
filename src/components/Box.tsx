import styled from '@emotion/styled';
import React, { ElementType } from 'react';
import { PolymorphicComponentProps } from 'react-polymorphic-box';

import { Theme } from '../types';

// Component-specific props should be specified separately
export type BoxOwnProps = {
  backgroundColor?: keyof Theme['palette'];
  color?: keyof Theme['palette'];
  component?: ElementType;
};

const Root = styled.div<BoxOwnProps>(({ backgroundColor, color, theme }) => ({
  backgroundColor: backgroundColor && theme.palette[backgroundColor],
  color: color && theme.palette[color],
}));

// Merge own props with others inherited from the underlying element type
export type BoxProps<E extends ElementType> = PolymorphicComponentProps<
  E,
  BoxOwnProps
>;

const defaultElement = 'div';

export function Box<E extends ElementType = typeof defaultElement>({
  component = defaultElement,
  ...rest
}: BoxProps<E>): JSX.Element {
  return <Root as={component} {...rest}></Root>;
}
