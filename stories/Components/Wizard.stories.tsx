import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Box, useWizard, Wizard, WizardProps } from '../../src';

export default {
  title: 'Components/Wizard',
  component: Wizard,
  argTypes: {
    onCurrentIndexChange: { action: 'onCurrentIndexChange' },
  },
} as Meta;

const Step = ({ children, index }) => {
  const { currentIndex } = useWizard();

  if (currentIndex !== index) return null;

  return <Box paddingBottom={6}>{children}</Box>;
};

export const Default: Story<WizardProps> = args => (
  <Box
    backgroundColor="backgroundContrast"
    borderRadius="md"
    padding={6}
    width={80}
  >
    <Wizard {...args}>
      <Step index={0}>Step 1</Step>
      <Step index={1}>Step 2</Step>
      <Step index={2}>Step 3</Step>
      <Step index={3}>Step 4</Step>
    </Wizard>
  </Box>
);

Default.args = {
  currentIndex: 0,
  finishText: 'Finish',
};

Default.argTypes = {
  currentIndex: {
    control: { type: 'inline-radio' },
    options: [0, 1, 2, 3],
  },
  onFinish: { action: 'onFinish' },
};
