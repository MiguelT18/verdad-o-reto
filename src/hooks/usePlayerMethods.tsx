import { type FormEvent, useEffect, useRef, useState } from "react"
import type { MenuStateProps, PlayerProps } from "src/types/types"
import { useRandomColor } from "./useRandomColor"
import { useRandomAvatar } from "./useRandomAvatar"
import { useRandomTag } from "./useRandomTag"
import { PLAYER_COLORS } from "src/constants/player"

export default function usePlayerMethods() {
	// ? USE STATES
	// === Player Preview States ===
	const [isPreviewShown, setIsPreviewShown] = useState<boolean>(false)

	// === Menu Avatar States ===
	// Tracks whether the avatars menu is open or closed.
	const [menuAvatars, setMenuAvatars] = useState<boolean>(false)
	// Tracks whenever the avatar is selected
	const [selectedAvatar, setAvatarSelected] = useState<string | undefined>('')
	// Tracks if the current avatar is disabled
	const [isAvatarDisabled, setIsAvatarDisabled] = useState<boolean>(false)

	// === Menu Tags States ===
	// Tracks whether the tags menu is open or closed.
	const [menuTags, setMenuTags] = useState<boolean>(false)
	// Tracks whenever the tag is selected
	const [selectedTag, setSelectedTag] = useState<string | undefined>('')
	// Tracks if the current tag is disabled
	const [isTagDisabled, setIsTagDisabled] = useState<boolean>(false)
	// Tracks wich avatar category was selected
	const [selectedAvatarCategory, setSelectedAvatarCategory] = useState<string>('Chicos')

	// === Menu Color States ===
	//Tracks wheter the colors menu is open or closed.
	const [menuColors, setMenuColors] = useState<boolean>(false)
	// Tracks whenever the color is selected
	const [selectedColor, setColorSelected] = useState<string | undefined>('')

	// === Input States ===
	// Tracks the input value for creating a new player.
	const [inputValue, setInputValue] = useState<string | undefined>('')
	// Trackas when the user has started typing
	const [hasStartedTyping, setHasStartedTyping] = useState<boolean>(false)

	// === Local Storage States ===
	// Manages player data stored in local storage.
	const [playerStorage, setPlayerStorage] = useState<PlayerProps>(() => {
		const storedPlayer = localStorage.getItem('player')
		return storedPlayer ? JSON.parse(storedPlayer) as PlayerProps : {}
	})
	// Manages the list of players stored in local storage.
	const [playerListStorage, setPlayerListStorage] = useState<PlayerProps[]>(() => {
		const storedPlayerList = localStorage.getItem('playerList')
		return storedPlayerList ? JSON.parse(storedPlayerList) as PlayerProps[] : []
	})

	// ? CUSTOM HOOKS
	// To get a random color.
	const { getRandomColor } = useRandomColor()
	// To get a random avatar.
	const { getRandomAvatar } = useRandomAvatar()
	// To get a random tag.
	const { getRandomTag } = useRandomTag()

	// To represent the current state of the menu
	const menuStates: MenuStateProps = { menuColors, menuTags, menuAvatars }

	// Reference to elements
	const elementsRef = {
		menuColorRef: useRef<HTMLDivElement>(null),
		menuAvatarRef: useRef<HTMLDivElement>(null),
		menuTagRef: useRef<HTMLDivElement>(null)
	}

	// ? COLOR METHODS
	const colorMethods = {
		/**
		 * Selects a color and updates player storage with the selected color.
		 * @param color - The color to be selected.
		 */
		selectColor: (color: string) => {
			setColorSelected(color)
			setPlayerStorage((prevState) => ({ ...prevState, color }))
		},
		/**
		 * Selects a random color and updates player storage with the random color.
		*/
		selectRandomColor: () => {
			const usedColors = playerListStorage.map((player) => player.color)

			let availableColors = PLAYER_COLORS.filter((color) => !usedColors.includes(color) && color !== selectedColor)

			if (availableColors.length === 0) {
				availableColors = PLAYER_COLORS.filter((color) => color != selectedColor)
			}

			const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)]

			setColorSelected(randomColor)
			setPlayerStorage((prevState) => ({
				...prevState,
				color: randomColor
			}))
		},
		// Returns the currently selected color.
		selectedColor,
	}

	// ? AVATAR METHODS
	const avatarMethods = {
		/**
		 * Selects an avatar and updates player storage with the selected avatar.
		 * @param avatar - The avatar to be selected
		 */
		selectAvatar: (avatar: string) => {
			const isAvatarUsed = playerListStorage.some((player: PlayerProps) => player.avatar === avatar && selectedAvatar)
			if (isAvatarUsed && avatar !== selectedAvatar) {
				setIsAvatarDisabled(true)
			} else {
				setAvatarSelected(avatar)
				setPlayerStorage((prevState) => ({
					...prevState,
					avatar: avatar
				}))
			}
		},
		/**
		 * Selects a random avatar and updates player storage with the random avatar.
		 */
		selectRandomAvatar: () => {
			const isAvatarUsed = playerListStorage.some((player: PlayerProps) => player.avatar === selectedAvatar)
			if (isAvatarUsed) {
				setIsAvatarDisabled(true)
			}

			const randomAvatar = getRandomAvatar()

			setAvatarSelected(randomAvatar)
			setPlayerStorage((prevState) => ({
				...prevState,
				avatar: randomAvatar
			}))
		},
		/**
		 * Selects an avatar category and updates the selectedAvatarCategory state
		 * @param category - The category of avatars to be selected.
		 */
		selectAvatarCategory: (category: string) => {
			if (category) {
				setSelectedAvatarCategory(category)
			}
		},
		// Selected Avatar Value
		selectedAvatar,
		// Selected Avatar Category Value
		isAvatarDisabled
	}

	// ? TAG METHODS
	const tagMethods = {
		/**
		 * Selects a tag and updates player storage with the selected tag.
		 * @param avatar - The tag to be selected
		 */
		selectTag: (tag: string) => {
			const isTagUsed = playerListStorage.some((player: PlayerProps) => player.tag === tag && selectedTag)
			if (isTagUsed) {
				setIsTagDisabled(true)
			}

			setSelectedTag(tag)
			setPlayerStorage((prevState) => ({ ...prevState, tag }))
		},
		/**
		 * Selects a random tag and updates player storage with the random tag.
		 */
		selectRandomTag: () => {
			const isTagUsed = playerListStorage.some((player: PlayerProps) => player.tag === selectedTag)
			if (isTagUsed) {
				setIsTagDisabled(true)
			}

			const randomTag = getRandomTag()

			setSelectedTag(randomTag)
			setPlayerStorage((prevState) => ({ ...prevState, tag: randomTag }))
		},
		// the current selected Tag
		selectedTag,
		// if tag is in use
		isTagDisabled
	}

	// ? INPUT METHODS
	const inputMethods = {
		inputChange: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value

			const capitalizedValue = value
				.split(' ')
				.map((word) => word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : '')
				.join(' ');

			setInputValue(capitalizedValue)
			setIsPreviewShown(true)

			if (!hasStartedTyping && capitalizedValue) {
				const randomColor = getRandomColor()
				const randomAvatar = getRandomAvatar()
				const randomTag = getRandomTag()

				setColorSelected(randomColor)
				setAvatarSelected(randomAvatar)
				setSelectedTag(randomTag)

				setHasStartedTyping(true)
			}
		},
		inputValue
	}

	// ? MENU METHODS
	const menuMethods = {
		/**
		 * Toggles the color menu visibility and hides other menus.
		 */
		openMenuColor: () => {
			setMenuColors(!menuColors)
			setMenuTags(false)
			setMenuAvatars(false)
		},
		/**
		 * Toggles the avatar menu visibility and hides other menus.
		 */
		openMenuAvatar: () => {
			setMenuAvatars(!menuAvatars)
			setMenuColors(false)
			setMenuTags(false)
		},
		/**
		 * Toggles the tag menu visibility and hides other menus.
		 */
		openMenuTags: () => {
			setMenuTags(!menuTags)
			setMenuColors(false)
			setMenuAvatars(false)
		},
		/**
		 * Creates a new player and adds them to the player list.
		 * @param event - The form submit event.
		 * @returns The updated player list
		 */
		createPlayer: (event: FormEvent<HTMLFormElement>) => {
			event.preventDefault()
			// Prevent creating a player if the input value is empty.
			if (!inputValue?.trim()) return
			const newPlayer: PlayerProps = {
				playername: inputValue,
				color: selectedColor || getRandomColor(),
				avatar: selectedAvatar || getRandomAvatar(),
				tag: selectedTag || getRandomTag()
			}

			setPlayerListStorage((prevState) => ([...prevState, newPlayer]))
			// Reset the input value after creating the player.
			setInputValue('')
			setIsPreviewShown(false)
		},
		/**
		 * Hide player preview and clear input value
		 */
		removePlayerEdit: () => {
			if (isPreviewShown) {
				setIsPreviewShown(false)
				setHasStartedTyping(false)
				setInputValue('')
			}
		},
		// Represents the current states of the menu.
		menuStates,
		// Represents the current preview state of the player while is editing
		isPreviewShown,
	}

	// Syncs player data with local storage whenever it changes.
	useEffect(() => {
		if (!isPreviewShown && (playerListStorage && playerListStorage)) {
			localStorage.setItem('player', JSON.stringify(playerStorage))
			localStorage.setItem('playerList', JSON.stringify(playerListStorage))
		}

	}, [playerStorage, playerListStorage])

	// Handle menu outside clicks.
	useEffect(() => {
		const handleClickOutSide = (event: MouseEvent) => {
			const target = event.target as Node

			const { menuAvatarRef, menuColorRef, menuTagRef } = elementsRef

			if (menuColorRef.current && !menuColorRef.current.contains(target)) {
				setMenuColors(false)
			}

			if (menuAvatarRef.current && !menuAvatarRef.current.contains(target)) {
				setMenuAvatars(false)
			}

			if (menuTagRef.current && !menuTagRef.current.contains(target)) {
				setMenuTags(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutSide)

		return () => {
			document.removeEventListener('mousedown', handleClickOutSide)
		}
	}, [])

	return { menuMethods, colorMethods, avatarMethods, tagMethods, inputMethods, elementsRef, playerListStorage }
}