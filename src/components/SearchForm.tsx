"use client"

import { useSearchContext } from "@/app/context/hooks"
import style from "./components.module.css"

const SearchForm = () => {
  const { handleChangeSearchTerm, searchTerm } = useSearchContext()

  return (
    <form className={style.searchBox}>
      <input
        className={style.searchBox}
        placeholder="Search here"
        type="search"
        onChange={(e) => handleChangeSearchTerm(e.target.value)}
        value={searchTerm}
      />
    </form>
  )
}
export default SearchForm
