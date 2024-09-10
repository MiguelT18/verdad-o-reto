import { useRandomColor } from "src/hooks/useRandomColor"
import type { PlayerProps } from "src/types/types"

export default function PlayerCard({ playername, color, avatar, tag }: PlayerProps) {
  const { getRandomColor } = useRandomColor()
  if (!color) {
    const randomColor = getRandomColor()
    color = randomColor
  }

  return (
    <div
      className={`size-full sm:pr-10 rounded-xl flex items-center gap-2 mt-2`}
      style={{ backgroundColor: color }}
    >
      <img
        className="w-[100px] h-full aspect-square object-cover rounded-l-xl"
        src={avatar}
        alt="Avatar user player"
      />
      <div className=" ml-2 [&>h3]:text-md [&>h3]:font-josefin_sans [&>h3]:font-bold">
        <h3>{playername}</h3>
        <div className="mt-2 [&>span]:font-josefin_sans [&>span]:text-sm [&>span]:px-2 [&>span]:py-1 [&>span]:bg-white [&>span]:text-black [&>span]:rounded-full">
          <span>{tag}</span>
        </div>
      </div>
    </div>
  )
}
