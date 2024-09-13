import { Icon } from '@iconify-icon/react'
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
      className={`w-full rounded-xl flex items-center mt-2`}
      style={{ backgroundColor: color }}
    >
      <img
        className="w-[100px] h-full aspect-square object-cover rounded-l-xl"
        src={avatar}
        alt="Avatar user player"
      />

      <div className="w-full flex max-md:flex-col items-end justify-between gap-1 ml-2 [&>div>h3]:text-md [&>div>h3]:font-josefin_sans [&>div>h3]:font-bold">
        <div className='w-full py-2'>
          <h3>{playername}</h3>
          <div className="mt-2 [&>span]:font-josefin_sans [&>span]:text-sm [&>span]:px-2 [&>span]:py-1 [&>span]:bg-white [&>span]:text-black [&>span]:rounded-full">
            <span>{tag}</span>
          </div>
        </div>

        <div className='w-full max-sm:pr-1 flex gap-2 [&>span]:block [&>span]:w-fit'>
          <span>
            <Icon icon='lucide:edit' width={25} height={25} />
          </span>
          <span>
            <Icon icon='octicon:trash-24' width={25} height={25} />
          </span>
        </div>
      </div>
    </div>
  )
}
