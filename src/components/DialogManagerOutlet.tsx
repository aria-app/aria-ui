import { set } from 'lodash';
import React, { FC, MouseEventHandler, useCallback, useMemo } from 'react';

import { useDialogManager } from '../hooks';
import { Dialog } from './Dialog';

export interface DialogManagerDialogProps {
  canCancel?: boolean;
  cancelText?: string;
  confirmText?: string;
  id: string;
  isOpen: boolean;
  title?: string;
  message?: string;
  onCloseComplete: (id: string) => void;
  onResolve: (id: string, result?: boolean) => void;
}

const DialogManagerDialog = ({
  canCancel,
  cancelText,
  confirmText: confirmTextProp,
  id,
  isOpen,
  message,
  onCloseComplete,
  onResolve,
  title,
}: DialogManagerDialogProps) => {
  const confirmText = useMemo<string>(() => {
    if (confirmTextProp) return confirmTextProp;

    return canCancel ? 'Confirm' : 'Dismiss';
  }, [canCancel, confirmTextProp]);

  const handleCancel = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    onResolve?.(id, false);
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
      onCancel={canCancel ? handleCancel : undefined}
      onConfirm={handleConfirm}
      onCloseComplete={handleCloseComplete}
      title={title}
    >
      {message}
    </Dialog>
  );
};

export type DialogManagerOutletProps = Record<string, never>;

export const DialogManagerOutlet: FC<DialogManagerOutletProps> = () => {
  const { configs, setConfigs } = useDialogManager();

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
        ({
          canCancel,
          cancelText,
          confirmText,
          id,
          isOpen,
          message,
          title,
        }) => (
          <DialogManagerDialog
            canCancel={canCancel}
            cancelText={cancelText}
            confirmText={confirmText}
            id={id}
            isOpen={isOpen}
            key={id}
            message={message}
            onCloseComplete={handleDialogCloseComplete}
            onResolve={handleDialogResolve}
            title={title}
          />
        ),
      )}
    </>
  );
};
