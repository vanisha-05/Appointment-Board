import {
  CheckCircle2,
  Info,
} from "lucide-react";

function Toast({ message, type = "success" }) {
  const isInfo = type === "info";

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex max-w-sm items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl">
      <div
        className={
          isInfo
            ? "text-blue-600"
            : "text-emerald-600"
        }
      >
        {isInfo ? (
          <Info size={20} />
        ) : (
          <CheckCircle2 size={20} />
        )}
      </div>

      <p className="text-sm font-medium text-slate-700">
        {message}
      </p>
    </div>
  );
}

export default Toast;