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
  function bar(labels: (number|string)[], data: number[][]): void

  /**
   * displays a line chart in the output panel
   */ 
  function line(labels: (number|string)[], data: number[][]): void

  /**
   * displays a table in the output panel
   */ 
  function table(labels: string[], data: (number|string)[][]): void
}
`;