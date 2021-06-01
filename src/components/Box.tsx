import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import CSS from 'csstype';
import React, { ElementType } from 'react';
import { PolymorphicComponentProps } from 'react-polymorphic-box';

import { getResponsivePropValue } from '../helpers';
import { useScreenSizeType } from '../hooks';
import { ResponsiveProp, Spacing, Theme } from '../types';

// Component-specific props should be specified separately
export type BoxOwnProps = {
  backgroundColor?: keyof Theme['colors'];
  borderBottomLeftRadius?: keyof Theme['borderRadii'];
  borderBottomRightRadius?: keyof Theme['borderRadii'];
  borderBottomWidth?: CSS.Properties['borderBottomWidth'];
  borderColor?: keyof Theme['colors'];
  borderLeftWidth?: CSS.Properties['borderLeftWidth'];
  borderRadius?: keyof Theme['borderRadii'];
  borderRightWidth?: CSS.Properties['borderRightWidth'];
  borderTopLeftRadius?: keyof Theme['borderRadii'];
  borderTopRightRadius?: keyof Theme['borderRadii'];
  borderTopWidth?: CSS.Properties['borderTopWidth'];
  borderWidth?: CSS.Properties['borderWidth'];
  bottom?: ResponsiveProp<Spacing>;
  component?: ElementType;
  height?: ResponsiveProp<Spacing>;
  isInteractive?: boolean;
  left?: ResponsiveProp<Spacing>;
  margin?: ResponsiveProp<Spacing>;
  marginBottom?: ResponsiveProp<Spacing>;
  marginLeft?: ResponsiveProp<Spacing>;
  marginRight?: ResponsiveProp<Spacing>;
  marginTop?: ResponsiveProp<Spacing>;
  marginX?: ResponsiveProp<Spacing>;
  marginY?: ResponsiveProp<Spacing>;
  padding?: ResponsiveProp<Spacing>;
  paddingBottom?: ResponsiveProp<Spacing>;
  paddingLeft?: ResponsiveProp<Spacing>;
  paddingRight?: ResponsiveProp<Spacing>;
  paddingTop?: ResponsiveProp<Spacing>;
  paddingX?: ResponsiveProp<Spacing>;
  paddingY?: ResponsiveProp<Spacing>;
  position?: CSS.Properties['position'];
  right?: ResponsiveProp<Spacing>;
  size?: ResponsiveProp<Spacing>;
  top?: ResponsiveProp<Spacing>;
  width?: ResponsiveProp<Spacing>;
};

const BoxRoot = styled.div<BoxOwnProps>(props => {
  const foregroundColor = props.theme.getForegroundColor(props.backgroundColor);
  const isLightBackground =
    !foregroundColor || foregroundColor === props.theme.colors.textPrimary;

  return {
    backgroundColor: props.theme.getColor(props.backgroundColor),
    //----Group border radii to enable proper overriding----
    borderRadius: props.theme.getBorderRadius(props.borderRadius),
    borderBottomLeftRadius: props.theme.getBorderRadius(
      props.borderBottomLeftRadius,
    ),
    borderBottomRightRadius: props.theme.getBorderRadius(
      props.borderBottomRightRadius,
    ),
    borderTopLeftRadius: props.theme.getBorderRadius(props.borderTopLeftRadius),
    borderTopRightRadius: props.theme.getBorderRadius(
      props.borderTopRightRadius,
    ),
    //-------------------------------------------------------
    borderColor: props.theme.getColor(props.borderColor),
    borderStyle: props.borderColor && 'solid',
    //----Group border widths to enable proper overriding----
    borderWidth: props.borderWidth || 1,
    borderRightWidth: props.borderRightWidth,
    borderTopWidth: props.borderTopWidth,
    borderBottomWidth: props.borderBottomWidth,
    borderLeftWidth: props.borderLeftWidth,
    //-------------------------------------------------------
    ...(props.isInteractive
      ? {
          cursor: 'pointer',
          overflow: 'hidden',
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
    // Place after interactive overlay mixin to override the position set inside
    position: props.position,
  };
});

// Merge own props with others inherited from the underlying element type
export type BoxProps<E extends ElementType> = PolymorphicComponentProps<
  E,
  BoxOwnProps
>;

const defaultElement = 'div';

export function Box<E extends ElementType = typeof defaultElement>(
  props: BoxProps<E>,
): JSX.Element {
  const {
    bottom,
    component = defaultElement,
    height,
    left,
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
    right,
    size,
    style: styleProp = {},
    top,
    width,
    ...rest
  } = props;
  const screenSizeType = useScreenSizeType();
  const theme = useTheme();
  const style = React.useMemo(() => {
    const getValue = (baseValue: ResponsiveProp<Spacing | undefined>) =>
      theme.space(getResponsivePropValue(baseValue, screenSizeType));

    return {
      bottom: getValue(bottom),
      height: getValue(size || height),
      left: getValue(left),
      marginBottom: getValue(marginBottom || marginY || margin),
      marginLeft: getValue(marginLeft || marginX || margin),
      marginRight: getValue(marginRight || marginX || margin),
      marginTop: getValue(marginTop || marginY || margin),
      paddingBottom: getValue(paddingBottom || paddingY || padding),
      paddingLeft: getValue(paddingLeft || paddingX || padding),
      paddingRight: getValue(paddingRight || paddingX || padding),
      paddingTop: getValue(paddingTop || paddingY || padding),
      right: getValue(right),
      top: getValue(top),
      width: getValue(size || width),
      ...styleProp,
    };
  }, [
    bottom,
    height,
    left,
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
    right,
    screenSizeType,
    size,
    styleProp,
    theme,
    top,
    width,
  ]);

  return <BoxRoot as={component} style={style} {...rest}></BoxRoot>;
}
