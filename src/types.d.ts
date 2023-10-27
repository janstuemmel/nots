type DefaultResult = {
  type: 'object' | 'unknown'
  value: string
}

type BarResult = {
  type: 'bar'
  value: {
    labels: string[]
    data: string[][]
  }
}

type HtmlResult = {
  type: 'html'
  value: string
}

type Result = DefaultResult | BarResult | HtmlResult

type SuccessResult = {
  type: 'success'
  values: Result[]
}

type ErrResult = {
  type: 'error'
  name: string
  message: string
}
