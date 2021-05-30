import styled from '@emotion/styled';
import React, { FC, HTMLAttributes } from 'react';

const Root = styled.div(({ theme }) => ({
  backgroundColor: theme.palette.backgroundDefault,
}));

export type ShellProps = HTMLAttributes<HTMLElement>;

export const Shell: FC<ShellProps> = props => {
  return <Root {...props} />;
};
