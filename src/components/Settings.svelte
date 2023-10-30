<script lang="ts">
  import { settings } from '../common/stores/settings.js'
  export let show = false;
  let memoryLimit = 1024 * 1024
</script>

{#if show}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click={() => show = false} class="z-50 absolute top-0 left-0 flex items-center justify-center backdrop-blur-sm w-screen h-screen text-nord-2 dark:text-nord-4">
  <div on:click|stopPropagation={() => {}} class="w-full m-4 lg:w-5/12 p-12 bg-nord-6 dark:bg-nord-0 shadow-md border border-nord-4 dark:border-nord-2 rounded-md">
    <div class="text-lg uppercase tracking-widest mb-6">Settings</div>
    <div class="flex flex-col gap-4">
      <div class="flex gap-4 items-center">
        <div class="flex-1">Memory limit</div>
        <div class="text-sm text-gray-500">{Math.ceil($settings.memoryLimit / (1024 * 1024))} MB</div>
        <input type="range" min={1024 * 1024} max={1024 * 1024 * 100} step={1024} bind:value={$settings.memoryLimit} />
      </div>
      <div class="flex gap-4 items-center">
        <div class="flex-1">Execution timeout</div>
        <div class="text-sm text-gray-500">{($settings.executionTimeout / 1000).toFixed(1)} Sec</div>
        <input type="range" min="100" max="10000" step={100} bind:value={$settings.executionTimeout} />
      </div>
      <div class="flex gap-4">
        <div class="flex-1">Line Numbers</div>
        <select bind:value={$settings.lineNumbers} class="px-2 py-1 bg-nord-4 dark:bg-nord-1 rounded-md">
          <option>on</option>
          <option>off</option>
          <option>interval</option>
          <option>relative</option>
        </select>
      </div>
      <div class="flex gap-4">
        <div class="flex-1">Tab size</div>
        <select bind:value={$settings.tabSize} class="px-2 py-1 bg-nord-4 dark:bg-nord-1 rounded-md">
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={8}>8</option>
        </select>
      </div>
      <div class="flex gap-4">
        <div class="flex-1">Font size</div>
        <select bind:value={$settings.fontSize} class="px-2 py-1 bg-nord-4 dark:bg-nord-1 rounded-md">
          <option value={12}>12</option>
          <option value={14}>14</option>
          <option value={16}>16</option>
          <option value={18}>18</option>
          <option value={20}>20</option>
          <option value={22}>22</option>
          <option value={24}>24</option>
        </select>
      </div>
    </div>
  </div>
</div>
{/if}
