import { CSSObject, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import CSS from 'csstype';
import { merge } from 'lodash';
import React, {
  ElementType,
  ForwardedRef,
  forwardRef,
  KeyboardEventHandler,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithRef,
} from 'react-polymorphic-types';

import { getResponsivePropValue } from '../helpers';
import { useScreenSizeType } from '../hooks';
import { ColorName, ResponsiveProp, Spacing, Theme } from '../types';

// Component-specific props should be specified separately
export type BoxOwnProps = {
  backgroundColor?: ColorName;
  borderBottomLeftRadius?: keyof Theme['borderRadii'];
  borderBottomRightRadius?: keyof Theme['borderRadii'];
  borderBottomWidth?: CSS.Properties<number | string>['borderBottomWidth'];
  borderColor?: ColorName;
  borderLeftWidth?: CSS.Properties<number | string>['borderLeftWidth'];
  borderRadius?: keyof Theme['borderRadii'];
  borderRightWidth?: CSS.Properties<number | string>['borderRightWidth'];
  borderTopLeftRadius?: keyof Theme['borderRadii'];
  borderTopRightRadius?: keyof Theme['borderRadii'];
  borderTopWidth?: CSS.Properties<number | string>['borderTopWidth'];
  borderWidth?: CSS.Properties<number | string>['borderWidth'];
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
  right?: ResponsiveProp<Spacing>;
  size?: ResponsiveProp<Spacing>;
  sx?: CSSObject;
  top?: ResponsiveProp<Spacing>;
  width?: ResponsiveProp<Spacing>;
};

const BoxRoot = styled.div<BoxOwnProps & { isKeyDown: boolean }>(props => {
  const getInteractiveStyles = () => {
    if (!props.isInteractive) return {};

    const foregroundColor = props.theme.getForegroundColor(
      props.backgroundColor,
    );

    return {
      cursor: 'pointer',
      position: 'relative',
      '&::after': {
        backgroundColor: foregroundColor,
        bottom: 0,
        content: '""',
        left: 0,
        pointerEvents: 'none',
        opacity: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        transition: 'opacity 100ms ease-in-out',
        ...(props.isKeyDown
          ? {
              opacity: '0.25',
            }
          : {}),
        ...borderRadii,
      },
      '&:hover::after, &:focus::after': {
        opacity: '0.1',
      },
      '&:active::after': {
        opacity: '0.25',
      },
    };
  };

  const borderRadii = {
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
  };

  return merge(
    {
      backgroundColor: props.theme.getColor(props.backgroundColor),
      borderColor: props.theme.getColor(props.borderColor),
      borderStyle: props.borderColor && 'solid',
      //----Group border widths to enable proper overriding----
      borderWidth: props.borderWidth,
      borderRightWidth: props.borderRightWidth,
      borderTopWidth: props.borderTopWidth,
      borderBottomWidth: props.borderBottomWidth,
      borderLeftWidth: props.borderLeftWidth,
      //-------------------------------------------------------
      ...borderRadii,
    },
    getInteractiveStyles(),
    props.sx,
  );
});

// Merge own props with others inherited from the underlying element type
export type BoxProps<E extends ElementType> = PolymorphicPropsWithRef<
  BoxOwnProps,
  E
>;

const defaultElement = 'div';

export const Box: PolymorphicForwardRefExoticComponent<
  BoxOwnProps,
  typeof defaultElement
> = forwardRef(function Box<E extends ElementType = typeof defaultElement>(
  props: BoxProps<E>,
  ref: ForwardedRef<Element>,
): JSX.Element {
  const [isKeyDown, setIsKeyDown] = useState<boolean>();
  const {
    bottom,
    component = defaultElement,
    height,
    isInteractive,
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

  const style = useMemo(() => {
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

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLElement>>(
    e => {
      if (isInteractive && e.key === ' ') {
        setIsKeyDown(true);
      }
    },
    [isInteractive, setIsKeyDown],
  );

  const handleKeyUp = useCallback<KeyboardEventHandler<HTMLElement>>(() => {
    setIsKeyDown(false);
  }, [setIsKeyDown]);

  return (
    <BoxRoot
      as={component}
      isInteractive={isInteractive}
      isKeyDown={!!isKeyDown}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      ref={ref as ForwardedRef<HTMLDivElement>}
      style={style}
      {...rest}
    ></BoxRoot>
  );
});
