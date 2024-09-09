import { useRandomColor } from "src/hooks/useRandomColor"

interface PlayerProps {
  playername: string | undefined
  selectColor: string | undefined
  avatar: string | undefined
  tag: string | undefined
}

export default function PlayerCard({ playername, selectColor, avatar, tag }: PlayerProps) {
  const { getRandomColor } = useRandomColor()
  if (!selectColor) {
    const randomColor = getRandomColor()
    selectColor = randomColor
  }

  return (
    <div
      className={`w-full sm:pr-10 pr-6 p-1 rounded-xl flex items-center gap-2 mt-2`}
      style={{ backgroundColor: selectColor }}
    >
      <img
        className="w-[100px] h-auto aspect-square object-cover rounded-lg"
        src={avatar}
        alt="Avatar user player"
      />
      <div className=" ml-1 pr-1 [&>h3]:text-md [&>h3]:font-josefin_sans [&>h3]:font-medium">
        <h3>{playername}</h3>
        <div className="[&>span]:font-josefin_sans [&>span]:text-xs [&>span]:px-2 [&>span]:py-1 [&>span]:bg-white [&>span]:text-black [&>span]:rounded-full">
          <span>{tag}</span>
        </div>
      </div>
    </div>
  )
}
