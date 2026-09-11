import { useEffect, useState } from "react";
import {
  X,
  CalendarDays,
  Clock3,
} from "lucide-react";

const initialForm = {
  title: "",
  description: "",
  date: "",
  startTime: "",
  endTime: "",
};

function AppointmentForm({
  appointment,
  onClose,
  onAdd,
}) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const isEditing = Boolean(appointment);

  useEffect(() => {
    if (appointment) {
      setForm({
        title: appointment.title || "",
        description: appointment.description || "",
        date: appointment.date || "",
        startTime: appointment.startTime || "",
        endTime: appointment.endTime || "",
      });
    } else {
      setForm(initialForm);
    }

    setError("");
  }, [appointment]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.title.trim() ||
      !form.date ||
      !form.startTime ||
      !form.endTime
    ) {
      setError(
        "Please complete all required fields."
      );
      return;
    }

    if (form.endTime <= form.startTime) {
      setError(
        "End time must be after the start time."
      );
      return;
    }

    const appointmentData = {
      ...(appointment || {}),
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      status: appointment?.status || "Scheduled",
    };

    const result = onAdd(appointmentData);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setForm(initialForm);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="max-h-[95vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {isEditing
                ? "Edit Appointment"
                : "New Appointment"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isEditing
                ? "Update the appointment details."
                : "Schedule a new appointment."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Title *
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Team Meeting"
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Add appointment details..."
              rows={3}
              className="w-full resize-none rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Date *
            </label>

            <div className="relative">
              <CalendarDays
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Start time *
              </label>

              <div className="relative">
                <Clock3
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="time"
                  name="startTime"
                  value={form.startTime}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                End time *
              </label>

              <div className="relative">
                <Clock3
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="time"
                  name="endTime"
                  value={form.endTime}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
            >
              {isEditing
                ? "Save Changes"
                : "Add Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppointmentForm;