import { writable } from 'svelte/store';
import { usageText } from '../const/usage-text.js';
import { getUrlCodeParam } from '../util/url-params.js';

export const code = writable<string>(getUrlCodeParam() ?? localStorage.getItem('code') ?? usageText);
