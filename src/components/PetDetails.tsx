"use client"

import Image from "next/image"
import style from "./components.module.css"
import { usePetContext } from "@/app/context/hooks"
import DialogButton from "./DialogButton"
import AddingPetPopup from "./AddingPetPopup"
import { deletePet } from "@/actions/actions"
import { startTransition, useTransition } from "react"
import { revalidatePath } from "next/cache"

const PetDetails = () => {
  const { selectedPet } = usePetContext()

  if (!selectedPet) {
    return <p>No pet selected</p>
  }

  const [isPending, setIsPending] = useTransition()

  return (
    <section className={style.petDetails}>
      <div className={style.petDetailsHeader}>
        <Image
          src={selectedPet.imageUrl!}
          width={75}
          height={75}
          alt="Pet image"
        />
        <h2>{selectedPet.name}</h2>
        <div>
          <DialogButton content={<AddingPetPopup actionType="edit" />}>
            Edit
          </DialogButton>
          <button
            onClick={async () => {
              startTransition(async () => {
                await deletePet(selectedPet.id)
              })
            }}
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
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
