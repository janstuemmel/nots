import { writable } from 'svelte/store';
import { getFromLocalStorage } from '../util/local-storage';

const localSettings = getFromLocalStorage<Settings>('settings');
const settingsFromLocalStore = typeof localSettings === 'string' ? null : localSettings

export const settings = writable<Settings>(settingsFromLocalStore ?? {
  memoryLimit: 1024 * 1024 * 20,
  executionTimeout: 2000,
  lineNumbers: 'on',
  tabSize: 2,
  fontSize: 14,
});
