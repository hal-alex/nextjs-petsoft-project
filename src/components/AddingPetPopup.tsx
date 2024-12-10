"use client"
import { usePetContext } from "@/app/context/hooks"
import style from "./components.module.css"
import { useDialog } from "@/app/context/dialog-context-provider"

type AddingPetPopupProps = {
  actionType: "add" | "edit"
}

const AddingPetPopup = ({ actionType }: AddingPetPopupProps) => {
  const { selectedPet } = usePetContext()
  const { closeDialog } = useDialog()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    closeDialog()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.formContainer}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          defaultValue={actionType === "edit" ? selectedPet?.name : ""}
        />
        <label htmlFor="ownerName">Owner name</label>
        <input
          id="ownerName"
          type="text"
          name="ownerName"
          defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
        />
        <label htmlFor="imageUrl">Image URL</label>
        <input
          id="imageUrl"
          type="text"
          name="imageUrl"
          defaultValue={
            actionType === "edit" ? selectedPet?.imageUrl ?? "" : ""
          }
        />
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          name="age"
          defaultValue={actionType === "edit" ? selectedPet?.age : "fff"}
        />
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          defaultValue={actionType === "edit" ? selectedPet?.notes ?? "" : ""}
        />
      </div>
      <button type="submit">
        {actionType === "add" ? "Add pet" : "Edit pet"}
      </button>
    </form>
  )
}
export default AddingPetPopup
