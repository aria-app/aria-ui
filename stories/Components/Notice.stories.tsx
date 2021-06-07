import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Box, Notice, NoticeProps } from '../../src';
import * as argTypes from '../argTypes';

export default {
  title: 'Components/Notice',
  component: Notice,
  argTypes: {
    children: { control: { type: 'text' } },
    size: {
      control: { type: 'inline-radio' },
      options: [undefined, 'lg', 'md', 'sm'],
    },
    status: argTypes.status,
  },
} as Meta;

export const Default: Story<NoticeProps> = args => <Notice {...args} />;

Default.args = {
  children: 'This is a notice to the user of this app',
  size: 'md',
  status: 'info',
};

export const ShortMessage: Story<NoticeProps> = args => <Notice {...args} />;

ShortMessage.args = {
  children: 'msg',
};

export const LongMessage: Story<NoticeProps> = args => (
  <Box sx={{ maxWidth: 480 }}>
    <Notice {...args} />
  </Box>
);

LongMessage.args = {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel mollis sapien. Praesent orci ante, ultrices nec condimentum id, venenatis at ex. Suspendisse sapien dui, eleifend at lorem et, rhoncus lacinia orci. Suspendisse commodo iaculis placerat. Duis sollicitudin ex varius odio imperdiet, sit amet lobortis mauris mollis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque odio tellus, gravida in fringilla a, aliquam ut dolor. Vestibulum tristique sit amet eros ac molestie. Sed eu augue tellus. Sed congue neque malesuada, egestas purus id, pharetra tortor.',
};
