import { db } from "./connection"
import { InsertPet, InsertUser, pets, user } from "./schema"
import bcrypt from "bcrypt"

const seedDb = async () => {
  const seedUsers: InsertUser[] = [
    {
      email: "example0@example.com",
      hashedPassword: "password0",
    },
    {
      email: "example1@example.com",
      hashedPassword: "password1",
    },
  ]

  seedUsers.map(async (seedUser) => {
    const hashedPassword = await bcrypt.hash(seedUser.hashedPassword, 10)
    await db.insert(user).values({ ...seedUser, hashedPassword })
  })

  const petsSeed: InsertPet[] = [
    {
      age: 3,
      name: "Fluffy",
      ownerName: "Alice",
      notes: "Fluffy is a very good dog",
      imageUrl:
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      userId: 3,
    },
  ]

  petsSeed.map(async (pet) => {
    await db.insert(pets).values(pet)
  })
}

seedDb()
