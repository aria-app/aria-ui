module.exports = {
  stories: ['../stories/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  typescript: {
    check: true,
    reactDocgen: 'react-docgen',
    reactDocgenTypescriptOptions: {
      include: ['src/**/*.tsx', 'stories/**/*.tsx'],
    },
  },
};
