"use client"
import { Pet } from "@/components/PetList"
import { createContext, useState } from "react"

type TPetContext = {
  pets: Pet[]
  selectedId: string | null
  handleChangePetId: (id: string) => void
  selectedPet: Pet | undefined
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

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedId,
        handleChangePetId,
        selectedPet,
      }}
    >
      {children}
    </PetContext.Provider>
  )
}
export default PetContextProvider
