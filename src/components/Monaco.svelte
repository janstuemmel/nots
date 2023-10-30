<script lang="ts">
  import { onMount } from 'svelte';
  import * as monaco from 'monaco-editor'
  import { editorTypes } from '../common/const/editor-types';
  import { settings } from '../common/stores/settings';
  
  // @ts-ignore
  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
  // @ts-ignore
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

  export let hide = false;
  export let height = 0;
  export let width = 0;
  export let value = '';
  export let theme: 'light' | 'dark';
  export let readOnly = false;
  export let onSubmit: () => void = () => {};

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
    
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false
    });

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowJs: true,
      checkJs: true,
      allowNonTsExtensions: true
    });

    Monaco.languages.typescript.javascriptDefaults.addExtraLib(editorTypes, 'ts:jsrepl/main.d.ts')

    Monaco.editor.defineTheme('dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#2e3440',
      }
    })
    
    Monaco.editor.defineTheme('light', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {}
    })

    Monaco.editor.addKeybindingRule({
      keybinding: monaco.KeyMod.Shift|monaco.KeyMod.CtrlCmd|monaco.KeyCode.KeyD,
      command: 'editor.action.copyLinesDownAction',
      when: 'editorTextFocus && !editorReadonly'
    })

    editor = Monaco.editor.create(monacoElem, {
      value,
      theme,
      readOnly,
      language: 'javascript',
      padding: { top: 10 },
      lineNumbers: $settings.lineNumbers,
      tabSize: $settings.tabSize,
      fontSize: $settings.fontSize,
      renderWhitespace: 'none',
      renderLineHighlight: 'none',
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      hideCursorInOverviewRuler: true,
      overviewRulerBorder: false,
    });

    editor.onDidChangeModelContent(() => {
      value = editor.getValue()
    })

    editor.addCommand(monaco.KeyMod.CtrlCmd|monaco.KeyCode.Enter, () => {
      onSubmit()
    });
  })

  $: if (editor) {
    editor.updateOptions({
      theme,
      lineNumbers: $settings.lineNumbers,
      tabSize: $settings.tabSize,
      fontSize: $settings.fontSize,
    })
  }

  $: if ((width || height) && editor) {
    editor.layout()
  }
</script>

<div class:hidden={hide}>
  <div style:height={`${height}px`} style:width={`${width}px`} bind:this={monacoElem}></div>
</div>
