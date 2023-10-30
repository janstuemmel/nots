<script lang="ts">
  import { Grid } from 'gridjs';

  let elem: HTMLDivElement;
  let grid: Grid;
  export let data: TableResult;

  $: if(elem) {
    if (grid) {
      grid.destroy()
    }
    grid = new Grid({
      columns: data.value.labels,
      data: data.value.data,
      className: {
        th: 'bg-nord-4 dark:bg-nord-0 p-2 sticky top-0',
        td: 'p-2 text-center',
        table: 'mb-0 border-black',
      },
    }).render(elem)
  }
</script>

<div class="max-h-96" bind:this={elem}></div>
