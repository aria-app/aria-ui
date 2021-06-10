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
    onSelectedNameChange: { action: 'onSelectedNameChange' },
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
    { icon: <HomeIcon />, label: 'Home', name: 'home' },
    { icon: <HeartIcon />, label: 'Likes', name: 'likes' },
    { icon: <AccountBoxIcon />, label: 'Profile', name: 'profile' },
  ],
  selectedName: 'home',
};

Default.argTypes = {
  selectedName: {
    control: { type: 'inline-radio' },
    options: [undefined, 'home', 'likes', 'profile'],
  },
};
