export function getScore(average: number) {
  const stars = (average / 10) * 5
  const formattedStars = stars.toFixed(1)
  return formattedStars
}
