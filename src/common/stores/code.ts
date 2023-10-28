import { writable } from 'svelte/store';
import { usageText } from '../const/usage-text';
export const code = writable<string>(localStorage.getItem('code') ?? usageText);
