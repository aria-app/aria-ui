import { merge } from 'lodash';
import React, { ChangeEvent, forwardRef } from 'react';

import { Box, BoxProps } from './Box';

export interface SelectOption<ValueType = any> {
  disabled?: boolean;
  label?: string;
  value?: ValueType;
}

export interface SelectProps extends BoxProps<'select'> {
  options?: SelectOption[];
  onValueChange?: (value: any, event: ChangeEvent<HTMLSelectElement>) => void;
  value?: any;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(props, ref) {
    const { options = [], sx, value, ...rest } = props;

    return (
      <Box
        as="select"
        onChange={x => {
          console.log(x);
        }}
        ref={ref}
        sx={merge(
          {
            label: 'Select',
          },
          sx,
        )}
        value={value}
        {...rest}
      >
        {options.map(({ label, value }) => (
          <option key={value} label={label} value={value} />
        ))}
      </Box>
    );
  },
);
