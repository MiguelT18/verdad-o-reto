interface PlayerProps {
  playername: string
  color?: string
}

export default function PlayerCard({ playername, color }: PlayerProps) {
  return (
    <div
      className={`bg-[${color}] w-full max-w-[300px] sm:pr-10 pr-6 p-1 rounded-xl flex items-center gap-2 mt-2`}
    >
      <img
        className="w-[80px] h-auto aspect-square object-cover rounded-lg"
        src="/images/user-avatars/boys/Boy06.png"
        alt="Avatar user player"
      />
      <div className=" ml-1 pr-1 [&>h3]:text-sm [&>h3]:mb-1 [&>h3]:font-josefin_sans [&>h3]:font-medium">
        <h3>{playername}</h3>
        <div className="[&>span]:font-josefin_sans [&>span]:text-xs [&>span]:px-2 [&>span]:py-1 [&>span]:bg-white [&>span]:text-black [&>span]:rounded-full">
          <span>#Dominante</span>
        </div>
      </div>
    </div>
  )
}
