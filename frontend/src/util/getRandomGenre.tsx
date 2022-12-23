const genres = [
    "Blues",
    "Brass & Military",
    // "Children's",
    "Classical",
    "Electronic",
    "Folk, World, & Country",
    "Funk / Soul",
    "Hip-Hop",
    "Jazz",
    "Latin",
    // "Non-Music",
    "Pop",
    "Reggae",
    // "Rock",
    // "Stage & Screen"
]

// get random genre from array
export const getRandomGenre = (): string => {
    return genres[Math.floor(Math.random() * genres.length)]
}