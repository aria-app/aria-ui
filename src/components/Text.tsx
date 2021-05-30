import styled from '@emotion/styled/macro';
import React, { ElementType, FC, HTMLAttributes } from 'react';

const Inner = styled.div(({ theme }) => ({
  color: 'red',
  fontFamily: theme.fontFamily,
}));

export interface TextProps extends HTMLAttributes<HTMLElement> {
  component?: ElementType;
}

export const Text: FC<TextProps> = ({
  children,
  component: Component = 'span',
  ...rest
}) => {
  return (
    <Component {...rest}>
      <Inner>{children}</Inner>
    </Component>
  );
};
