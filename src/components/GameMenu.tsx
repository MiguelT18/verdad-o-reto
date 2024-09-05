const PLAYER_COLORS = [
  '#b60000',
  '#d38600',
  '#cdca00',
  '#1bb400',
  '#00c1b5',
  '#001ac1'
]

export default function GameMenu() {
  return (
    <section>
      <h1 className="text-lg text-center uppercase font-luckiest_guy">
        Verdad o Reto
      </h1>
      <p className="text-sm text-center font-josefin_sans">
        Antes de jugar asegúrate de añadir los jugadores en la lista de abajo.
        👇
      </p>

      <form className="mt-2 text-sm font-josefin_sans">
        <label htmlFor="add-player">Escribe el nombre del jugador:</label>
        <div className="mt-1 [&>input]:text-black [&>input]:outline-none [&>input]:px-4 [&>input]:py-2 [&>input]:rounded-md [&>button]:px-4 [&>button]:py-2 [&>button]:rounded-md">
          <input type="text" placeholder="John Carter" id="add-player" />
          <button className="ml-4 bg-primary_button">Añadir</button>
        </div>
      </form>

      <div>
        <img src="" alt="" />
        <h2>Jugador 1</h2>
      </div>
    </section>
  )
}
