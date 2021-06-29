import { Meta, Story } from '@storybook/react';
import AccountBoxIcon from 'mdi-react/AccountBoxIcon';
import HeartIcon from 'mdi-react/HeartIcon';
import HomeIcon from 'mdi-react/HomeIcon';
import React from 'react';

import { Box, NavigationRail, NavigationRailProps } from '../../src';

export default {
  title: 'Components/NavigationRail',
  component: NavigationRail,
  decorators: [
    Story => (
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          width: '100vw',
        }}
      >
        {Story()}
      </Box>
    ),
  ],
  argTypes: {
    items: { table: { disable: true } },
    onValueChange: { action: 'onValueChange' },
    value: {
      control: { type: 'inline-radio' },
      options: [undefined, 'home', 'likes', 'profile'],
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story<NavigationRailProps> = args => (
  <NavigationRail {...args} />
);

Default.args = {
  items: [
    { icon: <HomeIcon />, label: 'Home', value: 'home' },
    { icon: <HeartIcon />, label: 'Likes', value: 'likes' },
    { icon: <AccountBoxIcon />, label: 'Profile', value: 'profile' },
  ],
  value: 'home',
};
