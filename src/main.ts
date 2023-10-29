import App from './components/App.svelte';
import { code } from './common/stores/code.js';
import { getUrlCodeParam } from './common/util/url-params';

code.subscribe((v) => {
  if (getUrlCodeParam() === null) {
    localStorage.setItem('code', v);
  }
});

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
