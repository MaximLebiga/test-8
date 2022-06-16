
export function createError(errors: Array<string | undefined>) {
  for (const error of errors) {
    if (error) {
      return <p>{error}</p>
    }
  }
  return null
}