import { set } from 'lodash';
import React, { FC, MouseEventHandler, useCallback, useMemo } from 'react';

import { useImperativeDialog } from '../hooks';
import { Dialog } from './Dialog';

export type ImperativeDialogOutletProps = Record<string, never>;

export interface ImperativeDialogProps {
  cancelText?: string;
  confirmText?: string;
  id: string;
  isOpen: boolean;
  title?: string;
  message?: string;
  onCloseComplete: (id: string) => void;
  onResolve: (id: string, result?: boolean) => void;
  variant?: 'alert' | 'confirm';
}

const ImperativeDialog = ({
  cancelText,
  confirmText: confirmTextProp,
  id,
  isOpen,
  message,
  onCloseComplete,
  onResolve,
  title,
  variant = 'alert',
}: ImperativeDialogProps) => {
  const confirmText = useMemo<string>(() => {
    if (confirmTextProp) return confirmTextProp;

    return variant === 'confirm' ? 'Confirm' : 'Dismiss';
  }, [confirmTextProp, variant]);

  const handleCancel = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    onResolve?.(id, false);
  }, [id, onResolve]);

  const handleClose = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    onResolve?.(id);
  }, [id, onResolve]);

  const handleCloseComplete = useCallback<() => void>(() => {
    onCloseComplete?.(id);
  }, [id, onCloseComplete]);

  const handleConfirm = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    onResolve?.(id, true);
  }, [id, onResolve]);

  return (
    <Dialog
      cancelText={cancelText}
      confirmText={confirmText}
      isOpen={isOpen}
      key={id}
      onCancel={variant === 'confirm' ? handleCancel : undefined}
      onConfirm={variant === 'confirm' ? handleConfirm : handleClose}
      onCloseComplete={handleCloseComplete}
      title={title}
    >
      {message}
    </Dialog>
  );
};

export const ImperativeDialogOutlet: FC<ImperativeDialogOutletProps> = () => {
  const { configs, setConfigs } = useImperativeDialog();

  const handleDialogCloseComplete = useCallback<(id: string) => void>(
    (id) => {
      setConfigs(configs.filter((config) => config.id !== id));
    },
    [configs, setConfigs],
  );

  const handleDialogResolve = useCallback<
    (id: string, result?: boolean) => void
  >(
    (id, result) => {
      const config = configs.find((config) => config.id === id);

      config?.onResolve(result);

      setConfigs(
        configs.map((config) =>
          config.id === id ? set(config, 'isOpen', false) : config,
        ),
      );
    },
    [configs, setConfigs],
  );

  return (
    <>
      {configs.map(
        ({ cancelText, confirmText, id, isOpen, message, title, variant }) => (
          <ImperativeDialog
            cancelText={cancelText}
            confirmText={confirmText}
            id={id}
            isOpen={isOpen}
            key={id}
            message={message}
            onCloseComplete={handleDialogCloseComplete}
            onResolve={handleDialogResolve}
            title={title}
            variant={variant}
          />
        ),
      )}
    </>
  );
};
