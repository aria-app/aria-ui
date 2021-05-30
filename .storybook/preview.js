import { ThemeProvider } from '@emotion/react';

import { lightTheme } from '../src';

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
};

export const decorators = [
  Story => {
    return (
      <ThemeProvider theme={lightTheme}>
        <Story />
      </ThemeProvider>
    );
  },
];
