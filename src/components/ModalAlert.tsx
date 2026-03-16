import { Button } from "./Button";

export const ModalAlert = ({
  title,
  message,
  onClose,
  confirmLabel,
  onConfirm,
}: {
  title: string;
  message: string;
  onClose: () => void;
  confirmLabel?: string;
  onConfirm?: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4 animate-fade-in">
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600">{message}</p>
        </div>
        <div className="flex gap-3 justify-center">
          <Button
            variant={onConfirm ? "outline" : "primary"}
            onClick={onClose}
            className="w-full"
          >
            {onConfirm ? "Cancel" : "Close"}
          </Button>
          {onConfirm && (
            <Button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {confirmLabel || "Confirm"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
