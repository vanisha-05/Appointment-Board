import {
  Search,
  CalendarDays,
  ListFilter,
  RotateCcw,
} from "lucide-react";

function FilterBar({
  filters,
  onFilterChange,
  onClear,
}) {
  const hasFilters =
    filters.search ||
    filters.date ||
    filters.status !== "All";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 lg:grid-cols-[1fr_200px_200px_auto]">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={filters.search}
            onChange={(event) =>
              onFilterChange({
                ...filters,
                search: event.target.value,
              })
            }
            placeholder="Search appointments..."
            className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="relative">
          <CalendarDays
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="date"
            value={filters.date}
            onChange={(event) =>
              onFilterChange({
                ...filters,
                date: event.target.value,
              })
            }
            className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="relative">
          <ListFilter
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={filters.status}
            onChange={(event) =>
              onFilterChange({
                ...filters,
                status: event.target.value,
              })
            }
            className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">All statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <button
          type="button"
          onClick={onClear}
          disabled={!hasFilters}
          className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCcw size={16} />
          Clear
        </button>
      </div>
    </section>
  );
}

export default FilterBar;