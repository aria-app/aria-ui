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

import { useResponsivePropValue } from '../hooks';
import { ColorName, ResponsiveProp, Spacing, Theme } from '../types';

type SpacingProp = ResponsiveProp<Spacing | undefined>;

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
  bottom?: SpacingProp;
  component?: ElementType;
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
  padding?: SpacingProp;
  paddingBottom?: SpacingProp;
  paddingLeft?: SpacingProp;
  paddingRight?: SpacingProp;
  paddingTop?: SpacingProp;
  paddingX?: SpacingProp;
  paddingY?: SpacingProp;
  right?: SpacingProp;
  size?: SpacingProp;
  sx?: CSSObject;
  top?: SpacingProp;
  width?: SpacingProp;
};

const StyledBox = styled.div<BoxOwnProps & { isKeyDown: boolean }>(props => {
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
    component = defaultElement,
    isInteractive,
    style: styleProp = {},
    ...rest
  } = props;
  const theme = useTheme();
  const bottomValue = useResponsivePropValue(props.bottom);
  const heightValue = useResponsivePropValue(props.height);
  const leftValue = useResponsivePropValue(props.left);
  const marginValue = useResponsivePropValue(props.margin);
  const marginBottomValue = useResponsivePropValue(props.marginBottom);
  const marginLeftValue = useResponsivePropValue(props.marginLeft);
  const marginRightValue = useResponsivePropValue(props.marginRight);
  const marginTopValue = useResponsivePropValue(props.marginTop);
  const marginXValue = useResponsivePropValue(props.marginX);
  const marginYValue = useResponsivePropValue(props.marginY);
  const paddingValue = useResponsivePropValue(props.padding);
  const paddingBottomValue = useResponsivePropValue(props.paddingBottom);
  const paddingLeftValue = useResponsivePropValue(props.paddingLeft);
  const paddingRightValue = useResponsivePropValue(props.paddingRight);
  const paddingTopValue = useResponsivePropValue(props.paddingTop);
  const paddingXValue = useResponsivePropValue(props.paddingX);
  const paddingYValue = useResponsivePropValue(props.paddingY);
  const rightValue = useResponsivePropValue(props.right);
  const sizeValue = useResponsivePropValue(props.size);
  const topValue = useResponsivePropValue(props.top);
  const widthValue = useResponsivePropValue(props.width);

  const style = useMemo(
    () => ({
      bottom: theme.space(bottomValue),
      height: theme.space(sizeValue || heightValue),
      left: theme.space(leftValue),
      marginBottom: theme.space(
        marginBottomValue || marginYValue || marginValue,
      ),
      marginLeft: theme.space(marginLeftValue || marginXValue || marginValue),
      marginRight: theme.space(marginRightValue || marginXValue || marginValue),
      marginTop: theme.space(marginTopValue || marginYValue || marginValue),
      paddingBottom: theme.space(
        paddingBottomValue || paddingYValue || paddingValue,
      ),
      paddingLeft: theme.space(
        paddingLeftValue || paddingXValue || paddingValue,
      ),
      paddingRight: theme.space(
        paddingRightValue || paddingXValue || paddingValue,
      ),
      paddingTop: theme.space(paddingTopValue || paddingYValue || paddingValue),
      right: theme.space(rightValue),
      top: theme.space(topValue),
      width: theme.space(sizeValue || widthValue),
      ...styleProp,
    }),
    [
      bottomValue,
      heightValue,
      leftValue,
      marginBottomValue,
      marginLeftValue,
      marginRightValue,
      marginTopValue,
      marginValue,
      marginXValue,
      marginYValue,
      paddingBottomValue,
      paddingLeftValue,
      paddingRightValue,
      paddingTopValue,
      paddingValue,
      paddingXValue,
      paddingYValue,
      rightValue,
      sizeValue,
      theme,
      topValue,
      widthValue,
    ],
  );

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
      as={component}
      isInteractive={isInteractive}
      isKeyDown={!!isKeyDown}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      ref={ref as ForwardedRef<HTMLDivElement>}
      style={style}
      {...rest}
    ></StyledBox>
  );
});
