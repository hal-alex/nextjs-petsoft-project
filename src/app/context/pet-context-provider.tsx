"use client"
import { Pet } from "@/components/PetList"
import { createContext, useState } from "react"

type TPetContext = {
  pets: Pet[]
  selectedId: string | null
  handleChangePetId: (id: string) => void
  selectedPet: Pet | undefined
  amountOfPets: number
  handleCheckOutPet: (id: string) => void
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
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleChangePetId = (id: string) => setSelectedId(id)

  const selectedPet = pets.find((pet) => pet.id === selectedId)

  const amountOfPets = pets.length

  const handleCheckOutPet = (id: string) => {
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
