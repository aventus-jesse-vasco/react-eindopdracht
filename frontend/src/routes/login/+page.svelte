<script>
  import { goto } from '$app/navigation';
  import Input from '$lib/components/Input.svelte';
  import Button from '$lib/components/Button.svelte';
  import Alert from '$lib/components/Alert.svelte';
  import { login, isAuthenticated } from '$lib/stores/auth';
  import { apiRequest } from '$lib/api';
  import { onMount } from 'svelte';

  let formData = {
    email: '',
    password: ''
  };

  let errors = {};
  let loading = false;
  let errorMessage = '';

  // Redirect if already authenticated
  onMount(() => {
    if ($isAuthenticated) {
      goto('/dashboard');
    }
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validateForm() {
    errors = {};
    
    if (!formData.email) {
      errors.email = 'Email is verplicht';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Ongeldig email adres';
    }
    
    if (!formData.password) {
      errors.password = 'Wachtwoord is verplicht';
    }
    
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit() {
    errorMessage = '';
    
    if (!validateForm()) {
      return;
    }

    loading = true;

    try {
      const response = await apiRequest('/api/login', {
        method: 'POST',
        body: JSON.stringify(formData)
      });

      // Store token and employee data
      login(response.token, response.employee);
      
      // Redirect to dashboard
      goto('/dashboard');
    } catch (error) {
      errorMessage = error.message || 'Inloggen mislukt. Controleer uw gegevens.';
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Medewerker login - AfspraakPlanner</title>
</svelte:head>

<section class="py-12 bg-gray-50 min-h-screen flex items-center">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Medewerker login
        </h1>
        <p class="text-gray-600">
          Log in om toegang te krijgen tot het dashboard
        </p>
      </div>

      <div class="card">
        {#if errorMessage}
          <Alert type="error" message={errorMessage} />
        {/if}

        <form on:submit|preventDefault={handleSubmit}>
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="medewerker@voorbeeld.nl"
            bind:value={formData.email}
            error={errors.email}
            required
          />

          <Input
            type="password"
            name="password"
            label="Wachtwoord"
            placeholder="Uw wachtwoord"
            bind:value={formData.password}
            error={errors.password}
            required
          />

          <Button 
            type="submit" 
            variant="primary" 
            fullWidth
            disabled={loading}
          >
            {loading ? 'Bezig met inloggen...' : 'Inloggen'}
          </Button>
        </form>

        <div class="mt-6 p-4 bg-gray-50 rounded-lg">
          <p class="text-sm text-gray-600 mb-2">
            <strong>Testaccount voor demonstratie:</strong>
          </p>
          <p class="text-sm text-gray-700">
            Email: employee@example.com<br>
            Wachtwoord: password123
          </p>
        </div>
      </div>

      <div class="mt-6 text-center">
        <a href="/" class="text-primary-600 hover:text-primary-700 text-sm font-medium">
          ← Terug naar homepage
        </a>
      </div>
    </div>
  </div>
</section>
