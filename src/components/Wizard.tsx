import React, {
  Children,
  forwardRef,
  MouseEventHandler,
  useCallback,
  useMemo,
} from 'react';

import { WizardContext } from '../contexts';
import { mergeSX } from '../helpers';
import { Box, BoxProps } from './Box';
import { Button } from './Button';

export interface WizardProps extends BoxProps<'div'> {
  currentIndex?: number;
  finishText?: string;
  onCurrentIndexChange?: (index: number) => void;
  onFinish?: MouseEventHandler<HTMLButtonElement>;
}

export const Wizard = forwardRef<HTMLDivElement, WizardProps>(function Wizard(
  props,
  ref,
) {
  const {
    children,
    currentIndex = 0,
    finishText = 'Finish',
    onCurrentIndexChange,
    onFinish,
    sx,
    ...rest
  } = props;

  const stepCount = useMemo(
    () => Children.toArray(children).length,
    [children],
  );

  const isOnFirstStep = currentIndex <= 0;

  const isOnLastStep = currentIndex >= stepCount - 1;

  const handleGoBack = useCallback(() => {
    if (isOnFirstStep) return;

    onCurrentIndexChange?.(currentIndex - 1);
  }, [currentIndex, isOnFirstStep, onCurrentIndexChange]);

  const handleGoForward = useCallback(() => {
    if (isOnLastStep) return;

    onCurrentIndexChange?.(currentIndex + 1);
  }, [currentIndex, isOnLastStep, onCurrentIndexChange]);

  const handleGoToIndex = useCallback<(index: number) => void>(
    (index) => {
      if (index === currentIndex) return;

      if (index < 0 || index > stepCount - 1) {
        throw new Error(
          'Tried to navigate to a Wizard step that does not exist.',
        );
      }

      onCurrentIndexChange?.(index);
    },
    [currentIndex, onCurrentIndexChange, stepCount],
  );

  const wizardOptions = useMemo(
    () => ({
      currentIndex,
      goBack: handleGoBack,
      goForward: handleGoForward,
      goToIndex: handleGoToIndex,
      stepCount,
    }),
    [currentIndex, handleGoBack, handleGoForward, handleGoToIndex, stepCount],
  );

  return (
    <Box
      as="div"
      ref={ref}
      sx={mergeSX(
        {
          label: 'Wizard',
        },
        sx,
      )}
      {...rest}
    >
      <WizardContext.Provider value={wizardOptions}>
        <Box>
          {children}
          <Box sx={{ display: 'flex' }}>
            {!isOnFirstStep && (
              <Button onClick={handleGoBack} text="Back" variant="minimal" />
            )}
            {!isOnLastStep && (
              <Button
                marginLeft="auto"
                onClick={handleGoForward}
                text="Next"
                variant="contained"
              />
            )}
            {isOnLastStep && onFinish && (
              <Button
                marginLeft="auto"
                onClick={onFinish}
                text={finishText}
                variant="contained"
              />
            )}
          </Box>
        </Box>
      </WizardContext.Provider>
    </Box>
  );
});
