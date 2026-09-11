import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

function DashboardStats({ appointments }) {
  const stats = [
    {
      title: "Total Appointments",
      value: appointments.length,
      icon: CalendarDays,
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      title: "Scheduled",
      value: appointments.filter(
        (item) => item.status === "Scheduled"
      ).length,
      icon: Clock3,
      iconStyle: "bg-amber-50 text-amber-600",
    },
    {
      title: "Completed",
      value: appointments.filter(
        (item) => item.status === "Completed"
      ).length,
      icon: CheckCircle2,
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Cancelled",
      value: appointments.filter(
        (item) => item.status === "Cancelled"
      ).length,
      icon: XCircle,
      iconStyle: "bg-red-50 text-red-600",
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconStyle}`}
              >
                <Icon size={21} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default DashboardStats;