import { useState } from "react";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import FilterBar from "./components/FilterBar";
import AppointmentCard from "./components/AppointmentCard";
import AppointmentForm from "./components/AppointmentForm";
import ConfirmationModal from "./components/ConfirmationModal";
import Toast from "./components/Toast";
import EmptyState from "./components/EmptyState";
import sampleAppointments from "./data/sampleAppointments";
import { hasTimeConflict } from "./utils/appointmentUtils";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [appointments, setAppointments] = useLocalStorage(
    "appointment-board-appointments",
    sampleAppointments
  );

  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    date: "",
    status: "All",
  });

  const [appointmentToCancel, setAppointmentToCancel] =
    useState(null);

  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleAddAppointment = (appointment) => {
    if (hasTimeConflict(appointments, appointment)) {
      return {
        success: false,
        message:
          "This time slot conflicts with an existing appointment.",
      };
    }

    const newAppointment = {
      ...appointment,
      id: Date.now(),
    };

    setAppointments((current) => [
      ...current,
      newAppointment,
    ]);

    showToast("Appointment created successfully.");

    return { success: true };
  };

  const handleUpdateAppointment = (updatedAppointment) => {
    if (
      hasTimeConflict(
        appointments,
        updatedAppointment,
        updatedAppointment.id
      )
    ) {
      return {
        success: false,
        message:
          "This time slot conflicts with an existing appointment.",
      };
    }

    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === updatedAppointment.id
          ? updatedAppointment
          : appointment
      )
    );

    showToast("Appointment updated successfully.");

    return { success: true };
  };

  const handleCompleteAppointment = (id) => {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "Completed" }
          : appointment
      )
    );

    showToast("Appointment marked as completed.");
  };

  const confirmCancelAppointment = () => {
    if (!appointmentToCancel) return;

    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === appointmentToCancel.id
          ? { ...appointment, status: "Cancelled" }
          : appointment
      )
    );

    showToast("Appointment cancelled.", "info");
    setAppointmentToCancel(null);
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setShowForm(true);
  };

  const handleNewAppointment = () => {
    setEditingAppointment(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingAppointment(null);
  };

  const filteredAppointments = appointments.filter(
    (appointment) => {
      const matchesSearch =
        appointment.title
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        appointment.description
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      const matchesDate =
        !filters.date ||
        appointment.date === filters.date;

      const matchesStatus =
        filters.status === "All" ||
        appointment.status === filters.status;

      return (
        matchesSearch &&
        matchesDate &&
        matchesStatus
      );
    }
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onNewAppointment={handleNewAppointment} />

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <DashboardStats appointments={appointments} />

        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          onClear={() =>
            setFilters({
              search: "",
              date: "",
              status: "All",
            })
          }
        />

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Appointments
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredAppointments.length} appointment
              {filteredAppointments.length !== 1 ? "s" : ""}{" "}
              found
            </p>
          </div>
        </div>

        {filteredAppointments.length > 0 ? (
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onEdit={handleEdit}
                onComplete={handleCompleteAppointment}
                onCancel={setAppointmentToCancel}
              />
            ))}
          </section>
        ) : (
          <EmptyState onNewAppointment={handleNewAppointment} />
        )}
      </main>

      {showForm && (
        <AppointmentForm
          appointment={editingAppointment}
          onClose={handleCloseForm}
          onAdd={
            editingAppointment
              ? handleUpdateAppointment
              : handleAddAppointment
          }
        />
      )}

      {appointmentToCancel && (
        <ConfirmationModal
          title="Cancel appointment?"
          message={`Are you sure you want to cancel "${appointmentToCancel.title}"? The appointment will remain visible on the board.`}
          confirmText="Yes, cancel"
          onConfirm={confirmCancelAppointment}
          onCancel={() => setAppointmentToCancel(null)}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
        />
      )}
    </div>
  );
}

export default App;