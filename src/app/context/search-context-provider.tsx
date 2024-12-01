"use client"

import { createContext, useState } from "react"

type TSearchTerm = {
  searchTerm: string
  handleChangeSearchTerm: (term: string) => void
}

export const SearchContext = createContext<TSearchTerm>({
  searchTerm: "",
  handleChangeSearchTerm: () => {},
})

const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleChangeSearchTerm = (term: string) => setSearchTerm(term)

  return (
    <SearchContext.Provider value={{ searchTerm, handleChangeSearchTerm }}>
      {children}
    </SearchContext.Provider>
  )
}
export default SearchContextProvider
