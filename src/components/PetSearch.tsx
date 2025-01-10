import { searchPetFromDb } from "@/app/utils/server-utils"

const PetSearch = async () => {
  const results = await searchPetFromDb("22")

  return (
    <div>
      Search pet from DB
      <input type="text" />
      {results.map((searchedPet) => (
        <p key={searchedPet.id}>
          {searchedPet.name} - {searchedPet.age}
        </p>
      ))}
    </div>
  )
}
export default PetSearch
