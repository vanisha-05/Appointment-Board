import { AlertTriangle, X } from "lucide-react";

function ConfirmationModal({
  title,
  message,
  confirmText,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertTriangle size={21} />
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-bold text-slate-900">
              {title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {message}
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-700"
          >
            <X size={19} />
          </button>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Keep Appointment
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;