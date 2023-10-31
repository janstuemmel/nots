<script lang="ts">
  import { writable } from 'svelte/store';

  import Result from './Result.svelte';
  import Monaco from './editor/Monaco.svelte';
  import Resizer from './Resizer.svelte';
  import { evaluate } from '../common/evaluate/eval.js';
  import { clientRect } from '../common/actions/client-rect.js';
  import { matchTheme } from '../common/actions/match-media.js';
  import { code } from '../common/stores/code.js'
  import { theme } from '../common/stores/theme';
  import { setUrlReadModeParam } from '../common/util/url-params';
  import Settings from './Settings.svelte';
  import { settings } from '../common/stores/settings';
  import Share from './Share.svelte';

  let showSettingsModal = false;
  let showShareModal = false;

  const rect = writable<DOMRect>()
  
  let output: ErrResult | SuccessResult | null = null;
  
  let readMode = false

  const toggleReadMode = () => {
    readMode = !readMode
    setUrlReadModeParam(readMode);
  };

  let headerHeight = 0;
  let windowHeight = 0;
  let windowWidth = 0;
  $: width = windowWidth / 2

  $: isMobile = windowWidth < 768
  $: isMobileEditMode = !readMode && isMobile
  $: showEditor = (isMobileEditMode || !isMobile) && !readMode
  $: showResult = !showEditor || !isMobile
  $: editorWidth = isMobile ? windowWidth : width
  
  // evaluate initially
  evaluate($settings.memoryLimit, $settings.executionTimeout).then((res) => output = res)  
  const submitCode = () => evaluate($settings.memoryLimit, $settings.executionTimeout)
    .then((res) => output = res);

  const saveToUrl = () => {
    showShareModal = true
  }

  document.addEventListener('keydown', (evt) => {
    if (evt.ctrlKey && evt.key === 's') {
      saveToUrl()
    }
  })
</script>

<svelte:window 
  bind:innerHeight={windowHeight}
  bind:innerWidth={windowWidth}
  use:matchTheme={theme} />

<Settings bind:show={showSettingsModal} />
<Share bind:show={showShareModal} code={$code} />

<div use:clientRect={rect} class="flex flex-col h-screen bg-nord-6 text-nord-0 dark:bg-nord-1 dark:text-slate-100">
  
  <div bind:clientHeight={headerHeight} class="flex justify-between h-14 bg-nord-6 border-b border-b-nord-4 dark:border-b-nord-2 dark:bg-nord-1 px-4">
    <div class="flex gap-5 items-center text-nord-11">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-terminal-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M8 9l3 3l-3 3"></path>
        <path d="M13 15l3 0"></path>
        <path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
      </svg>
    </div>
    <div class="flex gap-5 p-2 pl-6 items-center">
      <button on:click={submitCode} title="Execute (ctrl-Enter)" class="text-nord-3 dark:text-nord-4 hover:text-nord-11 transition ease-in-out">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-play" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M7 4v16l13 -8z"></path>
        </svg>
      </button>
      <button on:click={toggleReadMode} title="Switch reader/edit mode" class="text-nord-3 dark:text-nord-4 hover:text-nord-11 transition ease-in-out">
        {#if readMode}
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path>
          <path d="M13.5 6.5l4 4"></path>
        </svg>
        {:else}
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-book" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path>
          <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path>
          <path d="M3 6l0 13"></path>
          <path d="M12 6l0 13"></path>
          <path d="M21 6l0 13"></path>
        </svg>
        {/if}
      </button>
      <button on:click={saveToUrl} title="Share code (ctrl-s)" class="text-nord-3 dark:text-nord-4 hover:text-nord-11 transition ease-in-out">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-share" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
          <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
          <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
          <path d="M8.7 10.7l6.6 -3.4"></path>
          <path d="M8.7 13.3l6.6 3.4"></path>
        </svg>
      </button>
      <button on:click={() => showSettingsModal = true} title="Settings" class="text-nord-3 dark:text-nord-4 hover:text-nord-11 transition ease-in-out">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-adjustments" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 10a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
          <path d="M6 4v4"></path>
          <path d="M6 12v8"></path>
          <path d="M10 16a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
          <path d="M12 4v10"></path>
          <path d="M12 18v2"></path>
          <path d="M16 7a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
          <path d="M18 4v1"></path>
          <path d="M18 9v11"></path>
        </svg>
      </button>
    </div>
    <div class="flex gap-5 p-2 pl-6 items-center">
      <a href="https://github.com/janstuemmel/nots" target="_blank" class="text-gray-400 dark:text-gray-600 hover:text-gray-600 hover:dark:text-gray-400 transition ease-in-out">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-github" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
        </svg>
      </a>
    </div>
  </div>

  <div class="flex flex-1 overflow-hidden">
    <Monaco bind:value={$code} theme={$theme} height={windowHeight - headerHeight} width={editorWidth} onSubmit={submitCode} hide={!showEditor}/>
    <Resizer bind:width min={$rect?.left + 100} max={$rect?.right - 100} hide={!showEditor} />
    <div class:hidden={!showResult} class="flex-1 overflow-y-scroll">
      <Result output={output} />
    </div>
  </div>

</div>
