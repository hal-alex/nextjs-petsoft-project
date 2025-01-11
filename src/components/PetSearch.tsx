"use client"

import { useState } from "react"
import { searchPetFromDb } from "@/app/utils/server-utils"
import { SelectPet } from "@/db/schema"

const PetSearch = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<SelectPet[]>([])

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const searchResults = await searchPetFromDb(searchTerm)
    setResults(searchResults)
  }

  return (
    <div>
      <h1>Search pet from DB</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter pet name"
        />
        <button type="submit">Search</button>
      </form>
      {results.length > 0 && (
        <div>
          {results.map((searchedPet) => (
            <p key={searchedPet.id}>
              {searchedPet.name} - {searchedPet.age}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default PetSearch
