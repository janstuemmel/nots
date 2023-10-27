<script lang="ts">
  import Monaco from './Monaco.svelte';
  import { evaluate } from '../common/evaluate/eval';
  import Result from './Result.svelte';

  let value = `import 'https://cdn.jsdelivr.net/npm/lodash'

vm.log(_.map([1,2,3], (v) => v*5))
`

  let output: ErrResult | SuccessResult | null = null;

  $: if(value) {
    evaluate(value).then((res) => output = res)
  }
</script>

<div class="flex flex-col h-screen bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100">
  
  <div class="flex h-14 bg-slate-200 dark:bg-slate-900 px-6 p-2">
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

  <div class="flex flex-1 overflow-hidden">
    <div class="flex-1">
      <Monaco bind:value />
    </div>
    <div class="w-1 bg-slate-200 dark:bg-slate-700"></div>
    <div class="flex-1 overflow-y-scroll">
      <Result output={output} />
    </div>
  </div>

</div>
