export interface ImperativeDialogAlertOptions {
  confirmText?: string;
  message?: string;
  title?: string;
}

export interface ImperativeDialogConfig {
  cancelText?: string;
  confirmText?: string;
  id: string;
  isOpen: boolean;
  message?: string;
  onResolve: (result?: boolean) => void;
  title?: string;
  variant?: 'alert' | 'confirm';
}

export interface ImperativeDialogConfirmOptions {
  cancelText?: string;
  confirmText?: string;
  message?: string;
  title?: string;
}

export interface SnackbarManagerConfig {
  id: number;
  message: string;
  status?: Status;
}

export type Status = 'error' | 'info' | 'success' | 'warning';
