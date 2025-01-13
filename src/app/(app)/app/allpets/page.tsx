import { getAllPets } from "@/db/queries"

const page = async () => {
  const pets = await getAllPets()
  return (
    <div>
      {pets.map((pet) => (
        <p key={pet.id}>{pet.name}</p>
      ))}
    </div>
  )
}
export default page
