import { Meta, Story } from '@storybook/react';
import ContentSaveIcon from 'mdi-react/ContentSaveIcon';
import PencilIcon from 'mdi-react/PencilIcon';
import TrashIcon from 'mdi-react/TrashIcon';
import React from 'react';

import { Button, IconButton, Stack, Toolbar, ToolbarProps } from '../../src';

export default {
  title: 'Components/Toolbar',
  component: Toolbar,
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story<ToolbarProps> = (args) => (
  <Toolbar {...args}>
    <Stack align="center" direction="row" grow space={2}>
      <IconButton icon={<ContentSaveIcon />} />
      <IconButton icon={<PencilIcon />} />
      <IconButton icon={<TrashIcon />} />
      <Button sx={{ marginLeft: 'auto ' }} text="Action" />
    </Stack>
  </Toolbar>
);

Default.args = {};
