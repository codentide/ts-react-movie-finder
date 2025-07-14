import axios, { AxiosError } from 'axios'
import type { CustomError, TMDBErrorResponse } from '../types'

const BASE_URL = 'https://api.themoviedb.org/3/'
const API_KEY = import.meta.env.VITE_API_KEY

export const movieAPI = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  params: {
    api_key: API_KEY,
  },
})

movieAPI.interceptors.response.use(
  (response) => response,
  (error: AxiosError<TMDBErrorResponse>) => {
    let customError: CustomError
    if (error.response) {
      customError = {
        code: error.response.status,
        message:
          error.response.data?.status_message ||
          'Server error: ' + error.response.statusText,
        name: 'HTTP_ERROR_' + error.response.status,
        originalError: error,
      }
    } else if (error.request) {
      customError = {
        code: 'NETWORK_ERROR',
        message:
          'Unable to connect to the server. Please check your internet conexion',
        name: 'NETWORK_ERROR',
        originalError: error,
      }
    } else {
      customError = {
        code: 'UNKNOWN_ERROR',
        message:
          error.message ||
          'An unknown error occurred while sending the request',
        name: 'UNKNOWN_AXIOS_ERROR',
        originalError: error,
      }
    }

    return Promise.reject(customError)
  }
)
