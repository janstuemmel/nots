import * as monaco from 'monaco-editor'
import { editorTypes } from '../../common/const/editor-types';

export const creatMonaco = async (elem: HTMLDivElement, value: string) => {
  const Monaco = await import('monaco-editor');

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false
  });

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    lib: ['es2020'],
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    allowNonTsExtensions: true
  });


  Monaco.languages.typescript.typescriptDefaults.addExtraLib(editorTypes, 'ts:nots/main1.d.ts')

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
  
  Monaco.editor.addKeybindingRule({
    keybinding: monaco.KeyMod.Shift|monaco.KeyMod.CtrlCmd|monaco.KeyCode.Digit7,
    command: 'editor.action.commentLine',
    when: 'editorTextFocus && !editorReadonly'
  })

  const editor = Monaco.editor.create(elem, {
    value,
    language: 'typescript',
    padding: { top: 25, bottom: 10 },
    renderWhitespace: 'none',
    renderLineHighlight: 'none',
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    hideCursorInOverviewRuler: true,
    overviewRulerBorder: false,
  });

  return editor;
}
