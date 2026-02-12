import { writable, derived } from 'svelte/store';

export const appointments = writable([]);
export const filters = writable({
  name: '',
  date: '',
  service: ''
});

export const filteredAppointments = derived(
  [appointments, filters],
  ([$appointments, $filters]) => {
    return $appointments.filter(appointment => {
      const nameMatch = !$filters.name || 
        appointment.customer_name.toLowerCase().includes($filters.name.toLowerCase());
      const dateMatch = !$filters.date || appointment.date === $filters.date;
      const serviceMatch = !$filters.service || appointment.service === $filters.service;
      
      return nameMatch && dateMatch && serviceMatch;
    });
  }
);
