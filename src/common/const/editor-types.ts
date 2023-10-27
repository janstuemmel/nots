export const editorTypes = `

type Dataset = {
  label: string
  data: number[]
}

type ChartData = {
  labels: string[]
  datasets: Dataset[]
}

declare namespace vm {

  /**
   * This function logs your variables to the output panel
   */ 
  function log(...args: unknown): void

  /**
   * This function prints your markdown to the output panel
   */ 
  function markdown(markdown: string): void

  /**
   * This function displays a bar chart in the output panel
   */ 
  function bar(labels: string[], data: number[][]): void
}
`;