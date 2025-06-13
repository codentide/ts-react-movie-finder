export async function catchError<T>(
  promise: Promise<T>
): Promise<[T, null] | [null, unknown]> {
  try {
    const data: T = await promise
    return [data, null]
  } catch (error) {
    console.error('Ocurrió un error: ' + error)
    return [null, error]
  }
}
