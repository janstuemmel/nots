<script lang="ts">
  import Chart, { type ChartConfiguration } from 'chart.js/auto';

  let canvas: HTMLCanvasElement;
  export let data: BarResult
  let chart: Chart<'bar', string[]>;
  let error: string | null = null;
  
  let width = 0;
  $: height = width / 2
  
  $: if (canvas) {
    if (chart) {
      chart.data.labels = data.value.labels
      chart.data.datasets = data.value.data.map((d, idx) => ({ label: `${idx}`, data: d }))
      chart.update()
    } else {
      const config: ChartConfiguration<'bar', string[]> = {
        type: 'bar',
        options: { 
          plugins: { legend: { display: false } },
          onResize: (_, newSize) => console.log('onResize', newSize),
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
    console.log('chart', width)
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
