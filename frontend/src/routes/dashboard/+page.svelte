<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { isAuthenticated, employee, token, logout } from '$lib/stores/auth';
  import { appointments, filters, filteredAppointments } from '$lib/stores/appointments';
  import { authenticatedRequest } from '$lib/api';
  import Button from '$lib/components/Button.svelte';
  import Input from '$lib/components/Input.svelte';
  import Select from '$lib/components/Select.svelte';
  import Alert from '$lib/components/Alert.svelte';
  import Modal from '$lib/components/Modal.svelte';

  const services = ['Haircut', 'Color', 'Styling', 'Consultation'];
  
  const timeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  timeSlots.push('18:00');

  let loading = false;
  let successMessage = '';
  let errorMessage = '';
  let editingAppointment = null;
  let showEditModal = false;
  let showDeleteModal = false;
  let appointmentToDelete = null;
  let editData = {};
  let errors = {};

  const today = new Date().toISOString().split('T')[0];

  onMount(async () => {
    if (!$isAuthenticated) {
      goto('/login');
      return;
    }
    
    await loadAppointments();
  });

  async function loadAppointments() {
    loading = true;
    errorMessage = '';

    try {
      const data = await authenticatedRequest('/api/afspraken', $token, {
        method: 'GET'
      });
      
      appointments.set(data);
    } catch (error) {
      errorMessage = error.message || 'Kan afspraken niet laden';
      if (error.message.includes('token')) {
        logout();
        goto('/login');
      }
    } finally {
      loading = false;
    }
  }

  function handleLogout() {
    logout();
    goto('/login');
  }

  function clearFilters() {
    filters.set({ name: '', date: '', service: '' });
  }

  function openEditModal(appointment) {
    editingAppointment = appointment;
    editData = { ...appointment };
    showEditModal = true;
    errors = {};
  }

  function closeEditModal() {
    showEditModal = false;
    editingAppointment = null;
    editData = {};
    errors = {};
  }

  function validateEditForm() {
    errors = {};
    
    if (!editData.customer_name || editData.customer_name.trim().length < 2) {
      errors.customer_name = 'Naam moet minimaal 2 karakters zijn';
    }
    
    if (!editData.email) {
      errors.email = 'Email is verplicht';
    }
    
    if (!editData.date) {
      errors.date = 'Datum is verplicht';
    }
    
    if (!editData.time) {
      errors.time = 'Tijd is verplicht';
    }
    
    if (!editData.service) {
      errors.service = 'Selecteer een dienst';
    }
    
    return Object.keys(errors).length === 0;
  }

  async function handleUpdate() {
    errorMessage = '';
    successMessage = '';
    
    if (!validateEditForm()) {
      return;
    }

    loading = true;

    try {
      await authenticatedRequest(`/api/employee/afspraken/${editingAppointment.id}`, $token, {
        method: 'PUT',
        body: JSON.stringify(editData)
      });

      successMessage = 'Afspraak succesvol bijgewerkt';
      closeEditModal();
      await loadAppointments();
    } catch (error) {
      errorMessage = error.message || 'Fout bij bijwerken van afspraak';
    } finally {
      loading = false;
    }
  }

  function openDeleteModal(appointment) {
    appointmentToDelete = appointment;
    showDeleteModal = true;
  }

  function closeDeleteModal() {
    showDeleteModal = false;
    appointmentToDelete = null;
  }

  async function handleDelete() {
    loading = true;
    errorMessage = '';

    try {
      await authenticatedRequest(`/api/employee/afspraken/${appointmentToDelete.id}`, $token, {
        method: 'DELETE'
      });

      successMessage = 'Afspraak succesvol verwijderd';
      closeDeleteModal();
      await loadAppointments();
    } catch (error) {
      errorMessage = error.message || 'Fout bij verwijderen van afspraak';
    } finally {
      loading = false;
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-NL', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
</script>

<svelte:head>
  <title>Dashboard - AfspraakPlanner</title>
</svelte:head>

<section class="py-8 bg-gray-50 min-h-screen">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900">Dashboard</h1>
        <p class="text-gray-600 mt-1">Welkom terug, {$employee?.name}</p>
      </div>
      
      <Button variant="secondary" on:click={handleLogout}>
        Uitloggen
      </Button>
    </div>

    {#if successMessage}
      <Alert type="success" message={successMessage} />
    {/if}
    
    {#if errorMessage}
      <Alert type="error" message={errorMessage} />
    {/if}

    <!-- Filters -->
    <div class="card mb-8">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Filter afspraken</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label for="filter-name" class="label">Naam</label>
          <input
            id="filter-name"
            type="text"
            bind:value={$filters.name}
            placeholder="Zoek op naam..."
            class="input"
          />
        </div>

        <div>
          <label for="filter-date" class="label">Datum</label>
          <input
            id="filter-date"
            type="date"
            bind:value={$filters.date}
            class="input"
          />
        </div>

        <div>
          <label for="filter-service" class="label">Dienst</label>
          <select
            id="filter-service"
            bind:value={$filters.service}
            class="input"
          >
            <option value="">Alle diensten</option>
            {#each services as service}
              <option value={service}>{service}</option>
            {/each}
          </select>
        </div>

        <div class="flex items-end">
          <Button variant="secondary" fullWidth on:click={clearFilters}>
            Filters wissen
          </Button>
        </div>
      </div>
    </div>

    <!-- Appointments List -->
    <div class="card">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-gray-900">
          Afspraken ({$filteredAppointments.length})
        </h2>
        <button
          on:click={loadAppointments}
          class="text-primary-600 hover:text-primary-700 text-sm font-medium"
          disabled={loading}
        >
          {loading ? 'Laden...' : 'Vernieuwen'}
        </button>
      </div>

      {#if loading && $appointments.length === 0}
        <div class="text-center py-12">
          <p class="text-gray-600">Afspraken laden...</p>
        </div>
      {:else if $filteredAppointments.length === 0}
        <div class="text-center py-12">
          <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="text-gray-600">Geen afspraken gevonden</p>
        </div>
      {:else}
        <!-- Desktop Table -->
        <div class="hidden md:block overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Naam</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Datum</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Tijd</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Dienst</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Acties</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              {#each $filteredAppointments as appointment}
                <tr class="hover:bg-gray-50">
                  <td class="px-4 py-4 text-sm text-gray-900">{appointment.id}</td>
                  <td class="px-4 py-4 text-sm text-gray-900">{appointment.customer_name}</td>
                  <td class="px-4 py-4 text-sm text-gray-600">{appointment.email}</td>
                  <td class="px-4 py-4 text-sm text-gray-900">{formatDate(appointment.date)}</td>
                  <td class="px-4 py-4 text-sm text-gray-900">{appointment.time}</td>
                  <td class="px-4 py-4">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {appointment.service}
                    </span>
                  </td>
                  <td class="px-4 py-4 text-sm">
                    <div class="flex gap-2">
                      <button
                        on:click={() => openEditModal(appointment)}
                        class="text-primary-600 hover:text-primary-800 font-medium"
                      >
                        Bewerken
                      </button>
                      <button
                        on:click={() => openDeleteModal(appointment)}
                        class="text-red-600 hover:text-red-800 font-medium"
                      >
                        Verwijderen
                      </button>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>

        <!-- Mobile Cards -->
        <div class="md:hidden space-y-4">
          {#each $filteredAppointments as appointment}
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <p class="font-semibold text-gray-900">{appointment.customer_name}</p>
                  <p class="text-sm text-gray-600">{appointment.email}</p>
                </div>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {appointment.service}
                </span>
              </div>
              
              <div class="space-y-1 mb-3">
                <p class="text-sm text-gray-600">
                  <strong>Datum:</strong> {formatDate(appointment.date)}
                </p>
                <p class="text-sm text-gray-600">
                  <strong>Tijd:</strong> {appointment.time}
                </p>
                {#if appointment.remarks}
                  <p class="text-sm text-gray-600">
                    <strong>Opmerkingen:</strong> {appointment.remarks}
                  </p>
                {/if}
              </div>

              <div class="flex gap-2">
                <button
                  on:click={() => openEditModal(appointment)}
                  class="flex-1 px-3 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Bewerken
                </button>
                <button
                  on:click={() => openDeleteModal(appointment)}
                  class="flex-1 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Verwijderen
                </button>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>

<!-- Edit Modal -->
<Modal 
  show={showEditModal} 
  title="Afspraak bewerken"
  onClose={closeEditModal}
>
  <form on:submit|preventDefault={handleUpdate}>
    <Input
      type="text"
      name="customer_name"
      label="Naam"
      bind:value={editData.customer_name}
      error={errors.customer_name}
      required
    />

    <Input
      type="email"
      name="email"
      label="Email"
      bind:value={editData.email}
      error={errors.email}
      required
    />

    <div class="grid grid-cols-2 gap-4">
      <Input
        type="date"
        name="date"
        label="Datum"
        bind:value={editData.date}
        error={errors.date}
        required
        min={today}
      />

      <div class="mb-4">
        <label for="edit-time" class="label">
          Tijd <span class="text-red-500">*</span>
        </label>
        <select
          id="edit-time"
          bind:value={editData.time}
          class="input"
          class:input-error={errors.time}
          required
        >
          {#each timeSlots as slot}
            <option value={slot}>{slot}</option>
          {/each}
        </select>
        {#if errors.time}
          <p class="error-text">{errors.time}</p>
        {/if}
      </div>
    </div>

    <Select
      name="service"
      label="Dienst"
      options={services}
      bind:value={editData.service}
      error={errors.service}
      required
    />

    <div class="mb-6">
      <label for="edit-remarks" class="label">Opmerkingen</label>
      <textarea
        id="edit-remarks"
        bind:value={editData.remarks}
        rows="3"
        class="input"
        maxlength="500"
      ></textarea>
    </div>

    <div class="flex gap-3">
      <Button 
        type="submit" 
        variant="primary" 
        fullWidth
        disabled={loading}
      >
        {loading ? 'Opslaan...' : 'Opslaan'}
      </Button>
      
      <Button 
        type="button"
        variant="secondary" 
        fullWidth
        on:click={closeEditModal}
      >
        Annuleren
      </Button>
    </div>
  </form>
</Modal>

<!-- Delete Confirmation Modal -->
<Modal 
  show={showDeleteModal} 
  title="Afspraak verwijderen"
  onClose={closeDeleteModal}
>
  {#if appointmentToDelete}
    <p class="text-gray-700 mb-2">
      Weet u zeker dat u de afspraak van <strong>{appointmentToDelete.customer_name}</strong> wilt verwijderen?
    </p>
    <p class="text-sm text-gray-600 mb-6">
      Datum: {formatDate(appointmentToDelete.date)} om {appointmentToDelete.time}
    </p>
  {/if}
  
  <div class="flex gap-3">
    <Button 
      variant="danger"
      on:click={handleDelete}
      fullWidth
      disabled={loading}
    >
      {loading ? 'Verwijderen...' : 'Ja, verwijder'}
    </Button>
    
    <Button 
      variant="secondary"
      on:click={closeDeleteModal}
      fullWidth
    >
      Annuleren
    </Button>
  </div>
</Modal>
