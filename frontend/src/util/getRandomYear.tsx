export const getRandomYear = (year: number = 122): number => {
    return Math.floor(Math.random() * year) + 1900
  }