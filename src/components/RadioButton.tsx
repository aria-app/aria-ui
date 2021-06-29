import React, {
  forwardRef,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  useImperativeHandle,
  useRef,
} from 'react';

import { mergeSX } from '../helpers';
import { useThemeWithDefault } from '../hooks';
import { Box, BoxProps } from './Box';
import { MotionBox } from './MotionBox';
import { Stack } from './Stack';
import { Text } from './Text';

export type RadioButtonOnSelect = (
  value: any,
  e: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>,
) => void;

export interface RadioButtonProps extends Omit<BoxProps<'div'>, 'onSelect'> {
  disabled?: boolean;
  id?: string;
  isChecked?: boolean;
  label?: string;
  onSelect?: RadioButtonOnSelect;
  value?: any;
}

export const RadioButton = forwardRef<HTMLDivElement, RadioButtonProps>(
  function RadioButton(props, ref) {
    const {
      disabled,
      id,
      isChecked = false,
      label,
      onSelect,
      sx,
      value,
      ...rest
    } = props;
    const elementRef = useRef<HTMLDivElement>(null);
    const theme = useThemeWithDefault();

    useImperativeHandle(ref, () => elementRef.current as HTMLDivElement);

    const handleClick: MouseEventHandler<HTMLDivElement> = e => {
      if (isChecked || disabled) return;
      onSelect?.(value, e);
    };

    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
      if (isChecked || disabled || e.repeat || e.key !== ' ') return;
      onSelect?.(value, e);
    };

    return (
      <Box
        aria-checked={isChecked}
        as="div"
        borderRadius="md"
        childColor="brandContrast"
        isInteractive={!disabled}
        marginBottom={-2}
        marginX={-2}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        padding={2}
        ref={elementRef}
        role="radio"
        sx={mergeSX(
          {
            cursor: disabled ? 'not-allowed' : 'pointer',
            label: 'RadioButton',
            opacity: disabled ? theme.disabledOpacity : undefined,
            outline: 'none',
          },
          sx,
        )}
        tabIndex={disabled ? -1 : 0}
        {...rest}
      >
        <Stack align="start" direction="row" space={4}>
          <MotionBox
            animate={
              isChecked
                ? { backgroundColor: theme.colors.brandPrimary }
                : { backgroundColor: theme.colors.textSecondary }
            }
            borderRadius="full"
            initial={false}
            size={5}
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexShrink: 0,
              justifyContent: 'center',
            }}
          >
            <MotionBox
              animate={
                isChecked ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
              }
              backgroundColor={theme.getForegroundColor('brandPrimary')}
              borderRadius="full"
              initial={false}
              size={2}
            />
          </MotionBox>
          {label && (
            <Text marginTop={1} variant="label">
              {label}
            </Text>
          )}
        </Stack>
      </Box>
    );
  },
);
