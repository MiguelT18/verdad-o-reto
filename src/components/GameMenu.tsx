import { Icon } from '@iconify-icon/react'
import PlayerCard from './PlayerCard'
import { PLAYER_COLORS, PLAYER_TAGS } from 'src/constants/player'
import { avatars } from '../lib/Avatars'
import usePlayerMethods from 'src/hooks/usePlayerMethods'

export default function GameMenu() {
  const { menuMethods, avatarMethods, colorMethods, inputMethods, tagMethods, elementsRef, playerListStorage } = usePlayerMethods()

  const { createPlayer, removePlayerEdit, isPreviewShown, menuStates, openMenuColor, openMenuAvatar, openMenuTags } = menuMethods

  const { menuAvatarRef, menuColorRef, menuTagRef } = elementsRef

  const { menuAvatars, menuColors, menuTags } = menuStates

  const { selectedTag, selectRandomTag, selectTag } = tagMethods

  const { selectedAvatar, selectAvatar, selectRandomAvatar, selectAvatarCategory } = avatarMethods

  const { selectedColor, selectColor, selectRandomColor } = colorMethods

  const { inputValue, inputChange } = inputMethods

  const getAvatarsByCategory = (category: string | undefined) => {
    const categoryData = avatars.find((cat) => cat.category === category)
    return categoryData ? categoryData.content : []
  }

  return (
    <main className="bg-secondary_color border-2 w-full h-auto max-w-[900px] mx-auto rounded-3xl p-6">
      <h1 className="text-xl text-center uppercase font-luckiest_guy tracking-wider">
        Verdad o Reto
      </h1>
      <p className="text-md text-center font-josefin_sans font-light mb-4">
        Antes de jugar asegúrate de añadir los jugadores en la lista de abajo.
        👇
      </p>

      <form className="mt-2 text-sm font-josefin_sans" onSubmit={createPlayer}>
        <label className='text-md font-light' htmlFor="add-player">Escribe el nombre del jugador:</label>
        <div className="flex flex-wrap gap-2 mt-1 [&>input]:text-md [&>input]:text-black [&>input]:font-medium [&>input]:outline-none [&>input]:px-4 [&>input]:pb-2 [&>input]:pt-3 [&>input]:rounded-xl">
          <input
            value={inputValue}
            onChange={inputChange}
            className="focus:outline-2 focus:outline-primary_button focus:scale-95 transition-all"
            type="text"
            placeholder="John Carter"
            id="add-player"
            autoComplete="off"
          />
          <div className="flex gap-2 [&>button]:font-medium [&>button]:tracking-wider [&>button]:px-4 [&>button]:pb-2 [&>button]:pt-3 [&>button]:rounded-xl relative">
            <button type='button' onClick={removePlayerEdit} className='flex items-center justify-center gap-2 text-black bg-white hover:bg-white/80 hover:scale-95 active:scale-90 transition-all'>
              <Icon width={28} height={28} icon="octicon:trash-24" className='mb-1' />
            </button>
            <button
              type="submit"
              className="w-fit h-full text-md tracking-wider bg-primary_button hover:bg-primary_button/60 hover:scale-95 active:scale-90 transition-all"
            >
              Añadir
            </button>
          </div>
        </div>
      </form>

      {isPreviewShown && (
        <section>
          <h2 className="text-md uppercase font-luckiest_guy tracking-wider mt-4 mb-2">
            Previsualización del Jugador
          </h2>

          <div className='grid grid-cols-2 max-sm:grid-cols-1'>
            <PlayerCard playername={inputValue === '' ? 'Sin nombre...' : inputValue} color={selectedColor} avatar={selectedAvatar} tag={selectedTag} />
          </div>

          <div className="mt-5 flex items-center gap-2 w-full [&>button]:border-2 [&>button]:border-white [&>button]:rounded-xl [&>button]:p-2 [&>button]:grid [&>button]:place-content-center relative">
            <button onClick={openMenuColor} className="hover:border-primary_button hover:text-primary_button hover:scale-95 active:scale-90 transition-all">
              <Icon width={35} height={35} icon="oui:color" />
            </button>
            {menuColors && (
              <div ref={menuColorRef} className='bg-secondary_color border-2 absolute p-4 rounded-3xl top-[130%] shadow-black/60 shadow-xl z-50'>
                <div className='flex flex-wrap justify-center gap-2'>
                  {PLAYER_COLORS.map((color, index) => {
                    const isColorUsed = playerListStorage.some((player) => player.color === color)

                    return (
                      <button disabled={isColorUsed || color === selectedColor} onClick={() => selectColor(color)} key={index} className={`grid place-content-center size-12 cursor-pointer rounded-xl transition-all ${isColorUsed || color === selectedColor ? 'border-2 hover:border-red-500 hover:text-red-500' : 'active:scale-90 hover:scale-95'}`} style={{ backgroundColor: isColorUsed || color === selectedColor ? '' : color }}>
                        {(isColorUsed || color === selectedColor) && (
                          <Icon width={30} height={30} icon="material-symbols:block" />
                        )}
                      </button>
                    )
                  }
                  )}
                </div>

                <div className='flex gap-2 mt-4'>
                  <button onClick={selectRandomColor} className='flex items-center justify-center gap-2 w-full bg-primary_button rounded-full px-4 pb-2 pt-3 font-josefin_sans text-md cursor-pointer tracking-wider font-medium transition-all hover:scale-95 active:scale-90'>
                    <Icon width={25} height={25} icon="vaadin:random" className='mb-1' />
                    Aleatorio
                  </button>
                  <button onClick={openMenuColor} className='w-full flex justify-center bg-white text-black rounded-full px-4 py-2 font-josefin_sans text-md cursor-pointer tracking-wider font-medium transition-all hover:scale-95 active:scale-90'>Aceptar</button>
                </div>
              </div>
            )}

            <button onClick={openMenuAvatar} className="hover:border-primary_button hover:text-primary_button hover:scale-95 active:scale-90 transition-all">
              <Icon
                width={35}
                height={35}
                icon="material-symbols:image-outline"
              />
            </button>
            {
              menuAvatars && (
                <div ref={menuAvatarRef} className='bg-secondary_color shadow-black/60 shadow-xl border-2 rounded-3xl top-[130%] absolute w-fit z-50'>
                  <div className="w-full inline-flex rounded-md shadow-sm" role="group">
                    {avatars.map((avatar, index) => (
                      <button onClick={() => selectAvatarCategory(avatar.category)} key={index} className='w-full px-4 pt-4 pb-3 tracking-wider text-md font-medium font-josefin_sans border focus:z-10 focus:ring-2 focus:ring-primary_button focus:text-white bg-primary_button/30 border-white/30 text-white hover:text-white hover:bg-primary_button/60 first:rounded-tl-3xl last:rounded-tr-3xl'>{avatar.category}</button>
                    ))}
                  </div>

                  <div className='px-6 py-8 grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2 w-full'>
                    {getAvatarsByCategory(selectedAvatar).map((avatar, index) => {
                      const isAvatarUsed = playerListStorage.some((player) => player.avatar === avatar.image)

                      return (
                        <button disabled={isAvatarUsed} key={index} onClick={() => selectAvatarCategory(avatar.image)} className={`relative ${isAvatarUsed ? '[&>img]:hover:scale-150 overflow-hidden rounded-md' : ''}`}>
                          <img src={avatar.image} alt="Avatar Image Button" className={`w-full h-auto aspect-square object-cover cursor-pointer hover:scale-110 active:scale-90 transition-all rounded-md`} />
                          <Icon width={50} height={50} icon="material-symbols:block" className={`absolute z-10 bg-black/70 size-full top-0 left-0 grid place-content-center transition-all ${isAvatarUsed ? 'block hover:text-red-500 cursor-pointer [&>img]:hover:scale-150 overflow-hidden rounded-md' : 'hidden'}`} />
                        </button>
                      )
                    })}
                  </div>
                  <div className='flex gap-2 mb-6 mx-4'>
                    <button onClick={selectRandomAvatar} className='flex items-center justify-center gap-2 w-full bg-primary_button rounded-full px-4 pb-2 pt-3 font-josefin_sans text-md cursor-pointer tracking-wider font-medium transition-all hover:scale-95  active:scale-90'>
                      <Icon width={25} height={25} icon="vaadin:random" className='mb-1' />
                      Aleatorio
                    </button>
                    <button onClick={openMenuAvatar} className='w-full flexjustify-center bg-white text-black rounded-full px-4 py-2 font-josefin_sans text-md cursor-pointer tracking-wider font-medium transition-all hover:scale-95 active:scale-90'>Aceptar</button>
                  </div>
                </div>
              )
            }

            <button onClick={openMenuTags} className="hover:border-primary_button hover:text-primary_button hover:scale-95 active:scale-90 transition-all">
              <Icon width={35} height={35} icon="mdi:tag" />
            </button>
            {
              menuTags && (
                <div ref={menuTagRef} className='bg-secondary_color shadow-black/60 shadow-xl border-2 absolute p-4 rounded-md top-[130%] z-50'>
                  <div className='flex flex-wrap gap-2'>
                    {PLAYER_TAGS.map((tag, index) => (
                      <button disabled={tag === selectedTag} onClick={() => selectTag(tag)} key={index} className={`font-josefin_sans text-sm px-2 py-1 bg-white text-black rounded-full cursor-pointer  transition-all ${tag === selectedTag ? 'bg-white/60' : 'hover:scale-95 active:scale-90 hover:bg-white/90'}`}>{tag}</button>
                    ))}
                  </div>

                  <div className='flex gap-2 mt-4'>
                    <button onClick={selectRandomTag} className='flex items-center justify-center gap-2 w-full bg-primary_button rounded-full px-4 pb-2 pt-3 font-josefin_sans text-md cursor-pointer tracking-wider font-medium transition-all hover:scale-95 active:scale-90'>
                      <Icon width={25} height={25} icon="vaadin:random" className='mb-1' />
                      Aleatorio
                    </button>
                    <button onClick={openMenuTags} className='w-full flex justify-center bg-white text-black rounded-full px-4 pb-2 pt-3 font-josefin_sans text-md cursor-pointer tracking-wider font-medium transition-all hover:scale-95 active:scale-90'>Aceptar</button>
                  </div>
                </div>
              )
            }
          </div>
        </section>
      )}
      <section>
        {playerListStorage.length !== 0 && (
          <>
            <hr className='mt-8 mb-4' />
            <h2 className="text-xl uppercase font-luckiest_guy tracking-wider text-center">Lista de Jugadores</h2>
          </>
        )}
        <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-2'>
          {
            playerListStorage?.map((player, index) => (
              <PlayerCard key={index} avatar={player.avatar} playername={player.playername} color={player.color} tag={player.tag} />
            ))
          }
        </div>

        <button className='w-full py-3 mt-8 text-md tracking-wider font-josefin_sans rounded-full bg-primary_button hover:bg-primary_button/60 hover:scale-95 active:scale-90 transition-all'>Jugar ya!</button>
      </section>
    </main >
  )
}
