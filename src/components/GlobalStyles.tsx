import { css, Global } from '@emotion/react';
import React, { FC } from 'react';

import { useThemeWithDefault } from '../hooks';

export const GlobalStyles: FC<any> = () => {
  const theme = useThemeWithDefault();
  return (
    <Global
      styles={css`
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
      `}
    />
  );
};
