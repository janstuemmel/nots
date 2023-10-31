<script lang="ts">
  import { buildUrlCodeFragment } from '../common/util/url-fragment';
  import Modal from './Modal.svelte';
  let elem: HTMLInputElement;
  export let show = false;
  export let code: string;
  
  let value = buildUrlCodeFragment(code)

  const copy = () => {
    elem.select();
    elem.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(elem.value);
  }
</script>

{#if show}
<Modal bind:show>
  <div class="text-lg uppercase tracking-widest mb-6">Share</div>
  <div class="bg-nord-2 p-4 flex gap-4 rounded-md">
    <input disabled bind:this={elem} type="text" bind:value class="bg-transparent flex-1 focus:outline-none" />
    <button on:click={copy} class="hover:text-nord-11 transition ease-in-out">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-copy" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
        <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
      </svg>
    </button>
  </div>
</Modal>
{/if}
