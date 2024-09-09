export function useRandomAvatar() {
    const getRandomAvatar = () => {
        const boysCount = 18
        const girlsCount = 19

        const isBoy = Math.random() < 0.5
        const category = isBoy ? 'Boys' : 'Girls'

        const imageIndex = Math.floor(Math.random() * (isBoy ? boysCount : girlsCount)) + 1

        return `images/user-avatars/${category}/${category.slice(0, -1)}${imageIndex.toString().padStart(2, '0')}.webp`
    }

    return { getRandomAvatar }
}