import { useTheme } from '@emotion/react';
import { flatten, merge } from 'lodash';
import React, { Children, forwardRef } from 'react';

import { Spacing } from '../types';
import { Box, BoxProps } from './Box';
import { Divider, DividerThickness } from './Divider';

export type StackAlignment = 'center' | 'end' | 'start' | 'stretch';

export type StackDirection =
  | 'column'
  | 'column-reverse'
  | 'row'
  | 'row-reverse';

export interface StackProps extends BoxProps<'div'> {
  align?: StackAlignment;
  direction?: StackDirection;
  dividerThickness?: DividerThickness;
  isDivided?: boolean;
  space?: Spacing;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  const {
    align = 'stretch',
    children,
    component = 'div',
    direction = 'column',
    dividerThickness,
    isDivided,
    space,
    sx = {},
    ...rest
  } = props;
  const theme = useTheme();

  return (
    <Box
      component={component}
      ref={ref}
      sx={merge(
        {
          alignItems: {
            center: 'center',
            end: 'flex-end',
            start: 'flex-start',
            stretch: 'stretch',
          }[align],
          display: 'flex',
          flexDirection: direction,
          '& > * + *': {
            [{
              column: 'marginTop',
              'column-reverse': 'marginBottom',
              row: 'marginLeft',
              'row-reverse': 'marginRight',
            }[direction]]: theme.space(space),
          },
        },
        sx,
      )}
      {...rest}
    >
      {flatten(
        Children.map(children, (child, index) =>
          isDivided && index
            ? [
                <Divider
                  key={`divider-${index}`}
                  orientation={
                    direction === 'row' || direction === 'row-reverse'
                      ? 'vertical'
                      : 'horizontal'
                  }
                  sx={{ alignSelf: 'stretch' }}
                  thickness={dividerThickness}
                />,
                child,
              ]
            : [child],
        ),
      )}
    </Box>
  );
});

Stack.displayName = 'Stack';
