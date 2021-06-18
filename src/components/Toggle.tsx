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

export type ToggleLabelSide = 'left' | 'right';

export interface ToggleProps extends BoxProps<'div'> {
  disabled?: boolean;
  id?: string;
  isChecked?: boolean;
  label?: string;
  labelSide?: ToggleLabelSide;
  onIsCheckedChange?: (
    isChecked: boolean,
    e: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>,
  ) => void;
}

export const Toggle = forwardRef<HTMLDivElement, ToggleProps>(function Toggle(
  props,
  ref,
) {
  const {
    disabled,
    id,
    isChecked = false,
    label,
    labelSide = 'right',
    onIsCheckedChange,
    sx,
    ...rest
  } = props;
  const elementRef = useRef<HTMLDivElement>(null);
  const theme = useThemeWithDefault();

  useImperativeHandle(ref, () => elementRef.current as HTMLDivElement);

  const handleClick: MouseEventHandler<HTMLDivElement> = e => {
    if (disabled) return;
    onIsCheckedChange?.(!isChecked, e);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
    if (disabled || e.repeat || e.key !== ' ') return;
    onIsCheckedChange?.(!isChecked, e);
  };

  return (
    <Box
      aria-checked={isChecked}
      as="div"
      borderRadius="md"
      childColor="brandContrast"
      isInteractive={!disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      margin={-2}
      padding={2}
      ref={elementRef}
      role="checkbox"
      sx={mergeSX(
        {
          cursor: disabled ? 'not-allowed' : 'pointer',
          label: 'Toggle',
          opacity: disabled ? 0.5 : 1,
          outline: 'none',
        },
        sx,
      )}
      tabIndex={disabled ? -1 : 0}
      {...rest}
    >
      <Stack
        align="start"
        direction={labelSide === 'right' ? 'row' : 'row-reverse'}
        space={4}
      >
        <MotionBox
          animate={
            isChecked
              ? { backgroundColor: theme.colors.brandPrimary }
              : { backgroundColor: theme.colors.textSecondary }
          }
          borderRadius="full"
          height={5}
          initial={false}
          sx={{ alignItems: 'center', display: 'flex', flexShrink: 0 }}
          width={10}
        >
          <MotionBox
            animate={isChecked ? { x: theme.space(6) } : { x: theme.space(1) }}
            backgroundColor={theme.getForegroundColor('brandPrimary')}
            borderRadius="full"
            initial={false}
            size={3}
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
});
