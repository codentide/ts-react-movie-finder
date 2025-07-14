export type CustomError = {
  code: number | string
  message: string
  name: string
  originalError?: unknown
}

export type Success<T> = {
  data: T
  error: null
}

export type Failure = {
  data: null
  error: CustomError
}

export type APIResponse<T> = Success<T> | Failure

export interface TMDBErrorResponse {
  status_code: number
  status_message: string
}
