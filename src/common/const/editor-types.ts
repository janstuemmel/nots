export const editorTypes = `
declare namespace vm {

  /**
   * logs your variables to the output panel
   */ 
  function log(...args: unknown): void

  /**
   * prints your markdown to the output panel
   */ 
  function md(markdown: string): void

  /**
   * displays a bar chart in the output panel
   */ 
  function bar(labels: string[], data: number[][]): void
}
`;