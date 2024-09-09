import { PLAYER_TAGS } from "src/constants/player"

export function useRandomTag() {
    const getRandomTag = () => {
        const RandomIndex = Math.floor(Math.random() * PLAYER_TAGS.length)
        const selectedTag = PLAYER_TAGS[RandomIndex]

        return selectedTag
    }

    return { getRandomTag }
}