import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Box, Sheet, SheetProps } from '../../src';

export default {
  title: 'Components/Sheet',
  component: Sheet,
  argTypes: {
    isOpen: { control: { type: 'boolean' } },
    onOverlayClick: { action: 'onOverlayClick' },
    rightPanelWidth: {
      control: { type: 'number' },
      description: 'Spacing (Multiplied by 4)',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story<SheetProps & { contentHeight?: number }> = ({
  contentHeight,
  ...rest
}) => (
  <>
    Main content behind the sheet
    <Sheet {...rest}>
      <Box height={contentHeight}>Sheet Content</Box>
    </Sheet>
  </>
);

Default.args = {
  contentHeight: 400,
  rightPanelWidth: 80,
};

export const Open: Story<SheetProps & { contentHeight?: number }> = ({
  contentHeight,
  ...rest
}) => (
  <>
    Main content behind the sheet
    <Sheet {...rest}>
      <Box height={contentHeight}>Sheet Content</Box>
    </Sheet>
  </>
);

Open.args = {
  contentHeight: 400,
  isOpen: true,
};

Open.parameters = {
  chromatic: {
    viewports: [479, 1024],
  },
  viewports: {
    defaultViewport: 'responsive',
  },
};
