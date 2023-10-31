import App from './components/App.svelte';
import { code } from './common/stores/code.js';
import { settings } from './common/stores/settings.js';
import { getUrlCodeFragment } from './common/util/url-fragment.js';

code.subscribe((v) => {
  if (getUrlCodeFragment() === null) {
    localStorage.setItem('code', v);
  }
});

settings.subscribe((s) => {
  localStorage.setItem('settings', JSON.stringify(s))
})

document.addEventListener('keydown', (evt) => {
  if (evt.ctrlKey && evt.key === 's') {
    evt.preventDefault();
  }
  if (evt.ctrlKey && evt.shiftKey && evt.key === 'D') {
    evt.preventDefault();
  }
})

const app = new App({
  target: document.getElementById('root')!,
})

export default app
