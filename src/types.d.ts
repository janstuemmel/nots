type UnknownResult = {
  type: 'unknown'
  value: string
}

type ObjectResult = {
  type: 'object'
  value: object
}

type BarResult = {
  type: 'bar'
  value: {
    labels: string[]
    data: string[][]
  }
}

type LineResult = {
  type: 'line'
  value: {
    labels: string[]
    data: string[][]
  }
}

type TableResult = {
  type: 'table'
  value: {
    labels: string[]
    data: string[][]
  }
}

type HtmlResult = {
  type: 'html'
  value: string
}

type Result = UnknownResult | ObjectResult | BarResult | LineResult | HtmlResult | TableResult

type SuccessResult = {
  type: 'success'
  values: Result[]
  executionTime: number
  memoryUsed: number
}

type ErrResult = {
  type: 'error'
  name: string
  message: string
  executionTime: number
  memoryUsed: number
}

type Settings = {
  memoryLimit: number
  executionTimeout: number
  lineNumbers: 'on' | 'off' | 'interval' | 'relative'
  tabSize: 2 | 4 | 8
  fontSize: number
}
