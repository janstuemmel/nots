import { writable } from 'svelte/store';
import { usageText } from '../const/usage-text.js';
import { getCodeFromParam } from '../util/code-url-param.js';

export const code = writable<string>(getCodeFromParam() ?? localStorage.getItem('code') ?? usageText);
