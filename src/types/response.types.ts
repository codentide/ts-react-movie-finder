export type CustomError = {
  code: number
  name: string
  message: string
}

export type Success<T> = {
  data: T
  error: null
}

export type Failure = {
  data: null
  error: CustomError
}
