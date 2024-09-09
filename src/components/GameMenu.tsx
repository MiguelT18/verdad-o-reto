import { Icon } from '@iconify-icon/react'
import React, { useEffect, useState, useRef, type FormEvent } from 'react'
import PlayerCard from './PlayerCard'
import { PLAYER_COLORS, PLAYER_TAGS } from 'src/constants/player'
import { useRandomColor } from 'src/hooks/useRandomColor'
import { avatars } from '../lib/avatars'
import { useRandomAvatar } from 'src/hooks/useRandomAvatar'
import { useRandomTag } from 'src/hooks/useRandomTag'

interface PlayerStorage {
  color?: string
  avatar?: string
  tag?: string
  playername?: string
}

export default function GameMenu() {
  // HOOKS
  const { getRandomColor } = useRandomColor()
  const { getRandomAvatar } = useRandomAvatar()
  const { getRandomTag } = useRandomTag()

  // STATE HOOKS
  const [isPreviewShown, setIsPreviewShown] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [hasStartedTyping, setHasStartedTyping] = useState<boolean>(false)
  const [playerStorage, setPlayerStorage] = useState<PlayerStorage>(() => {
    const storedPlayer = localStorage.getItem('player')
    return storedPlayer ? JSON.parse(storedPlayer) as PlayerStorage : {}
  })
  const [playersListStorage, setPlayersListStorage] = useState<PlayerStorage[]>(() => {
    const storedPlayersList = localStorage.getItem('playersList')
    return storedPlayersList ? JSON.parse(storedPlayersList) as PlayerStorage[] : []
  })

  // menu color
  const [menuColor, setMenuColor] = useState<boolean>(false)
  const [selectColor, setSelectColor] = useState<string | undefined>('')

  // menu avatar
  const [menuAvatar, setMenuAvatar] = useState<boolean>(false)
  const [selectAvatarCategory, setSelectAvatarCategory] = useState<string>('Chicos')
  const [selectAvatar, setSelectAvatar] = useState<string | undefined>('')

  // menu tag
  const [menuTags, setMenuTags] = useState<boolean>(false)
  const [selectTag, setSelectTag] = useState<string>(getRandomTag)

  // REF HOOKS
  const menuColorRef = useRef<HTMLDivElement>(null)
  const menuAvatarRef = useRef<HTMLDivElement>(null)
  const menuTagsRef = useRef<HTMLDivElement>(null)

  // METHODS
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    const capitalizedValue = value
      .split(' ')
      .map((word) => word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : '')
      .join(' ');

    setInputValue(capitalizedValue)

    if (!hasStartedTyping && capitalizedValue) {
      const randomColor = getRandomColor()
      const randomTag = getRandomTag()
      const randomAvatar = getRandomAvatar()

      setSelectColor(randomColor)
      setSelectTag(randomTag)
      setSelectAvatar(randomAvatar)

      setIsPreviewShown(true)

      playersListStorage.map((player: PlayerStorage) => {
        const { playername, color, tag, avatar } = player

        setPlayerStorage((prevState => ({
          ...prevState,
          playername: playername,
          color: color,
          tag: tag,
          avatar: avatar,
        })))
      })

      setHasStartedTyping(true)
    }
  }

  const handleChangeTag = () => {
    setMenuColor(false)
    setMenuAvatar(false)
    setMenuTags(!menuTags)
  }

  const handleSelectTag = (tag: string) => {
    // setMenuTags(false)
    setSelectTag(tag)
    setPlayerStorage((prevState) => ({
      ...prevState,
      tag: tag
    }))
  }

  const handleSelectRandomTag = () => {
    const randomTag = getRandomTag()
    setSelectTag(randomTag)
    setPlayerStorage((prevState => ({
      ...prevState,
      tag: randomTag
    })))
  }

  const handleEditColor = () => {
    setMenuTags(false)
    setMenuAvatar(false)
    setMenuColor(!menuColor)
  }

  const handleSelectColor = (color: string) => {
    // setMenuColor(false)  
    setSelectColor(color)
    setPlayerStorage((prevState => ({
      ...prevState,
      color: color
    })))
  }

  const handleSelectRandomColor = () => {
    const randomColor = getRandomColor()
    setSelectColor(randomColor)
    setPlayerStorage((prevState) => ({
      ...prevState,
      color: randomColor
    }))
  }

  const handleEditAvatar = () => {
    setMenuTags(false)
    setMenuColor(false)
    setMenuAvatar(!menuAvatar)
  }

  const selectedCategory = avatars.find((avatar) => avatar.category === selectAvatarCategory)

  const handleSelectAvatarCategory = (avatar: string) => {
    setSelectAvatarCategory(avatar)
  }

  const handleSelectAvatar = (avatar: string) => {
    // setMenuAvatar(false)
    setSelectAvatar(avatar)
    setPlayerStorage((prevState) => ({
      ...prevState,
      avatar: avatar
    }))
  }

  const handleSelectRandomAvatar = () => {
    const randomAvatar = getRandomAvatar()

    setSelectAvatar(randomAvatar)
    setPlayerStorage((prevState) => ({
      ...prevState,
      avatar: randomAvatar
    }))
  }

  const handleSubmitPlayer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (inputValue.trim() === '') return

    const newPlayer: PlayerStorage = {
      playername: inputValue,
      color: selectColor,
      avatar: selectAvatar,
      tag: selectTag
    }

    setPlayersListStorage((prevPlayersList) => {
      const updatedList = [...prevPlayersList, newPlayer]
      localStorage.setItem('playersList', JSON.stringify(updatedList))
      return updatedList
    })

    setInputValue('')
    setHasStartedTyping(false)
    setIsPreviewShown(false)
  }

  const handleRemovePreview = () => {
    if (isPreviewShown) {
      setIsPreviewShown(false)
      setHasStartedTyping(false)
      setInputValue('')
    }
  }

  // const handleRemovePlayers = () => {
  //   localStorage.clear()
  //   setPlayersListStorage([])
  // }

  useEffect(() => {
    localStorage.setItem('player', JSON.stringify(playerStorage))
  }, [playerStorage])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuColorRef.current && !menuColorRef.current.contains(event.target as Node)) {
        setMenuColor(false)
      }
      if (menuAvatarRef.current && !menuAvatarRef.current.contains(event.target as Node)) {
        setMenuAvatar(false)
      }
      if (menuTagsRef.current && !menuTagsRef.current.contains(event.target as Node)) {
        setMenuTags(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <main className="bg-secondary_color border-2 w-full h-auto max-w-[900px] mx-auto rounded-2xl p-6">
      <h1 className="text-lg text-center uppercase font-luckiest_guy tracking-wider">
        Verdad o Reto
      </h1>
      <p className="text-md text-center font-josefin_sans font-light mb-4">
        Antes de jugar asegúrate de añadir los jugadores en la lista de abajo.
        👇
      </p>

      <form className="mt-2 text-sm font-josefin_sans" onSubmit={handleSubmitPlayer}>
        <label className='text-md' htmlFor="add-player">Escribe el nombre del jugador:</label>
        <div className="flex flex-wrap gap-2 mt-1 [&>input]:text-black [&>input]:font-medium [&>input]:outline-none [&>input]:px-4 [&>input]:pb-2 [&>input]:pt-3 [&>input]:rounded-md">
          <input
            value={inputValue}
            onChange={handleInputChange}
            className="focus:outline-2 focus:outline-primary_button focus:scale-95 transition-all"
            type="text"
            placeholder="John Carter"
            id="add-player"
            autoComplete="off"
          />
          <div className="flex gap-2 [&>button]:font-medium [&>button]:tracking-wider [&>button]:px-4 [&>button]:pb-2 [&>button]:pt-3 [&>button]:rounded-md relative">
            <button type='button' onClick={handleRemovePreview} className='flex items-center justify-center gap-2 text-black bg-white hover:bg-white/80 hover:scale-95 active:scale-90 transition-all'>
              <Icon width={25} height={25} icon="octicon:trash-24" className='mb-1' />
            </button>
            <button
              type="submit"
              className="w-fit h-full text-sm tracking-wider bg-primary_button hover:bg-primary_button/60 hover:scale-105 active:scale-95 transition-all"
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

          <div className='grid grid-cols-2'>
            <PlayerCard playername={inputValue === '' ? 'Sin nombre...' : inputValue} selectColor={selectColor} avatar={selectAvatar} tag={selectTag} />
          </div>

          <div className="mt-4 flex items-center gap-2 w-full [&>button]:border-2 [&>button]:border-white [&>button]:rounded-md [&>button]:p-2 [&>button]:grid [&>button]:place-content-center relative">
            <button onClick={handleEditColor} className="hover:border-primary_button hover:text-primary_button hover:scale-110 active:scale-95 transition-all">
              <Icon width={40} height={40} icon="oui:color" />
            </button>
            {menuColor && (
              <div ref={menuColorRef} className='bg-secondary_color border-2 absolute p-4 rounded-lg top-[130%] shadow-black/60 shadow-xl z-50'>
                <div className='flex flex-wrap justify-center gap-2'>
                  {PLAYER_COLORS.map((color, index) => {
                    const hasAdded = playersListStorage.some(player => player.color === color)

                    return (
                      <button disabled={hasAdded} onClick={() => handleSelectColor(color)} key={index} className={`grid place-content-center size-12 cursor-pointer rounded-md hover:scale-110 transition-all ${hasAdded ? 'border-2 hover:scale-100 active:scale-100 hover:border-red-500 hover:text-red-500' : 'active:scale-95'}`} style={{ backgroundColor: hasAdded ? '' : color }}>
                        {hasAdded && (
                          <Icon width={30} height={30} icon="material-symbols:block" />
                        )}
                      </button>
                    )
                  }
                  )}
                </div>

                <div className='flex gap-2 mt-4'>
                  <button onClick={handleSelectRandomColor} className='flex items-center justify-center gap-2 w-full bg-primary_button rounded-full px-4 pb-2 pt-3 font-josefin_sans text-md cursor-pointer tracking-wider font-medium transition-all hover:scale-105 active:scale-95'>
                    <Icon width={25} height={25} icon="vaadin:random" className='mb-1' />
                    Aleatorio
                  </button>
                  <button onClick={handleEditColor} className='w-full flex justify-center bg-white text-black rounded-full px-4 py-2 font-josefin_sans text-md cursor-pointer tracking-wider font-medium transition-all hover:scale-105 active:scale-95'>Aceptar</button>
                </div>
              </div>
            )}

            <button onClick={handleEditAvatar} className="hover:border-primary_button hover:text-primary_button hover:scale-110 active:scale-95 transition-all">
              <Icon
                width={40}
                height={40}
                icon="material-symbols:image-outline"
              />
            </button>
            {
              menuAvatar && (
                <div ref={menuAvatarRef} className='bg-secondary_color shadow-black/60 shadow-xl border-2 rounded-lg top-[130%] absolute w-fit z-50'>
                  <div className="w-full inline-flex rounded-md shadow-sm" role="group">
                    {avatars.map((avatar, index) => (
                      <button onClick={() => handleSelectAvatarCategory(avatar.category)} key={index} className='w-full px-4 pt-4 pb-3 tracking-wider text-md font-medium font-josefin_sans border rounded-lg focus:z-10 focus:ring-2 focus:ring-primary_button focus:text-white bg-primary_button/30 border-white/30 text-white hover:text-white hover:bg-primary_button/60'>{avatar.category}</button>
                    ))}
                  </div>

                  <div className='px-4 py-4 grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2 w-full'>
                    {selectedCategory?.content.map(avatar => {
                      const hasAdded = avatar.image === selectAvatar
                      const addStyles = '[&>img]:hover:scale-150 overflow-hidden rounded-md'

                      return (
                        (
                          <button disabled={hasAdded} key={avatar.id} onClick={() => handleSelectAvatar(avatar.image)} className={`relative ${hasAdded ? addStyles : ''}`}>
                            <img src={avatar.image} alt="Avatar Image Button" className={`w-full h-auto aspect-square object-cover cursor-pointer hover:scale-110 active:scale-90 transition-all rounded-md`} />
                            <Icon width={50} height={50} icon="material-symbols:block" className={`absolute z-10 bg-black/70 size-full top-0 left-0 grid place-content-center transition-all ${hasAdded ? 'block hover:text-red-500 cursor-pointer' : 'hidden'}`} />
                          </button>
                        )
                      )
                    })}
                  </div>
                  <div className='flex gap-2 mb-4 mx-4'>
                    <button onClick={handleSelectRandomAvatar} className='flex items-center justify-center gap-2 w-full bg-primary_button rounded-full px-4 pb-2 pt-3 font-josefin_sans text-md cursor-pointer tracking-wider font-medium transition-all hover:scale-95  active:scale-90'>
                      <Icon width={25} height={25} icon="vaadin:random" className='mb-1' />
                      Aleatorio
                    </button>
                    <button onClick={handleEditAvatar} className='w-full flexjustify-center bg-white text-black rounded-full px-4 py-2 font-josefin_sans text-md cursor-pointer tracking-wider font-medium transition-all hover:scale-95 active:scale-90'>Aceptar</button>
                  </div>
                </div>
              )
            }

            <button onClick={handleChangeTag} className="hover:border-primary_button hover:text-primary_button hover:scale-110 active:scale-95 transition-all">
              <Icon width={40} height={40} icon="mdi:tag" />
            </button>
            {
              menuTags && (
                <div ref={menuTagsRef} className='bg-secondary_color shadow-black/60 shadow-xl border-2 absolute p-4 rounded-md top-[130%] z-50'>
                  <div className='flex flex-wrap gap-2'>
                    {PLAYER_TAGS.map((tag, index) => (
                      <button onClick={() => handleSelectTag(tag)} key={index} className='font-josefin_sans text-xs px-2 py-1 bg-white text-black rounded-full cursor-pointer hover:bg-white/90 hover:scale-105 active:scale-100 transition-all'>{tag}</button>
                    ))}
                  </div>

                  <div className='flex gap-2 mt-4'>
                    <button onClick={handleSelectRandomTag} className='flex items-center justify-center gap-2 w-full bg-primary_button rounded-full px-4 pb-2 pt-3 font-josefin_sans text-md cursor-pointer tracking-wider font-medium transition-all hover:scale-105 active:scale-95'>
                      <Icon width={25} height={25} icon="vaadin:random" className='mb-1' />
                      Aleatorio
                    </button>
                    <button onClick={handleChangeTag} className='w-full flex justify-center bg-white text-black rounded-full px-4 pb-2 pt-3 font-josefin_sans text-md cursor-pointer tracking-wider font-medium transition-all hover:scale-105 active:scale-95'>Aceptar</button>
                  </div>
                </div>
              )
            }
          </div>
        </section>
      )}
      <section>
        {playersListStorage.length !== 0 && (
          <>
            <hr className='my-8' />
            <h2 className="text-md uppercase font-luckiest_guy tracking-wider mb-2 text-center">Lista de Jugadores</h2>
          </>
        )}
        <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-2'>
          {
            playersListStorage?.map((player, index) => (
              <PlayerCard key={index} avatar={player.avatar} playername={player.playername} selectColor={player.color} tag={player.tag} />
            ))
          }
        </div>

        <button className='w-full py-3 mt-8 text-md tracking-wider font-josefin_sans rounded-full bg-primary_button hover:bg-primary_button/60 hover:scale-95 active:scale-90 transition-all'>Jugar ya!</button>
      </section>
    </main >
  )
}
