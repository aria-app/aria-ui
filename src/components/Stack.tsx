import { useTheme } from '@emotion/react';
import CSS from 'csstype';
import { flatten, merge } from 'lodash';
import React, { Children, forwardRef } from 'react';

import { getResponsivePropValue } from '../helpers';
import { useScreenSizeType } from '../hooks';
import { ResponsiveProp, Spacing } from '../types';
import { Box, BoxProps } from './Box';
import { Divider, DividerThickness } from './Divider';

export type StackAlignment = 'center' | 'end' | 'start' | 'stretch';

export type StackDirection =
  | 'column'
  | 'column-reverse'
  | 'row'
  | 'row-reverse';

export interface StackProps extends BoxProps<'div'> {
  align?: ResponsiveProp<StackAlignment | undefined>;
  alignSelf?: ResponsiveProp<StackAlignment | undefined>;
  direction?: ResponsiveProp<StackDirection | undefined>;
  dividerThickness?: DividerThickness;
  isDivided?: boolean;
  space?: ResponsiveProp<Spacing | undefined>;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  const {
    align,
    alignSelf,
    children,
    component = 'div',
    direction,
    dividerThickness,
    isDivided,
    space,
    sx,
    ...rest
  } = props;
  const theme = useTheme();
  const screenSizeType = useScreenSizeType();
  const alignValue = getResponsivePropValue(align, screenSizeType) || 'stretch';
  const alignSelfValue = getResponsivePropValue(alignSelf, screenSizeType);
  const directionValue =
    getResponsivePropValue(direction, screenSizeType) || 'column';
  const spaceValue = getResponsivePropValue(space, screenSizeType);

  return (
    <Box
      component={component}
      ref={ref}
      sx={merge(
        {
          alignItems: stackAlignToCSS(alignValue),
          alignSelf: stackAlignToCSS(alignSelfValue),
          display: 'flex',
          flexDirection: directionValue,
          label: 'Stack',
          '& > * + *': {
            [{
              column: 'marginTop',
              'column-reverse': 'marginBottom',
              row: 'marginLeft',
              'row-reverse': 'marginRight',
            }[directionValue]]: theme.space(spaceValue),
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
                    directionValue === 'row' || directionValue === 'row-reverse'
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

function stackAlignToCSS(
  stackAlignment?: StackAlignment,
): CSS.Properties['alignItems'] {
  return stackAlignment
    ? {
        center: 'center',
        end: 'flex-end',
        start: 'flex-start',
        stretch: 'stretch',
      }[stackAlignment]
    : undefined;
}
