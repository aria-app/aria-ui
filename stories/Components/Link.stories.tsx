import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Link, LinkProps } from '../../src';

export default {
  title: 'Components/Link',
  component: Link,
  argTypes: {
    children: { control: { type: 'text' } },
    href: { control: { type: 'text' } },
  },
} as Meta;

export const Default: Story<LinkProps> = (args) => <Link {...args} />;

Default.args = {
  children: 'Link to Google',
  href: 'https://www.google.com',
};
