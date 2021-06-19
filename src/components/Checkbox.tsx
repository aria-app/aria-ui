import CheckIcon from 'mdi-react/CheckIcon';
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
import { Icon } from './Icon';
import { MotionBox } from './MotionBox';
import { Stack } from './Stack';
import { Text } from './Text';

export type CheckboxLabelSide = 'left' | 'right';

export interface CheckboxProps extends BoxProps<'div'> {
  disabled?: boolean;
  id?: string;
  isChecked?: boolean;
  label?: string;
  labelSide?: CheckboxLabelSide;
  onIsCheckedChange?: (
    isChecked: boolean,
    e: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>,
  ) => void;
}

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  function Checkbox(props, ref) {
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
            label: 'Checkbox',
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
            borderRadius="md"
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
              initial={false}
            >
              <Icon
                block
                color="brandPrimary"
                colorIsBackground
                icon={<CheckIcon />}
                size="sm"
              />
            </MotionBox>
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
