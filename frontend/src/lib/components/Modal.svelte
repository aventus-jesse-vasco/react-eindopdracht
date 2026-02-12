<script>
  export let show = false;
  export let title = '';
  export let onClose = () => {};
  
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }
</script>

{#if show}
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    on:click={handleBackdropClick}
    on:keydown={(e) => e.key === 'Escape' && onClose()}
    role="dialog"
    aria-modal="true"
  >
    <div class="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            on:click={onClose}
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <slot />
      </div>
    </div>
  </div>
{/if}
