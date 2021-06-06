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

export const OpenDesktop: Story<SheetProps & { contentHeight?: number }> = ({
  contentHeight,
  ...rest
}) => (
  <>
    Main content behind the sheet
    <Sheet isOpen={true} {...rest}>
      <Box height={contentHeight}>Sheet Content</Box>
    </Sheet>
  </>
);

OpenDesktop.args = {
  contentHeight: 400,
};

OpenDesktop.parameters = {
  chromatic: { viewports: [1024, 768] },
  viewport: {
    defaultViewport: 'responsive',
  },
};

export const OpenMobile: Story<SheetProps & { contentHeight?: number }> = ({
  contentHeight,
  ...rest
}) => (
  <>
    Main content behind the sheet
    <Sheet isOpen={true} {...rest}>
      <Box height={contentHeight}>Sheet Content</Box>
    </Sheet>
  </>
);

OpenMobile.args = {
  contentHeight: 400,
};

OpenMobile.parameters = {
  chromatic: { viewports: [480, 640] },
  viewport: {
    defaultViewport: 'mobile2',
  },
};
