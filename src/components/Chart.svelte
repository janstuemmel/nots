<script lang="ts">
  import Chart, { type ChartConfiguration } from 'chart.js/auto';

  export let data: BarResult | LineResult
  export let type: 'bar' | 'line';

  let canvas: HTMLCanvasElement;
  let chart: Chart<'bar' | 'line', string[]>;
  let error: string | null = null;
  
  let width = 0;
  $: height = width / 2
  
  $: if (canvas) {
    if (chart) {
      chart.data.labels = data.value.labels
      chart.data.datasets = data.value.data.map((d, idx) => ({ label: `${idx}`, data: d }))
      chart.update()
    } else {
      const config: ChartConfiguration<'bar' | 'line', string[]> = {
        type,
        options: { 
          plugins: { legend: { display: false } },
          resizeDelay: 20,
        },
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

  $: if (width && chart) {
    chart.resize()
  }

</script>

<div 
  bind:clientWidth={width}
  style:height={`${height}px`} 
  class="flex items-center justify-center">
  {#if error}
    <div>error</div>
  {:else}
    <canvas bind:this={canvas}></canvas>
  {/if}
</div>
