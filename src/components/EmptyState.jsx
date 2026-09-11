import {
  CalendarX2,
  Plus,
} from "lucide-react";

function EmptyState({ onNewAppointment }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <CalendarX2 size={25} />
      </div>

      <h3 className="mt-4 text-lg font-bold text-slate-800">
        No appointments found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
        Try changing your filters or create a new
        appointment.
      </p>

      <button
        type="button"
        onClick={onNewAppointment}
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
      >
        <Plus size={17} />
        New Appointment
      </button>
    </div>
  );
}

export default EmptyState;