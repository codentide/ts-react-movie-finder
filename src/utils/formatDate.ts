export function formatDate(date: string | Date, lang?: string): string {
  if (typeof date === 'string') date = new Date(date)

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return date.toLocaleDateString(lang, options)
}
