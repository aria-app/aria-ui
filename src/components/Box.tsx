import { css, cx } from '@emotion/css';
import { CSSObject } from '@emotion/react';
import CSS from 'csstype';
import { isNil, omitBy } from 'lodash';
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

import { isLightColor, mergeSX } from '../helpers';
import { useResponsivePropValue, useThemeWithDefault } from '../hooks';
import { ColorName, ResponsiveProp, Spacing, Theme } from '../types';

type SpacingProp = ResponsiveProp<Spacing | undefined>;

// Component-specific props should be specified separately
export type BoxOwnProps = {
  backgroundColor?: ColorName;
  block?: boolean;
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
  grow?: boolean;
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
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
  padding?: SpacingProp;
  paddingBottom?: SpacingProp;
  paddingLeft?: SpacingProp;
  paddingRight?: SpacingProp;
  paddingTop?: SpacingProp;
  paddingX?: SpacingProp;
  paddingY?: SpacingProp;
  parentColor?: ColorName;
  right?: SpacingProp;
  shrink?: boolean;
  size?: SpacingProp;
  sx?: CSSObject;
  top?: SpacingProp;
  width?: SpacingProp;
};

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
    as,
    backgroundColor,
    block,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderBottomWidth,
    borderColor,
    borderLeftWidth,
    borderRadius,
    borderRightWidth,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderTopWidth,
    borderWidth,
    bottom,
    childColor,
    className,
    grow,
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
    onKeyDown,
    padding,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingX,
    paddingY,
    parentColor,
    right,
    shrink,
    size,
    style: styleProp = {},
    sx,
    top,
    width,
    ...rest
  } = props;
  const theme = useThemeWithDefault();
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

  const flexGrow = useMemo(() => {
    if (isNil(grow)) return undefined;

    return grow ? 1 : 0;
  }, [grow]);

  const flexShrink = useMemo(() => {
    if (isNil(shrink)) return undefined;

    return shrink ? 1 : 0;
  }, [shrink]);

  function getInteractiveStyles(): CSSObject {
    if (!isInteractive) return {};

    const foregroundColor = childColor
      ? theme.getColor(childColor)
      : theme.getForegroundColor(parentColor || backgroundColor);

    const hoveredStyles = {
      opacity: isLightColor(foregroundColor || 'white') ? '0.2' : '0.1',
    };

    const pressedStyles = {
      opacity: isLightColor(foregroundColor || 'white') ? '0.4' : '0.25',
    };

    return {
      cursor: 'pointer',
      position: 'relative',
      '&::after': {
        backgroundColor: foregroundColor,
        borderRadius: theme.getBorderRadius(borderRadiusValue),
        borderBottomLeftRadius: theme.getBorderRadius(
          borderBottomLeftRadiusValue,
        ),
        borderBottomRightRadius: theme.getBorderRadius(
          borderBottomRightRadiusValue,
        ),
        borderTopLeftRadius: theme.getBorderRadius(borderTopLeftRadiusValue),
        borderTopRightRadius: theme.getBorderRadius(borderTopRightRadiusValue),
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
      '&:hover::after, &:focus::after': hoveredStyles,
      '&:hover:active::after': pressedStyles,

      ...(isKeyDown
        ? {
            '&:focus::after': pressedStyles,
          }
        : {}),
    };
  }

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLElement>>(
    (e) => {
      if (!e.repeat && isInteractive && e.key === ' ') {
        setIsKeyDown(true);
      }
      onKeyDown?.(e);
    },
    [isInteractive, onKeyDown, setIsKeyDown],
  );

  const handleKeyUp = useCallback<KeyboardEventHandler<HTMLElement>>(() => {
    setIsKeyDown(false);
  }, [setIsKeyDown]);

  const Component = as || defaultBoxElement;

  return (
    <Component
      className={cx(css(
        mergeSX(
          {
            backgroundColor: theme.getColor(backgroundColor),
            borderColor: theme.getColor(borderColor),
            borderStyle: borderColor && 'solid',
            //----Group border widths to enable proper overriding----
            borderWidth,
            borderRightWidth,
            borderTopWidth,
            borderBottomWidth,
            borderLeftWidth,
            display: block ? 'block' : undefined,
            //-------------------------------------------------------
            label: 'Box',
          },
          getInteractiveStyles(),
          sx,
        ) as any,
      ), className)}
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
          flexGrow,
          flexShrink,
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
    />
  );
});
