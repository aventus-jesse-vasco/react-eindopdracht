<script>
  export let type = 'text';
  export let name = '';
  export let value = '';
  export let placeholder = '';
  export let required = false;
  export let error = '';
  export let label = '';
  export let id = name;
</script>

<div class="mb-4">
  {#if label}
    <label for={id} class="label">
      {label}
      {#if required}<span class="text-red-500">*</span>{/if}
    </label>
  {/if}
  
  <input
    {type}
    {id}
    {name}
    {placeholder}
    {required}
    bind:value
    class="input"
    class:input-error={error}
    on:blur
    on:input
  />
  
  {#if error}
    <p class="error-text">{error}</p>
  {/if}
</div>
