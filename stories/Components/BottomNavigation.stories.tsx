import { Meta, Story } from '@storybook/react';
import AccountBoxIcon from 'mdi-react/AccountBoxIcon';
import HeartIcon from 'mdi-react/HeartIcon';
import HomeIcon from 'mdi-react/HomeIcon';
import React from 'react';

import { BottomNavigation, BottomNavigationProps, Box } from '../../src';

export default {
  title: 'Components/BottomNavigation',
  component: BottomNavigation,
  decorators: [
    (Story) => (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          width: '100vw',
        }}
      >
        <Box sx={{ flex: 1 }} />
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

export const Default: Story<BottomNavigationProps> = (args) => (
  <BottomNavigation {...args} />
);

Default.args = {
  items: [
    { icon: <HomeIcon />, label: 'Home', value: 'home' },
    { icon: <HeartIcon />, label: 'Likes', value: 'likes' },
    { icon: <AccountBoxIcon />, label: 'Profile', value: 'profile' },
  ],
  value: 'home',
};

Default.parameters = {
  chromatic: {
    viewports: [479, 1024],
  },
};
