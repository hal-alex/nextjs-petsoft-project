"use client"
import { Pet } from "@/components/PetList"
import { createContext, useState } from "react"

type TPetContext = {
  pets: Pet[]
  selectedId: number | null
  handleChangePetId: (id: number) => void
  selectedPet: Pet | undefined
  amountOfPets: number
  handleCheckOutPet: (id: number) => void
}

export const PetContext = createContext<TPetContext | null>(null)

const PetContextProvider = ({
  data,
  children,
}: {
  data: Pet[]
  children: React.ReactNode
}) => {
  const [pets, setPets] = useState(data)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const handleChangePetId = (id: number) => setSelectedId(id)

  const selectedPet = pets.find((pet) => pet.id === selectedId)

  const amountOfPets = pets.length

  const handleCheckOutPet = (id: number) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id))
    setSelectedId(null)
  }

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedId,
        handleChangePetId,
        selectedPet,
        amountOfPets,
        handleCheckOutPet,
      }}
    >
      {children}
    </PetContext.Provider>
  )
}
export default PetContextProvider
