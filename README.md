# jsrepl

A javascript repl - sandboxed via quickjs.

Takes your javascript code and executes it in the qickjs javascript engine via wasm.

Visit at [janstuemmel.de/jsrepl](https://janstuemmel.de/jsrepl/)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./docs/screen-dark.png">
  <img src="./docs/screen-light.png">
</picture>

## Disclaimer

This project was created within an afternoon, thus it's very hacky 
and does not include tests. Use at your own risk!

## Build with

* [QickJS](https://bellard.org/quickjs/)
* [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten)
* [monaco-editor](https://microsoft.github.io/monaco-editor/)
* [svelte](https://svelte.dev/)
* [vite](https://vitejs.dev/)

## License

MIT
