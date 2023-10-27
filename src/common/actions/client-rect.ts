import { tick } from 'svelte';
import type { Writable } from 'svelte/store';

export const clientRect = (node: HTMLDivElement, rect: Writable<DOMRect>) => {

  const resize = async () => {
    // await next render
    await tick();
    rect.set(node.getBoundingClientRect())
  }

  resize();
  
  window.addEventListener('resize', resize);
  
  return {
    destroy() {
      window.removeEventListener('resize', resize)
    }
  }
}