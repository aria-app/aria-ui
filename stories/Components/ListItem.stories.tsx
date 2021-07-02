import { Meta, Story } from '@storybook/react';
import { range } from 'lodash';
import AccountCircleIcon from 'mdi-react/AccountCircleIcon';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import React from 'react';

import { Box, ListItem, ListItemProps, Notice, Stack } from '../../src';

export default {
  title: 'Components/ListItem',
  component: ListItem,
  argTypes: {
    endIcon: { table: { disable: true } },
    onClick: { action: 'onClick' },
    primaryText: { control: { type: 'text' } },
    secondaryText: { control: { type: 'text' } },
    startIcon: { table: { disable: true } },
  },
} as Meta;

export const Default: Story<ListItemProps> = (args) => (
  <Box sx={{ overflow: 'hidden', width: 320 }}>
    <ListItem {...args} />
  </Box>
);

Default.args = {
  endIcon: <CloseIcon />,
  primaryText: 'Some Primary Text',
  secondaryText: 'Some Secondary Text',
  startIcon: <AccountCircleIcon />,
};

Default.argTypes = {
  onEndIconClick: { action: 'onEndIconClick' },
};

export const OnlyPrimaryText: Story<ListItemProps> = (args) => (
  <Box
    backgroundColor="backgroundContrast"
    borderRadius="sm"
    sx={{ overflow: 'hidden', width: 320 }}
  >
    {range(1, 7).map((n) => (
      <ListItem key={n} {...args} primaryText={`Primary Text ${n}`} />
    ))}
  </Box>
);

OnlyPrimaryText.args = {};

export const WithStartIcon: Story<ListItemProps> = (args) => (
  <Box
    backgroundColor="backgroundContrast"
    borderRadius="sm"
    sx={{ overflow: 'hidden', width: 320 }}
  >
    {range(1, 7).map((n) => (
      <ListItem
        key={n}
        {...args}
        primaryText={`Primary Text ${n}`}
        startIcon={<AccountCircleIcon />}
      />
    ))}
  </Box>
);

WithStartIcon.args = {};

WithStartIcon.argTypes = {
  onStartIconClick: { action: 'onStartIconClick' },
};

export const WithEndIcon: Story<ListItemProps> = (args) => (
  <Box
    backgroundColor="backgroundContrast"
    borderRadius="sm"
    sx={{ overflow: 'hidden', width: 320 }}
  >
    {range(1, 7).map((n) => (
      <ListItem
        key={n}
        {...args}
        primaryText={`Primary Text ${n}`}
        endIcon={<ChevronRightIcon />}
      />
    ))}
  </Box>
);

WithEndIcon.args = {};

export const PrimaryAndSecondaryText: Story<ListItemProps> = (args) => (
  <Box
    backgroundColor="backgroundContrast"
    borderRadius="sm"
    sx={{ overflow: 'hidden', width: 320 }}
  >
    {range(1, 7).map((n) => (
      <ListItem
        key={n}
        {...args}
        primaryText={`Primary Text ${n}`}
        secondaryText={`A bit of secondary text ${n}`}
      />
    ))}
  </Box>
);

PrimaryAndSecondaryText.args = {};

export const OnlySecondaryText: Story<ListItemProps> = (args) => (
  <Stack space={4} sx={{ width: 320 }}>
    <Box
      backgroundColor="backgroundContrast"
      borderRadius="sm"
      sx={{ overflow: 'hidden' }}
    >
      {range(1, 7).map((n) => (
        <ListItem
          key={n}
          {...args}
          secondaryText={`A bit of secondary text ${n}`}
        />
      ))}
    </Box>
    <Notice size="sm" status="warning">
      This is not recommended but the component will handle it gracefully.
    </Notice>
  </Stack>
);

OnlySecondaryText.args = {};
