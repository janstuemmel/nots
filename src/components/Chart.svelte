<script lang="ts">
  import Chart, { type ChartConfiguration } from 'chart.js/auto';
  let canvas: HTMLCanvasElement;

  export let data: BarResult
  let chart: Chart<'bar', string[]>;
  let error: string | null = null;
  
  $: if (canvas) {
    if (chart) {
      chart.data.labels = data.value.labels
      chart.data.datasets = data.value.data.map((d, idx) => ({ label: `${idx}`, data: d }))
      chart.update()
    } else {
      const config: ChartConfiguration<'bar', string[]> = {
        type: 'bar',
        options: { plugins: { legend: { display: false } } },
        data: {
          labels: data.value.labels,
          datasets: data.value.data.map((d, idx) => ({ label: `${idx}`, data: d }))
        },
      }
      try {
        chart = new Chart(canvas, config)
      } catch (e) {
        error = `${e}`
      }
    }
  }
</script>

<div>
  {#if error}
    <div>error</div>
  {:else}
    <canvas bind:this={canvas}></canvas>
  {/if}
</div>
