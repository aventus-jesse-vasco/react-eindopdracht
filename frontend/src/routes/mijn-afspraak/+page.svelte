<script>
  import Input from '$lib/components/Input.svelte';
  import Select from '$lib/components/Select.svelte';
  import Button from '$lib/components/Button.svelte';
  import Alert from '$lib/components/Alert.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { apiRequest } from '$lib/api';

  const services = ['Haircut', 'Color', 'Styling', 'Consultation'];
  
  // Time slots
  const timeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  timeSlots.push('18:00');

  let lookupData = {
    id: '',
    email: ''
  };

  let appointment = null;
  let editMode = false;
  let editData = {};
  let errors = {};
  let loading = false;
  let successMessage = '';
  let errorMessage = '';
  let showDeleteModal = false;

  const today = new Date().toISOString().split('T')[0];

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  async function lookupAppointment() {
    errorMessage = '';
    successMessage = '';
    
    if (!lookupData.id || !lookupData.email) {
      errorMessage = 'Vul zowel afspraak ID als email adres in';
      return;
    }

    loading = true;

    try {
      const data = await apiRequest(`/api/afspraken/${lookupData.id}`);
      
      // Verify email matches
      if (data.email !== lookupData.email) {
        errorMessage = 'Dit email adres komt niet overeen met deze afspraak';
        appointment = null;
      } else {
        appointment = data;
        editData = { ...data };
      }
    } catch (error) {
      errorMessage = error.message || 'Afspraak niet gevonden';
      appointment = null;
    } finally {
      loading = false;
    }
  }

  function validateEditForm() {
    errors = {};
    
    if (!editData.customer_name || editData.customer_name.trim().length < 2) {
      errors.customer_name = 'Naam moet minimaal 2 karakters zijn';
    }
    
    if (!editData.email) {
      errors.email = 'Email is verplicht';
    } else if (!validateEmail(editData.email)) {
      errors.email = 'Ongeldig email adres';
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
      errorMessage = 'Vul alle verplichte velden correct in';
      return;
    }

    loading = true;

    try {
      const response = await apiRequest(`/api/afspraken/${appointment.id}`, {
        method: 'PUT',
        body: JSON.stringify(editData)
      });

      appointment = response.appointment;
      editData = { ...response.appointment };
      editMode = false;
      successMessage = 'Afspraak succesvol bijgewerkt!';
    } catch (error) {
      errorMessage = error.message || 'Er is een fout opgetreden bij het bijwerken';
    } finally {
      loading = false;
    }
  }

  async function handleDelete() {
    loading = true;
    errorMessage = '';

    try {
      await apiRequest(`/api/afspraken/${appointment.id}`, {
        method: 'DELETE',
        body: JSON.stringify({ email: appointment.email })
      });

      successMessage = 'Afspraak succesvol geannuleerd';
      appointment = null;
      editMode = false;
      showDeleteModal = false;
      lookupData = { id: '', email: '' };
    } catch (error) {
      errorMessage = error.message || 'Er is een fout opgetreden bij het annuleren';
      showDeleteModal = false;
    } finally {
      loading = false;
    }
  }

  function cancelEdit() {
    editMode = false;
    editData = { ...appointment };
    errors = {};
  }
</script>

<svelte:head>
  <title>Mijn afspraak - AfspraakPlanner</title>
</svelte:head>

<section class="py-12 bg-gray-50 min-h-screen">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Mijn afspraak</h1>
      
      {#if successMessage}
        <Alert type="success" message={successMessage} />
      {/if}
      
      {#if errorMessage}
        <Alert type="error" message={errorMessage} />
      {/if}

      {#if !appointment}
        <!-- Lookup Form -->
        <div class="card">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Zoek uw afspraak</h2>
          <p class="text-gray-600 mb-6">
            Vul uw afspraak ID en email adres in om uw afspraak te bekijken of te wijzigen.
          </p>

          <form on:submit|preventDefault={lookupAppointment}>
            <Input
              type="number"
              name="id"
              label="Afspraak ID"
              placeholder="Bijvoorbeeld: 1"
              bind:value={lookupData.id}
              required
            />

            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="uw.email@voorbeeld.nl"
              bind:value={lookupData.email}
              required
            />

            <Button 
              type="submit" 
              variant="primary" 
              fullWidth
              disabled={loading}
            >
              {loading ? 'Bezig met zoeken...' : 'Afspraak zoeken'}
            </Button>
          </form>
        </div>

        <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 class="font-semibold text-blue-900 mb-2">Uw afspraak ID kwijt?</h3>
          <p class="text-sm text-blue-800">
            Neem contact met ons op via 020 123 4567 of info@afspraakplanner.nl
          </p>
        </div>
      {:else}
        <!-- Appointment Details/Edit -->
        <div class="card">
          {#if !editMode}
            <!-- View Mode -->
            <div class="flex justify-between items-start mb-6">
              <div>
                <h2 class="text-2xl font-bold text-gray-900">Afspraak details</h2>
                <p class="text-gray-600">Afspraak ID: {appointment.id}</p>
              </div>
              <button
                on:click={() => {
                  appointment = null;
                  lookupData = { id: '', email: '' };
                }}
                class="text-gray-500 hover:text-gray-700"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="space-y-4 mb-6">
              <div>
                <p class="text-sm text-gray-600">Naam</p>
                <p class="text-lg font-medium text-gray-900">{appointment.customer_name}</p>
              </div>
              
              <div>
                <p class="text-sm text-gray-600">Email</p>
                <p class="text-lg font-medium text-gray-900">{appointment.email}</p>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-600">Datum</p>
                  <p class="text-lg font-medium text-gray-900">{appointment.date}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Tijd</p>
                  <p class="text-lg font-medium text-gray-900">{appointment.time}</p>
                </div>
              </div>
              
              <div>
                <p class="text-sm text-gray-600">Dienst</p>
                <p class="text-lg font-medium text-gray-900">{appointment.service}</p>
              </div>
              
              {#if appointment.remarks}
                <div>
                  <p class="text-sm text-gray-600">Opmerkingen</p>
                  <p class="text-lg font-medium text-gray-900">{appointment.remarks}</p>
                </div>
              {/if}
            </div>

            <div class="flex gap-3">
              <Button 
                variant="primary"
                on:click={() => editMode = true}
                fullWidth
              >
                Afspraak wijzigen
              </Button>
              
              <Button 
                variant="danger"
                on:click={() => showDeleteModal = true}
                fullWidth
              >
                Afspraak annuleren
              </Button>
            </div>
          {:else}
            <!-- Edit Mode -->
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Afspraak wijzigen</h2>

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

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <label for="time" class="label">
                    Tijd <span class="text-red-500">*</span>
                  </label>
                  <select
                    id="time"
                    name="time"
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
                <label for="remarks" class="label">Opmerkingen (optioneel)</label>
                <textarea
                  id="remarks"
                  bind:value={editData.remarks}
                  rows="4"
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
                  {loading ? 'Bezig met opslaan...' : 'Opslaan'}
                </Button>
                
                <Button 
                  type="button"
                  variant="secondary" 
                  fullWidth
                  on:click={cancelEdit}
                >
                  Annuleren
                </Button>
              </div>
            </form>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</section>

<!-- Delete Confirmation Modal -->
<Modal 
  show={showDeleteModal} 
  title="Afspraak annuleren"
  onClose={() => showDeleteModal = false}
>
  <p class="text-gray-700 mb-6">
    Weet u zeker dat u deze afspraak wilt annuleren? Deze actie kan niet ongedaan worden gemaakt.
  </p>
  
  <div class="flex gap-3">
    <Button 
      variant="danger"
      on:click={handleDelete}
      fullWidth
      disabled={loading}
    >
      {loading ? 'Bezig...' : 'Ja, annuleer afspraak'}
    </Button>
    
    <Button 
      variant="secondary"
      on:click={() => showDeleteModal = false}
      fullWidth
    >
      Terug
    </Button>
  </div>
</Modal>
