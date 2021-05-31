import styled from '@emotion/styled';
import React, { ElementType } from 'react';
import { PolymorphicComponentProps } from 'react-polymorphic-box';

const Root = styled.div(({ theme }) => ({
  backgroundColor: theme.palette.backgroundDefault,
}));

// Component-specific props should be specified separately
export type BoxOwnProps = {
  color?: string;
  component?: ElementType;
};

// Merge own props with others inherited from the underlying element type
export type BoxProps<E extends ElementType> = PolymorphicComponentProps<
  E,
  BoxOwnProps
>;

const defaultElement = 'div';

export function Box<E extends ElementType = typeof defaultElement>({
  color,
  component = defaultElement,
  ...rest
}: BoxProps<E>): JSX.Element {
  return <Root as={component} style={{ color }} {...rest}></Root>;
}
