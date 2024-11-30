import style from "./components.module.css"

const SearchForm = () => {
  return (
    <form className={style.searchBox}>
      <input className={style.searchBox} placeholder="Search here" />
    </form>
  )
}
export default SearchForm
