import { Global } from '@emotion/react';
import React, { FC } from 'react';

import { useThemeWithDefault } from '../hooks';

export const GlobalStyles: FC<any> = () => {
  const theme = useThemeWithDefault();
  return (
    <Global
      styles={{
        '*': {
          boxSizing: 'border-box',
          KhtmlUserSelect: 'none',
          margin: 0,
          MozUserSelect: 'none',
          MsUserSelect: 'none',
          outline: 'none',
          padding: 0,
          userSelect: 'none',
          WebkitFocusRingColor: 'transparent',
          WebkitTapHighlightColor: 'transparent',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
        },
        body: {
          backgroundColor: theme.colors.backgroundDefault,
          color: theme.colors.textPrimary,
          fontFamily: theme.fontFamily,
        },
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    />
  );
};
