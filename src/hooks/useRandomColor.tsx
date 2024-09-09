import { PLAYER_COLORS } from "src/constants/player"

export function useRandomColor() {
    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * PLAYER_COLORS.length)
        const selectedColor = PLAYER_COLORS[randomIndex]

        return selectedColor
    }

    return { getRandomColor }
}