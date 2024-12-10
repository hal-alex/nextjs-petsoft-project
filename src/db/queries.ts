import { db } from "./connection"

export const getAllPets = async () => {
  return await db.query.pets.findMany()
}
