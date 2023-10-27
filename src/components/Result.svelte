<script lang="ts">
  export let output: ErrResult | SuccessResult | null = null;
</script>

{#if output && output.type === 'error'}
  <div>{output.message}</div>
{/if}

{#if output && output.type === 'success'}
<div class="flex flex-col gap-4 m-4 overflow-y-scroll">
  {#each output.values as result}
    <div class="bg-slate-200 dark:bg-slate-900 rounded-md p-2">
      <pre><code class="text-xs">{`${result.value}`}</code></pre>
    </div>
  {/each}
</div>
{/if}