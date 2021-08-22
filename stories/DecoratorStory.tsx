import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';
import { FC } from 'react';

export interface DecoratorStoryProps {
  storyFn: () => StoryFnReactReturnType;
}

export const DecoratorStory: FC<DecoratorStoryProps> = ({ storyFn }) =>
  storyFn();
