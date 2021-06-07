import { CSSObject, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import CSS from 'csstype';
import { isNil, merge, omitBy } from 'lodash';
import React, {
  ElementType,
  ForwardedRef,
  forwardRef,
  KeyboardEventHandler,
  useCallback,
  useState,
} from 'react';
import {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithRef,
} from 'react-polymorphic-types';

import { isLightColor } from '../helpers';
import { useResponsivePropValue } from '../hooks';
import { ColorName, ResponsiveProp, Spacing, Theme } from '../types';

type SpacingProp = ResponsiveProp<Spacing | undefined>;

// Component-specific props should be specified separately
export type BoxOwnProps = {
  backgroundColor?: ColorName;
  borderBottomLeftRadius?: ResponsiveProp<keyof Theme['borderRadii']>;
  borderBottomRightRadius?: ResponsiveProp<keyof Theme['borderRadii']>;
  borderBottomWidth?: CSS.Properties<number | string>['borderBottomWidth'];
  borderColor?: ColorName;
  borderLeftWidth?: CSS.Properties<number | string>['borderLeftWidth'];
  borderRadius?: ResponsiveProp<keyof Theme['borderRadii']>;
  borderRightWidth?: CSS.Properties<number | string>['borderRightWidth'];
  borderTopLeftRadius?: ResponsiveProp<keyof Theme['borderRadii']>;
  borderTopRightRadius?: ResponsiveProp<keyof Theme['borderRadii']>;
  borderTopWidth?: CSS.Properties<number | string>['borderTopWidth'];
  borderWidth?: CSS.Properties<number | string>['borderWidth'];
  bottom?: SpacingProp;
  childColor?: ColorName;
  height?: SpacingProp;
  isInteractive?: boolean;
  left?: SpacingProp;
  margin?: SpacingProp;
  marginBottom?: SpacingProp;
  marginLeft?: SpacingProp;
  marginRight?: SpacingProp;
  marginTop?: SpacingProp;
  marginX?: SpacingProp;
  marginY?: SpacingProp;
  minHeight?: SpacingProp;
  padding?: SpacingProp;
  paddingBottom?: SpacingProp;
  paddingLeft?: SpacingProp;
  paddingRight?: SpacingProp;
  paddingTop?: SpacingProp;
  paddingX?: SpacingProp;
  paddingY?: SpacingProp;
  parentColor?: ColorName;
  right?: SpacingProp;
  size?: SpacingProp;
  sx?: CSSObject;
  top?: SpacingProp;
  width?: SpacingProp;
};

const StyledBox = styled.div<BoxOwnProps & { isKeyDown: boolean }>(props => {
  const getInteractiveStyles = () => {
    if (!props.isInteractive) return {};

    const foregroundColor = props.childColor
      ? props.theme.getColor(props.childColor)
      : props.theme.getForegroundColor(
          props.parentColor || props.backgroundColor,
        );

    return {
      cursor: 'pointer',
      position: 'relative',
      '&::after': {
        backgroundColor: foregroundColor,
        // borderRadius: props.theme.getBorderRadius(props.borderRadius),
        // borderBottomLeftRadius: props.theme.getBorderRadius(
        //   props.borderBottomLeftRadius,
        // ),
        // borderBottomRightRadius: props.theme.getBorderRadius(
        //   props.borderBottomRightRadius,
        // ),
        // borderTopLeftRadius: props.theme.getBorderRadius(
        //   props.borderTopLeftRadius,
        // ),
        // borderTopRightRadius: props.theme.getBorderRadius(
        //   props.borderTopRightRadius,
        // ),
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
      },
      '&:hover::after, &:focus::after': {
        opacity: isLightColor(foregroundColor || 'white') ? '0.2' : '0.1',
      },
      '&:active::after': {
        opacity: isLightColor(foregroundColor || 'white') ? '0.4' : '0.25',
      },
    };
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
      label: 'Box',
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

export const defaultBoxElement = 'div';

export const Box: PolymorphicForwardRefExoticComponent<
  BoxOwnProps,
  typeof defaultBoxElement
> = forwardRef(function Box<E extends ElementType = typeof defaultBoxElement>(
  props: BoxProps<E>,
  ref: ForwardedRef<Element>,
): JSX.Element {
  const [isKeyDown, setIsKeyDown] = useState<boolean>();
  const {
    borderRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    bottom,
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
    minHeight,
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
  const theme = useTheme();
  const borderRadiusValue = useResponsivePropValue(borderRadius);
  const borderBottomLeftRadiusValue = useResponsivePropValue(
    borderBottomLeftRadius,
  );
  const borderBottomRightRadiusValue = useResponsivePropValue(
    borderBottomRightRadius,
  );
  const borderTopLeftRadiusValue = useResponsivePropValue(borderTopLeftRadius);
  const borderTopRightRadiusValue = useResponsivePropValue(
    borderTopRightRadius,
  );
  const bottomValue = useResponsivePropValue(bottom);
  const heightValue = useResponsivePropValue(height);
  const leftValue = useResponsivePropValue(left);
  const marginValue = useResponsivePropValue(margin);
  const marginBottomValue = useResponsivePropValue(marginBottom);
  const marginLeftValue = useResponsivePropValue(marginLeft);
  const marginRightValue = useResponsivePropValue(marginRight);
  const marginTopValue = useResponsivePropValue(marginTop);
  const marginXValue = useResponsivePropValue(marginX);
  const marginYValue = useResponsivePropValue(marginY);
  const minHeightValue = useResponsivePropValue(minHeight);
  const paddingValue = useResponsivePropValue(padding);
  const paddingBottomValue = useResponsivePropValue(paddingBottom);
  const paddingLeftValue = useResponsivePropValue(paddingLeft);
  const paddingRightValue = useResponsivePropValue(paddingRight);
  const paddingTopValue = useResponsivePropValue(paddingTop);
  const paddingXValue = useResponsivePropValue(paddingX);
  const paddingYValue = useResponsivePropValue(paddingY);
  const rightValue = useResponsivePropValue(right);
  const sizeValue = useResponsivePropValue(size);
  const topValue = useResponsivePropValue(top);
  const widthValue = useResponsivePropValue(width);

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
    <StyledBox
      as={defaultBoxElement}
      borderRadius={borderRadius}
      borderBottomLeftRadius={borderBottomLeftRadius}
      borderBottomRightRadius={borderBottomRightRadius}
      borderTopLeftRadius={borderTopLeftRadius}
      borderTopRightRadius={borderTopRightRadius}
      isInteractive={isInteractive}
      isKeyDown={!!isKeyDown}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      ref={ref as ForwardedRef<HTMLDivElement>}
      style={omitBy(
        {
          borderRadius: theme.getBorderRadius(borderRadiusValue),
          borderBottomLeftRadius: theme.getBorderRadius(
            borderBottomLeftRadiusValue,
          ),
          borderBottomRightRadius: theme.getBorderRadius(
            borderBottomRightRadiusValue,
          ),
          borderTopLeftRadius: theme.getBorderRadius(borderTopLeftRadiusValue),
          borderTopRightRadius: theme.getBorderRadius(
            borderTopRightRadiusValue,
          ),
          bottom: theme.space(bottomValue),
          height: theme.space(sizeValue || heightValue),
          left: theme.space(leftValue),
          marginBottom: theme.space(
            marginBottomValue || marginYValue || marginValue,
          ),
          marginLeft: theme.space(
            marginLeftValue || marginXValue || marginValue,
          ),
          marginRight: theme.space(
            marginRightValue || marginXValue || marginValue,
          ),
          marginTop: theme.space(marginTopValue || marginYValue || marginValue),
          minHeight: theme.space(minHeightValue),
          paddingBottom: theme.space(
            paddingBottomValue || paddingYValue || paddingValue,
          ),
          paddingLeft: theme.space(
            paddingLeftValue || paddingXValue || paddingValue,
          ),
          paddingRight: theme.space(
            paddingRightValue || paddingXValue || paddingValue,
          ),
          paddingTop: theme.space(
            paddingTopValue || paddingYValue || paddingValue,
          ),
          right: theme.space(rightValue),
          top: theme.space(topValue),
          width: theme.space(sizeValue || widthValue),
          ...styleProp,
        },
        isNil,
      )}
      {...rest}
    ></StyledBox>
  );
});
