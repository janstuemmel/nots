import App from './components/App.svelte';
import { code } from './common/stores/code.js';
import { getUrlCodeParam } from './common/util/url-params';
import { settings } from './common/stores/settings';

code.subscribe((v) => {
  if (getUrlCodeParam() === null) {
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

console.log(Babel.transform('(): Foo => 1', { presets: ['typescript'], filename: "example.ts" }).code)