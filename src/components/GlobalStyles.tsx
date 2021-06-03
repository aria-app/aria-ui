import { css, Global, Interpolation, Theme } from '@emotion/react';
import React, { FC } from 'react';

const styles: Interpolation<Theme> = theme => css`
  html * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${theme.colors.backgroundDefault};
    color: ${theme.colors.textPrimary};
    font-family: ${theme.fontFamily};
  }
`;

export const GlobalStyles: FC<never> = () => {
  return <Global styles={styles} />;
};
