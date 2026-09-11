export function hasTimeConflict(
  appointments,
  newAppointment,
  excludeId = null
) {
  return appointments.some((appointment) => {
    if (appointment.status === "Cancelled") {
      return false;
    }

    if (appointment.id === excludeId) {
      return false;
    }

    if (appointment.date !== newAppointment.date) {
      return false;
    }

    return (
      newAppointment.startTime <
        appointment.endTime &&
      newAppointment.endTime >
        appointment.startTime
    );
  });
}