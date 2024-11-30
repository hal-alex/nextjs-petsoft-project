"use client"

import Image from "next/image"
import style from "./components.module.css"
import { usePetContext } from "@/app/context/hooks"
import clsx from "clsx"

export type Pet = {
  id: string
  name: string
  imageUrl: string
  ownerName: string
  age: number
  notes: string
}

const PetList = () => {
  const { pets, selectedId, handleChangePetId } = usePetContext()
  return (
    <ul className={style.petList}>
      {pets.map((pet) => (
        <li
          key={pet.id}
          className={clsx({ [style.activeList]: selectedId === pet.id })}
        >
          <button onClick={() => handleChangePetId(pet.id)}>
            <Image
              src={pet.imageUrl}
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
