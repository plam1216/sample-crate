const alphabet = "abcdefghijklmnopqrstuvwxyz"

// random search term generated up to 3 characters long
export const getRandomSearchTerm = (): string => {
    let termLength = Math.random() * 3
    let searchTerm = ''
    for (let i = 0; i < termLength; i++) {
        searchTerm += alphabet.charAt(Math.floor(Math.random() * 27))
    }

    return searchTerm
}