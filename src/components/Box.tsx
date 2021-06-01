import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ElementType } from 'react';
import { PolymorphicComponentProps } from 'react-polymorphic-box';

import { getResponsivePropValue } from '../helpers';
import { useScreenSizeType } from '../hooks';
import { ResponsiveProp, Theme } from '../types';

// Component-specific props should be specified separately
export type BoxOwnProps = {
  backgroundColor?: keyof Theme['colors'];
  component?: ElementType;
  isInteractive?: boolean;
  margin?: ResponsiveProp<number>;
  marginBottom?: ResponsiveProp<number>;
  marginLeft?: ResponsiveProp<number>;
  marginRight?: ResponsiveProp<number>;
  marginTop?: ResponsiveProp<number>;
  marginX?: ResponsiveProp<number>;
  marginY?: ResponsiveProp<number>;
  padding?: ResponsiveProp<number>;
  paddingBottom?: ResponsiveProp<number>;
  paddingLeft?: ResponsiveProp<number>;
  paddingRight?: ResponsiveProp<number>;
  paddingTop?: ResponsiveProp<number>;
  paddingX?: ResponsiveProp<number>;
  paddingY?: ResponsiveProp<number>;
};

const BoxRoot = styled.div<BoxOwnProps>(
  ({ backgroundColor, isInteractive, theme }) => {
    const foregroundColor = theme.getForegroundColor(backgroundColor);
    const isLightBackground =
      !foregroundColor || foregroundColor === theme.colors.textPrimary;

    return {
      backgroundColor: theme.getColor(backgroundColor),
      ...(isInteractive
        ? {
            cursor: 'pointer',
            position: 'relative',
            '&::after': {
              backgroundColor: isLightBackground ? '#000' : '#fff',
              bottom: 0,
              content: '""',
              left: 0,
              pointerEvents: 'none',
              opacity: 0,
              position: 'absolute',
              right: 0,
              top: 0,
              transition: 'opacity 100ms ease-in-out',
            },
            '&:hover::after': {
              opacity: isLightBackground ? '0.1' : '0.2',
            },
            '&:active::after': {
              opacity: isLightBackground ? '0.25' : '0.4',
            },
          }
        : {}),
    };
  },
);

// Merge own props with others inherited from the underlying element type
export type BoxProps<E extends ElementType> = PolymorphicComponentProps<
  E,
  BoxOwnProps
>;

const defaultElement = 'div';

export function Box<E extends ElementType = typeof defaultElement>({
  component = defaultElement,
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
  padding,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingX,
  paddingY,
  style: styleProp = {},
  ...rest
}: BoxProps<E>): JSX.Element {
  const screenSizeType = useScreenSizeType();
  const theme = useTheme();
  const style = React.useMemo(() => {
    const getValue = (baseValue: ResponsiveProp<number | undefined>) =>
      theme.space(getResponsivePropValue(baseValue, screenSizeType));

    return {
      marginBottom: getValue(marginBottom || marginY || margin),
      marginLeft: getValue(marginLeft || marginX || margin),
      marginRight: getValue(marginRight || marginX || margin),
      marginTop: getValue(marginTop || marginY || margin),
      paddingBottom: getValue(paddingBottom || paddingY || padding),
      paddingLeft: getValue(paddingLeft || paddingX || padding),
      paddingRight: getValue(paddingRight || paddingX || padding),
      paddingTop: getValue(paddingTop || paddingY || padding),
      ...styleProp,
    };
  }, [
    margin,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    marginX,
    marginY,
    padding,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingX,
    paddingY,
    screenSizeType,
    styleProp,
    theme,
  ]);

  return <BoxRoot as={component} style={style} {...rest}></BoxRoot>;
}
