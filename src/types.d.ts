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

type Result = UnknownResult | ObjectResult | BarResult | HtmlResult | TableResult

type SuccessResult = {
  type: 'success'
  values: Result[]
}

type ErrResult = {
  type: 'error'
  name: string
  message: string
}
