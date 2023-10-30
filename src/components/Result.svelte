<script lang="ts">
  import Chart from "./Chart.svelte";
  import Object from "./Object.svelte";
  import Table from "./Table.svelte";

  export let output: ErrResult | SuccessResult | null = null;
</script>

{#if output && output.type === 'error'}
  <div class="flex flex-col gap-4 m-4 bg-red-700 p-4 font-mono text-white">
    <div class="text-lg font-semibold tracking-widest">{output.name}</div>
    <div class="bg-red-900 p-4">{output.message}</div>
  </div>
{/if}

{#if output && output.type === 'success'}
<div class="container m-auto p-4 flex flex-col gap-4">
  {#each output.values as result}
    {#if result.type === 'html'}
      <div class="prose max-w-none dark:prose-invert">
        {@html result.value}
      </div>
    {:else if result.type === 'bar'}
      <div class="bg-nord-5 rounded-md border border-nord-4 dark:border-nord-2 dark:bg-nord-0 p-4">
        <Chart data={result} type="bar" />
      </div>
    {:else if result.type === 'line'}
      <div class="bg-nord-5 rounded-md border border-nord-4 dark:border-nord-2 dark:bg-nord-0 p-4">
        <Chart data={result} type="line" />
      </div>
    {:else if result.type === 'table'}
      <div class="bg-nord-5 rounded-md border border-nord-4 dark:border-nord-2 dark:bg-nord-0 overflow-y-auto">
        <Table data={result} />
      </div>
    {:else if result.type === 'object'}
      <div class="bg-nord-5 rounded-md border border-nord-4 dark:border-nord-2 dark:bg-nord-0 p-4">
        <Object data={result} />
      </div>
    {:else}
      <div class="bg-nord-5 rounded-md border border-nord-4 dark:border-nord-2 dark:bg-nord-0 p-4">
        <pre><code class="text-xs">{`${result.value}`}</code></pre>
      </div>
    {/if}
  {/each}
</div>
{/if}