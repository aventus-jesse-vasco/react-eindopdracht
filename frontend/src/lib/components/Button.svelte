<script>
  export let type = 'button';
  export let variant = 'primary'; // primary, secondary, danger
  export let disabled = false;
  export let fullWidth = false;
</script>

<button
  {type}
  {disabled}
  class="btn btn-{variant}"
  class:w-full={fullWidth}
  class:opacity-50={disabled}
  class:cursor-not-allowed={disabled}
  on:click
>
  <slot />
</button>
