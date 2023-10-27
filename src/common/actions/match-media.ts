import { tick } from 'svelte';
import type { Writable } from 'svelte/store';

export const matchTheme = (win: Window, theme: Writable<'light' | 'dark'>) => {
  
  const change = async (event: MediaQueryListEvent) => {
    await tick();
    theme.set(event.matches ? 'dark' : 'light')
  }

  // initially
  theme.set(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

  win.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', change);
  
  return {
    destroy() {
      win.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', change)
    }
  }
}