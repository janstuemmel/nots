type Result = {
  type: string
  value: string
}

type SuccessResult = {
  type: 'success'
  values: Result[]
}
type ErrResult = {
  type: 'error'
  message: string
}
