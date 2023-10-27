<script lang="ts">
  import { onMount } from 'svelte';
  import * as monaco from 'monaco-editor'
  // @ts-ignore
  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
  // @ts-ignore
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

  export let value = '';
  export let readOnly = false;

  let monacoElem: HTMLDivElement;
  let editor: monaco.editor.IStandaloneCodeEditor;

  onMount(async () => {
    self.MonacoEnvironment = {
      getWorker: (_moduleId: string, label: string) => {
        if (label === 'typescript' || label === 'javascript') {
          return new tsWorker()
        }
        return new editorWorker()
      }
    }

    const Monaco = await import('monaco-editor');
    
    Monaco.editor.defineTheme('dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e293b',
      }
    })
    
    Monaco.editor.defineTheme('light', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {}
    })

    const theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

    editor = Monaco.editor.create(monacoElem, {
      padding: {top: 10},
      value,
      readOnly,
      lineNumbers: 'on',
      language: 'javascript',
      theme,
      tabSize: 2,
      fontSize: 14,
      renderWhitespace: 'none',
      renderLineHighlight: 'none',
      minimap: { enabled: false },
      scrollbar: { 
        horizontal: 'hidden',
        vertical: 'hidden',
      },
      overviewRulerLanes: 0,
      hideCursorInOverviewRuler: true,
      overviewRulerBorder: false,
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd|monaco.KeyCode.Enter, ()=> {
      value = editor.getValue()
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      const theme = event.matches ? 'dark' : 'light';
      editor.updateOptions({ theme })
    });

  })
</script>

<div class="flex flex-1 overflow-hidden">
  <div class="h-screen w-full" bind:this={monacoElem}></div>
</div>
