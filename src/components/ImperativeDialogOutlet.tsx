import { set, uniqueId } from 'lodash';
import React, {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Dialog } from './Dialog';

export type ImperativeDialogOutletProps = Record<string, never>;

export interface ImperativeDialogConfig {
  id: string;
  isOpen: boolean;
  title?: string;
  message?: string;
  variant?: 'alert' | 'confirm';
}

export interface ImperativeDialogProps {
  confirmText?: string;
  id: string;
  isOpen: boolean;
  title?: string;
  message?: string;
  onResolve: (id: string, result?: boolean) => void;
  variant?: 'alert' | 'confirm';
}

const ImperativeDialog = ({
  confirmText: confirmTextProp,
  id,
  isOpen,
  message,
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

  const handleConfirm = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    onResolve?.(id, true);
  }, [id, onResolve]);

  return (
    <Dialog
      confirmText={confirmText}
      isOpen={isOpen}
      key={id}
      onCancel={variant === 'confirm' ? handleCancel : undefined}
      onConfirm={variant === 'confirm' ? handleConfirm : handleClose}
      title={title}
    >
      {message}
    </Dialog>
  );
};

export const ImperativeDialogOutlet: FC<ImperativeDialogOutletProps> = () => {
  const [dialogConfigs, setDialogConfigs] = useState<ImperativeDialogConfig[]>([
    {
      id: uniqueId(),
      isOpen: true,
      message:
        'The song could not be deleted because the server is disconnected.',
      title: undefined,
    },
    {
      id: uniqueId(),
      isOpen: true,
      message:
        'The song could not be deleted because the server is disconnected.',
      title: undefined,
      variant: 'confirm',
    },
  ]);

  const handleResolve = useCallback<(id: string, result?: boolean) => void>(
    (id, result) => {
      console.log({ dialogConfigs, id, result });
      setDialogConfigs(
        dialogConfigs.map((dialogConfig) =>
          dialogConfig.id === id
            ? set(dialogConfig, 'isOpen', false)
            : dialogConfig,
        ),
      );
    },
    [dialogConfigs, setDialogConfigs],
  );

  useEffect(() => {
    if (!dialogConfigs.some(({ isOpen }) => !isOpen)) return;

    setTimeout(() => {
      setDialogConfigs(dialogConfigs.filter(({ isOpen }) => isOpen));
    }, 500);
  }, [dialogConfigs, setDialogConfigs]);

  return (
    <>
      {dialogConfigs.map(({ id, isOpen, message, title, variant }) => (
        <ImperativeDialog
          id={id}
          isOpen={isOpen}
          key={id}
          message={message}
          onResolve={handleResolve}
          title={title}
          variant={variant}
        />
      ))}
    </>
  );
};
