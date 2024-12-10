"use client"

import Image from "next/image"
import style from "./components.module.css"
import { usePetContext, useSearchContext } from "@/app/context/hooks"
import clsx from "clsx"

export type Pet = {
  id: number
  name: string
  imageUrl: string | null
  ownerName: string
  age: number
  notes: string | null
}

const PetList = () => {
  const { pets, selectedId, handleChangePetId } = usePetContext()
  const { searchTerm } = useSearchContext()

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <ul className={style.petList}>
      {filteredPets.map((pet) => (
        <li
          key={pet.id}
          className={clsx({ [style.activeList]: selectedId === pet.id })}
        >
          <button onClick={() => handleChangePetId(pet.id)}>
            <Image
              src={pet.imageUrl!}
              alt="Pet image"
              width={45}
              height={45}
              className={style.petIcon}
            />
            <p>{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  )
}
export default PetList
