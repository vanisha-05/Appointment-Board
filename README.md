# Appointment Board

A simple and responsive appointment management board built for the Full Stack Developer Intern practical task.

The application allows a small team to view, add, update, complete, and cancel appointments while preventing overlapping time slots.

## Features

- View existing appointments
- Add a new appointment
- Edit scheduled appointments
- Cancel appointments
- Mark appointments as completed
- Filter appointments by date
- Filter appointments by status
- Search appointments by title or description
- Validate required fields
- Validate that the end time is after the start time
- Prevent overlapping appointments
- Keep cancelled appointments visible and clearly marked
- Show success and error messages
- Persist appointments using browser LocalStorage
- Responsive design for desktop, tablet, and mobile

## Application Flow

1. When the application opens, existing sample appointments are displayed.
2. The user can filter appointments by date or status.
3. The user can click **New Appointment** to create an appointment.
4. The user enters the title, description, date, start time, and end time.
5. The application validates the required information.
6. The application checks that the end time is after the start time.
7. The application checks whether the selected time overlaps with another active appointment.
8. If all information is valid, the appointment is added to the board.
9. Scheduled appointments can later be edited, completed, or cancelled.
10. Cancelled appointments remain visible on the board and are clearly marked as cancelled.

## Appointment Validation

The application prevents invalid appointment time ranges.

For example:

```text
10:00 - 11:00
11:00 - 12:00