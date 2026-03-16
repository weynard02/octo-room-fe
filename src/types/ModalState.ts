export interface ModalAlertState {
  show: boolean;
  title: string;
  message: string;
  onClose?: () => void;
  confirmLabel?: string;
  onConfirm?: () => void;
}


export const initialModalAlertState: ModalAlertState = {
  show: false,
  title: "",
  message: "",
};
