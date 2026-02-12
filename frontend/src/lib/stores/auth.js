import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Get token from localStorage if in browser
const storedToken = browser ? localStorage.getItem('token') : null;
const storedEmployee = browser ? JSON.parse(localStorage.getItem('employee') || 'null') : null;

export const token = writable(storedToken);
export const employee = writable(storedEmployee);
export const isAuthenticated = writable(!!storedToken);

// Subscribe to token changes and update localStorage
token.subscribe(value => {
  if (browser) {
    if (value) {
      localStorage.setItem('token', value);
    } else {
      localStorage.removeItem('token');
    }
  }
  isAuthenticated.set(!!value);
});

// Subscribe to employee changes and update localStorage
employee.subscribe(value => {
  if (browser) {
    if (value) {
      localStorage.setItem('employee', JSON.stringify(value));
    } else {
      localStorage.removeItem('employee');
    }
  }
});

export function login(newToken, employeeData) {
  token.set(newToken);
  employee.set(employeeData);
}

export function logout() {
  token.set(null);
  employee.set(null);
}
