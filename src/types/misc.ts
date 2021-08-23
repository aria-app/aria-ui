export type DialogFocusedButton = 'cancel' | 'confirm';

export interface DialogManagerConfig {
  canCancel?: boolean;
  cancelText?: string;
  confirmText?: string;
  focusedButton?: DialogFocusedButton;
  id: string;
  isOpen: boolean;
  message?: string;
  onResolve: (result?: boolean) => void;
  title?: string;
}

export interface DialogManagerPromptOptions {
  canCancel?: boolean;
  cancelText?: string;
  confirmText?: string;
  focusedButton?: DialogFocusedButton;
  message?: string;
  title?: string;
}

export interface SnackbarManagerAddSnackbarOptions {
  message: string;
  status?: Status;
}

export interface SnackbarManagerConfig {
  id: string;
  message: string;
  status?: Status;
}

export type Status = 'error' | 'info' | 'success' | 'warning';
