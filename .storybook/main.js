const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  typescript: {
    check: true,
    docgen: 'none',
    reactDocgenTypescriptOptions: {
      include: ['src/**/*.tsx', 'stories/**/*.tsx'],
    },
  },
  webpackFinal: async config => {
    const emotionReactEleven = path.dirname(
      require.resolve('@emotion/react/package.json'),
    );
    const emotionStyledEleven = path.dirname(
      require.resolve('@emotion/styled/package.json'),
    );
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': emotionReactEleven,
          '@emotion/styled': emotionStyledEleven,
          'emotion-theming': emotionReactEleven,
        },
      },
    };
  },
};
