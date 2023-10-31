<script lang="ts">
  import { onMount } from 'svelte';
  import * as monaco from 'monaco-editor'
  import { editorTypes } from '../../common/const/editor-types';
  import { settings } from '../../common/stores/settings';
  
  // @ts-ignore
  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
  // @ts-ignore
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
  import { creatMonaco } from './create-monaco';

  export let hide = false;
  export let height = 0;
  export let width = 0;
  export let value = '';
  export let theme: 'light' | 'dark';
  export let onSubmit: () => void = () => {};
  
  let monacoElem: HTMLDivElement;
  let editor: monaco.editor.IStandaloneCodeEditor;

  onMount(async () => {
    self.MonacoEnvironment = {
      getWorker: (_, label: string) => {
        if (label === 'typescript' || label === 'javascript') {
          return new tsWorker()
        }
        return new editorWorker()
      }
    }

    editor = await creatMonaco(monacoElem, value)

    editor.onDidChangeModelContent(() => {
      value = editor.getValue()
    })

    editor.addCommand(monaco.KeyMod.CtrlCmd|monaco.KeyCode.Enter, () => {
      onSubmit()
    });
  })

  $: if (editor) {
    editor.updateOptions({ theme, ...$settings })
  }

  $: if ((width || height) && editor) {
    editor.layout()
  }
</script>

<div class:hidden={hide}>
  <div style:height={`${height}px`} style:width={`${width}px`} bind:this={monacoElem}></div>
</div>
