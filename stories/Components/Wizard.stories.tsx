import { Meta, Story } from '@storybook/react';
import React, { FC } from 'react';

import { Box, useWizard, Wizard, WizardProps } from '../../src';

export default {
  title: 'Components/Wizard',
  component: Wizard,
  decorators: [
    Story => (
      <Box
        backgroundColor="backgroundContrast"
        borderRadius="md"
        padding={6}
        width={80}
      >
        {Story()}
      </Box>
    ),
  ],
  argTypes: {
    currentIndex: {
      control: { type: 'inline-radio' },
      options: [0, 1, 2, 3],
    },
    onCurrentIndexChange: { action: 'onCurrentIndexChange' },
    onFinish: { action: 'onFinish' },
  },
} as Meta;

const Step: FC<any> = ({ children, index }) => {
  const { currentIndex } = useWizard();

  if (currentIndex !== index) return null;

  return <Box paddingBottom={6}>{children}</Box>;
};

export const Default: Story<WizardProps> = args => (
  <Wizard {...args}>
    <Step index={0}>Step 1</Step>
    <Step index={1}>Step 2</Step>
    <Step index={2}>Step 3</Step>
  </Wizard>
);

Default.args = {
  currentIndex: 0,
  finishText: 'Finish',
};

export const MiddleStep: Story<WizardProps> = args => (
  <Wizard {...args}>
    <Step index={0}>Step 1</Step>
    <Step index={1}>Step 2</Step>
    <Step index={2}>Step 3</Step>
  </Wizard>
);

MiddleStep.args = {
  ...Default.args,
  currentIndex: 1,
};

export const LastStep: Story<WizardProps> = args => (
  <Wizard {...args}>
    <Step index={0}>Step 1</Step>
    <Step index={1}>Step 2</Step>
    <Step index={2}>Step 3</Step>
  </Wizard>
);

LastStep.args = {
  ...Default.args,
  currentIndex: 2,
};
