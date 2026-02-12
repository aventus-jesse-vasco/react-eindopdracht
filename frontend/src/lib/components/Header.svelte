<script>
  import { page } from '$app/stores';
  import { isAuthenticated } from '$lib/stores/auth';
  
  let mobileMenuOpen = false;
</script>

<header class="bg-white shadow-md">
  <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo -->
      <div class="flex items-center">
        <a href="/" class="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
          AfspraakPlanner
        </a>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-4">
        <a 
          href="/" 
          class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
          class:text-primary-600={$page.url.pathname === '/'}
          class:text-gray-700={$page.url.pathname !== '/'}
          class:hover:text-primary-600={$page.url.pathname !== '/'}
        >
          Afspraak maken
        </a>
        <a 
          href="/mijn-afspraak" 
          class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
          class:text-primary-600={$page.url.pathname === '/mijn-afspraak'}
          class:text-gray-700={$page.url.pathname !== '/mijn-afspraak'}
          class:hover:text-primary-600={$page.url.pathname !== '/mijn-afspraak'}
        >
          Mijn afspraak
        </a>
        
        {#if $isAuthenticated}
          <a 
            href="/dashboard" 
            class="px-4 py-2 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
          >
            Dashboard
          </a>
        {:else}
          <a 
            href="/login" 
            class="px-4 py-2 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
          >
            Medewerker login
          </a>
        {/if}
      </div>

      <!-- Mobile menu button -->
      <div class="md:hidden">
        <button
          on:click={() => mobileMenuOpen = !mobileMenuOpen}
          class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {#if mobileMenuOpen}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            {:else}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            {/if}
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    {#if mobileMenuOpen}
      <div class="md:hidden pb-3">
        <a href="/" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50">
          Afspraak maken
        </a>
        <a href="/mijn-afspraak" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50">
          Mijn afspraak
        </a>
        {#if $isAuthenticated}
          <a href="/dashboard" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50">
            Dashboard
          </a>
        {:else}
          <a href="/login" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50">
            Medewerker login
          </a>
        {/if}
      </div>
    {/if}
  </nav>
</header>
