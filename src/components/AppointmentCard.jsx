import {
  CalendarDays,
  Clock3,
  Pencil,
  Check,
  X,
} from "lucide-react";

function AppointmentCard({
  appointment,
  onEdit,
  onComplete,
  onCancel,
}) {
  const isScheduled =
    appointment.status === "Scheduled";

  const statusStyles = {
    Scheduled:
      "bg-blue-50 text-blue-700 ring-blue-600/10",
    Completed:
      "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
    Cancelled:
      "bg-red-50 text-red-700 ring-red-600/10",
  };

  return (
    <article
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
        appointment.status === "Cancelled"
          ? "opacity-85"
          : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold text-slate-900">
            {appointment.title}
          </h3>

          <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-slate-500">
            {appointment.description ||
              "No description provided."}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
            statusStyles[appointment.status]
          }`}
        >
          {appointment.status}
        </span>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <CalendarDays
            size={17}
            className="text-slate-400"
          />
          <span>{appointment.date}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <Clock3
            size={17}
            className="text-slate-400"
          />
          <span>
            {appointment.startTime} –{" "}
            {appointment.endTime}
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-5">
        <button
          type="button"
          onClick={() => onEdit(appointment)}
          disabled={!isScheduled}
          className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Pencil size={15} />
          Edit
        </button>

        <button
          type="button"
          onClick={() => onComplete(appointment.id)}
          disabled={!isScheduled}
          className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Check size={15} />
          Complete
        </button>

        <button
          type="button"
          onClick={() => onCancel(appointment)}
          disabled={!isScheduled}
          className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <X size={15} />
          Cancel
        </button>
      </div>

      {appointment.status === "Completed" && (
        <div className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
          This appointment has been completed.
        </div>
      )}

      {appointment.status === "Cancelled" && (
        <div className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
          This appointment has been cancelled.
        </div>
      )}
    </article>
  );
}

export default AppointmentCard;