<script>
  export let name = '';
  export let value = '';
  export let options = [];
  export let required = false;
  export let error = '';
  export let label = '';
  export let placeholder = 'Selecteer een optie';
  export let id = name;
</script>

<div class="mb-4">
  {#if label}
    <label for={id} class="label">
      {label}
      {#if required}<span class="text-red-500">*</span>{/if}
    </label>
  {/if}
  
  <select
    {id}
    {name}
    {required}
    bind:value
    class="input"
    class:input-error={error}
    on:change
    on:blur
  >
    <option value="" disabled selected>{placeholder}</option>
    {#each options as option}
      <option value={option}>{option}</option>
    {/each}
  </select>
  
  {#if error}
    <p class="error-text">{error}</p>
  {/if}
</div>
