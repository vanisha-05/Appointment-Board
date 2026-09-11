import { CalendarPlus, CalendarDays } from "lucide-react";

function Header({ onNewAppointment }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <CalendarDays size={23} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Appointment Board
            </h1>

            <p className="hidden text-sm text-slate-500 sm:block">
              Manage your appointments efficiently.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onNewAppointment}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
        >
          <CalendarPlus size={18} />
          <span className="hidden sm:inline">
            New Appointment
          </span>
          <span className="sm:hidden">New</span>
        </button>
      </div>
    </header>
  );
}

export default Header;