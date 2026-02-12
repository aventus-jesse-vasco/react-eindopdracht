<script>
  import Input from '$lib/components/Input.svelte';
  import Select from '$lib/components/Select.svelte';
  import Button from '$lib/components/Button.svelte';
  import Alert from '$lib/components/Alert.svelte';
  import { apiRequest } from '$lib/api';

  const services = ['Haircut', 'Color', 'Styling', 'Consultation'];
  
  // Time slots (09:00 - 18:00, 30 minute intervals)
  const timeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  timeSlots.push('18:00');

  let formData = {
    customer_name: '',
    email: '',
    date: '',
    time: '',
    service: '',
    remarks: ''
  };

  let errors = {};
  let loading = false;
  let successMessage = '';
  let errorMessage = '';
  let createdAppointmentId = null;

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validateForm() {
    errors = {};
    
    if (!formData.customer_name || formData.customer_name.trim().length < 2) {
      errors.customer_name = 'Naam moet minimaal 2 karakters zijn';
    }
    
    if (!formData.email) {
      errors.email = 'Email is verplicht';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Ongeldig email adres';
    }
    
    if (!formData.date) {
      errors.date = 'Datum is verplicht';
    } else {
      const selectedDate = new Date(formData.date);
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      if (selectedDate < todayDate) {
        errors.date = 'Datum kan niet in het verleden zijn';
      }
    }
    
    if (!formData.time) {
      errors.time = 'Tijd is verplicht';
    }
    
    if (!formData.service) {
      errors.service = 'Selecteer een dienst';
    }
    
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit() {
    successMessage = '';
    errorMessage = '';
    
    if (!validateForm()) {
      errorMessage = 'Vul alle verplichte velden correct in';
      return;
    }

    loading = true;

    try {
      const response = await apiRequest('/api/afspraken', {
        method: 'POST',
        body: JSON.stringify(formData)
      });

      createdAppointmentId = response.appointment.id;
      successMessage = `Afspraak succesvol gemaakt! Uw afspraak ID is: ${createdAppointmentId}`;
      
      // Reset form
      formData = {
        customer_name: '',
        email: '',
        date: '',
        time: '',
        service: '',
        remarks: ''
      };
      errors = {};
    } catch (error) {
      errorMessage = error.message || 'Er is een fout opgetreden bij het maken van de afspraak';
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Maak een afspraak - AfspraakPlanner</title>
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">
        Welkom bij AfspraakPlanner
      </h1>
      <p class="text-xl text-primary-100 mb-8">
        Maak eenvoudig een afspraak bij ons. Kies uw gewenste dienst, datum en tijd.
      </p>
    </div>
  </div>
</section>

<!-- Booking Form Section -->
<section class="py-12">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto">
      <div class="card">
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Maak een afspraak</h2>
        
        {#if successMessage}
          <Alert type="success" message={successMessage} />
          <div class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p class="text-blue-800 mb-2">
              <strong>Belangrijk:</strong> Bewaar uw afspraak ID en email adres. 
              U kunt hiermee uw afspraak beheren.
            </p>
            <a 
              href="/mijn-afspraak" 
              class="text-primary-600 hover:text-primary-700 font-medium underline"
            >
              Ga naar Mijn Afspraak →
            </a>
          </div>
        {/if}
        
        {#if errorMessage}
          <Alert type="error" message={errorMessage} />
        {/if}

        <form on:submit|preventDefault={handleSubmit}>
          <Input
            type="text"
            name="customer_name"
            label="Naam"
            placeholder="Uw volledige naam"
            bind:value={formData.customer_name}
            error={errors.customer_name}
            required
          />

          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="uw.email@voorbeeld.nl"
            bind:value={formData.email}
            error={errors.email}
            required
          />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              name="date"
              label="Datum"
              bind:value={formData.date}
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
                bind:value={formData.time}
                class="input"
                class:input-error={errors.time}
                required
              >
                <option value="" disabled selected>Selecteer een tijd</option>
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
            placeholder="Selecteer een dienst"
            options={services}
            bind:value={formData.service}
            error={errors.service}
            required
          />

          <div class="mb-6">
            <label for="remarks" class="label">
              Opmerkingen (optioneel)
            </label>
            <textarea
              id="remarks"
              name="remarks"
              bind:value={formData.remarks}
              placeholder="Eventuele bijzonderheden of wensen"
              rows="4"
              class="input"
              maxlength="500"
            ></textarea>
            <p class="text-sm text-gray-500 mt-1">
              {formData.remarks.length}/500 karakters
            </p>
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            fullWidth
            disabled={loading}
          >
            {loading ? 'Bezig met opslaan...' : 'Afspraak maken'}
          </Button>
        </form>
      </div>

      <!-- Info Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div class="text-center p-6 bg-white rounded-lg shadow">
          <div class="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Flexibele tijden</h3>
          <p class="text-sm text-gray-600">Kies uit diverse tijdsloten die bij u passen</p>
        </div>

        <div class="text-center p-6 bg-white rounded-lg shadow">
          <div class="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Direct bevestiging</h3>
          <p class="text-sm text-gray-600">Ontvang direct een bevestiging van uw afspraak</p>
        </div>

        <div class="text-center p-6 bg-white rounded-lg shadow">
          <div class="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Eenvoudig aanpassen</h3>
          <p class="text-sm text-gray-600">Wijzig of annuleer uw afspraak indien nodig</p>
        </div>
      </div>
    </div>
  </div>
</section>
