import { db } from "./connection"
import { InsertPet, pets } from "./schema"

const generatePets = async () => {
  const petsSeed: InsertPet[] = [
    {
      age: 3,
      name: "Fluffy",
      ownerName: "Alice",
      notes: "Fluffy is a very good dog",
      imageUrl: "https://example.com/fluffy.jpg",
    },
  ]

  petsSeed.map(async (pet) => {
    await db.insert(pets).values(pet)
  })
}

generatePets()
