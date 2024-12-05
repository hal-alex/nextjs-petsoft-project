import style from "./components.module.css"

type AddingPetPopupProps = {
  actionType: "add" | "edit"
}

const AddingPetPopup = ({ actionType }: AddingPetPopupProps) => {
  return (
    <form>
      <div className={style.formContainer}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" />
        <label htmlFor="ownerName">Owner name</label>
        <input id="ownerName" type="text" />
        <label htmlFor="imageUrl">Image URL</label>
        <input id="imageUrl" type="text" />
        <label htmlFor="age">Age</label>
        <input id="age" type="number" />
        <label htmlFor="notes">Notes</label>
        <textarea id="notes" />
      </div>
      <button type="submit">
        {actionType === "add" ? "Add pet" : "Edit pet"}
      </button>
    </form>
  )
}
export default AddingPetPopup
