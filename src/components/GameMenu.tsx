import { Icon } from '@iconify-icon/react'
import React, { useState, useRef } from 'react'
import PlayerCard from './PlayerCard'

const PLAYER_COLORS = [
  '#b60000',
  '#d38600',
  '#cdca00',
  '#1bb400',
  '#00c1b5',
  '#001ac1'
]

const PLAYER_TAGS = ['#Dominante', '#Intimidante', '#Poderoso']

export default function GameMenu() {
  const [inputValue, setInputValue] = useState<string>('')
  const [hasStartedTyping, setHasStartedTyping] = useState<boolean>(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setInputValue(value)

    if (!hasStartedTyping && value) {
      setHasStartedTyping(true)
    }
  }

  return (
    <section>
      <h1 className="text-lg text-center uppercase font-luckiest_guy tracking-wider">
        Verdad o Reto
      </h1>
      <p className="text-sm text-center font-josefin_sans font-light mb-4">
        Antes de jugar asegúrate de añadir los jugadores en la lista de abajo.
        👇
      </p>

      <form className="mt-2 text-sm font-josefin_sans">
        <label htmlFor="add-player">Escribe el nombre del jugador:</label>
        <div className="flex flex-wrap gap-2 mt-1 [&>input]:text-black [&>input]:font-medium [&>input]:outline-none [&>input]:px-4 [&>input]:py-2 [&>input]:rounded-md">
          <input
            value={inputValue}
            onChange={handleInputChange}
            className="focus:outline-2 focus:outline-primary_button focus:scale-95 transition-all"
            type="text"
            placeholder="John Carter"
            id="add-player"
            autoComplete="off"
          />
          <div className="flex gap-2 [&>button]:font-medium [&>button]:tracking-wider [&>button]:px-4 [&>button]:py-2 [&>button]:rounded-md relative">
            <button
              type="button"
              className="w-fit h-full bg-primary_button hover:bg-primary_button/60 hover:scale-95 transition-all"
            >
              Añadir
            </button>
          </div>
        </div>
      </form>

      {(inputValue || hasStartedTyping) && (
        <div>
          <h2 className="text-md uppercase font-luckiest_guy tracking-wider mt-4 mb-2">
            Previsualización del Jugador
          </h2>
          <PlayerCard playername={inputValue} />
          <div className="mt-4 flex items-center gap-2 [&>button]:border-2 [&>button]:border-white [&>button]:rounded-md [&>button]:p-2 [&>button]:grid [&>button]:place-content-center">
            <button className="hover:border-primary_button hover:text-primary_button transition-all">
              <Icon width={25} height={25} icon="oui:color" />
            </button>
            <button className="hover:border-primary_button hover:text-primary_button transition-all">
              <Icon
                width={25}
                height={25}
                icon="material-symbols:image-outline"
              />
            </button>
            <button className="hover:border-primary_button hover:text-primary_button transition-all">
              <Icon width={25} height={25} icon="mdi:tag" />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
