<script lang="ts">
  import { onMount } from 'svelte';
  export let show = false;

  onMount(() => {
    const esc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') show = false
    }
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('keydown', esc)
    }
  })
</script>

{#if show}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click={() => show = false} class="z-50 absolute top-0 left-0 flex items-center justify-center backdrop-blur-sm w-screen h-screen text-nord-2 dark:text-nord-4">
  <div on:click|stopPropagation={() => {}} class="w-full m-4 lg:w-5/12 p-12 bg-nord-6 dark:bg-nord-0 shadow-md border border-nord-4 dark:border-nord-2 rounded-md">
    <slot />
  </div>
</div>
{/if}
