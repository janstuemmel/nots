<script lang="ts">
  import Monaco from './Monaco.svelte';
  import { evaluate } from '../common/evaluate/eval.js';
  import Result from './Result.svelte';
  import { usageText } from '../common/const/usage-text.js';
  import Resizer from './Resizer.svelte';
  import { clientRect } from '../common/actions/client-rect.js';
  import { writable } from 'svelte/store';

  let theme: 'dark' | 'light' = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  let value = usageText;
  let output: ErrResult | SuccessResult | null = null;
  
  const rect = writable<DOMRect>()
  let headerHeight = 0;
  let windowHeight = 0;
  let windowWidth = 0;
  
  let width = 600

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    theme = event.matches ? 'dark' : 'light';
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.ctrlKey && evt.key === 's') {
      evt.preventDefault();
    }
  })

  $: if(value) {
    evaluate(value).then((res) => output = res)
  }
</script>

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} />

<div use:clientRect={rect} class="flex flex-col h-screen bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100">
  
  <div bind:clientHeight={headerHeight} class="flex h-14 bg-slate-100 border-b-2 border-b-slate-200 dark:border-b-slate-900 dark:bg-slate-800 px-4 p-2">
    <div class="flex flex-1 gap-5 items-center">
      <span class="text-xl">🐪</span>
      <span class="tracking-widest text-slate-700 dark:text-slate-300 font-mono">jsrepl</span>
    </div>
    <div class="flex gap-5 p-2 pl-6 items-center">
      <span class="tracking-widest text-slate-400 dark:text-slate-600 font-mono text-xs">run with ctrl-enter</span>
      <a 
        href="https://github.com/janstuemmel/jsrepl"
        target="_blank"
        class="tracking-widest text-slate-700 dark:text-slate-400 hover:text-slate-900 hover:dark:text-white font-mono text-xs">
        github
      </a>
    </div>
  </div>

  <div class="flex overflow-hidden">
    <Monaco bind:value {theme} height={windowHeight - headerHeight} width={width} />
    <Resizer bind:width min={$rect?.left + 100} max={$rect?.right - 100} />
    <div class="flex-1 overflow-y-scroll">
      <Result output={output} />
    </div>
  </div>

</div>
