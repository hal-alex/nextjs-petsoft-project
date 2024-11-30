"use client"

import Image from "next/image"
import style from "./components.module.css"
import { usePetContext } from "@/app/context/hooks"

const PetDetails = () => {
  const { selectedPet } = usePetContext()

  if (!selectedPet) {
    return null
  }

  return (
    <section className={style.petDetails}>
      <div className={style.petDetailsHeader}>
        <Image
          src={selectedPet.imageUrl}
          width={75}
          height={75}
          alt="Pet image"
        />
        <h2>{selectedPet.name}</h2>
      </div>
      <div>
        <div>
          <h3>{selectedPet.ownerName}</h3>
          <p>{selectedPet.age}</p>
        </div>
        <div>{selectedPet.notes}</div>
      </div>
    </section>
  )
}
export default PetDetails
