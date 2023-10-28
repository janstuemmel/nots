<script lang="ts">
  import { writable } from 'svelte/store';

  import Result from './Result.svelte';
  import Monaco from './Monaco.svelte';
  import Resizer from './Resizer.svelte';
  import { evaluate } from '../common/evaluate/eval.js';
  import { clientRect } from '../common/actions/client-rect.js';
  import { matchTheme } from '../common/actions/match-media.js';
  import { code } from '../common/stores/code.js'
  import { theme } from '../common/stores/theme';

  const rect = writable<DOMRect>()
  
  let output: ErrResult | SuccessResult | null = null;
  
  let headerHeight = 0;
  let windowHeight = 0;
  let windowWidth = 0;
  $: width = windowWidth / 2

  $: if(code) {
    evaluate($code).then((res) => output = res)
  }
</script>

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} use:matchTheme={theme} />

<div use:clientRect={rect} class="flex flex-col h-screen bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100">
  
  <div bind:clientHeight={headerHeight} class="flex h-14 bg-slate-100 border-b border-b-slate-200 dark:border-b-slate-900 dark:bg-slate-800 px-4 p-2">
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
    <Monaco bind:value={$code} theme={$theme} height={windowHeight - headerHeight} width={width} />
    <Resizer bind:width min={$rect?.left + 100} max={$rect?.right - 100} />
    <div class="flex-1 overflow-y-scroll">
      <Result output={output} />
    </div>
  </div>

</div>
