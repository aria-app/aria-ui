import { darkTheme, GlobalStyles, lightTheme, ThemeProvider } from '../src';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  backgrounds: { disable: true },
  layout: 'centered',
};

export const decorators = [
  (storyFn, context) => {
    return (
      <ThemeProvider
        theme={context.globals.theme === 'dark' ? darkTheme : lightTheme}
      >
        <GlobalStyles />
        {storyFn()}
      </ThemeProvider>
    );
  },
];
