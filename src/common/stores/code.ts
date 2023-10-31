import { writable } from 'svelte/store';
import { usageText } from '../const/usage-text.js';
import { getUrlCodeFragment } from '../util/url-fragment.js';

export const code = writable<string>(getUrlCodeFragment() ?? localStorage.getItem('code') ?? usageText);
