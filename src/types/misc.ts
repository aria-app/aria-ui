export interface DialogManagerAlertOptions {
  confirmText?: string;
  message?: string;
  title?: string;
}

export interface DialogManagerConfig {
  cancelText?: string;
  confirmText?: string;
  id: string;
  isOpen: boolean;
  message?: string;
  onResolve: (result?: boolean) => void;
  title?: string;
  variant?: 'alert' | 'confirm';
}

export interface DialogManagerConfirmOptions {
  cancelText?: string;
  confirmText?: string;
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
