"use client"

import { usePetContext } from "@/app/context/hooks"

const Stats = () => {
  const { amountOfPets } = usePetContext()
  return (
    <div>
      <p> {amountOfPets}</p>
      <p>current guests</p>
    </div>
  )
}
export default Stats
