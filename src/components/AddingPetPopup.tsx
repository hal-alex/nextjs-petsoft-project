"use client"
import { usePetContext } from "@/app/context/hooks"
import style from "./components.module.css"
import { useDialog } from "@/app/context/dialog-context-provider"
import { useState } from "react"
import { InsertPet } from "@/db/schema"
import { addPet, updatePet } from "@/actions/actions"
import AddingPetPopUpButton from "./AddingPetPopUpButton"

type AddingPetPopupProps = {
  actionType: "add" | "edit"
}

const AddingPetPopup = ({ actionType }: AddingPetPopupProps) => {
  const { selectedPet } = usePetContext()
  const { closeDialog } = useDialog()

  const [formData, setFormData] = useState<Omit<InsertPet, "userId">>({
    name: selectedPet?.name ?? "",
    ownerName: selectedPet?.ownerName ?? "",
    age: selectedPet?.age ?? 0,
    imageUrl: selectedPet?.imageUrl ?? "",
    notes: selectedPet?.notes ?? "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // await new Promise((resolve) => setTimeout(resolve, 3000))

    if (actionType === "edit" && selectedPet?.id) {
      const error = await updatePet(selectedPet?.id, formData)
      if (error) {
        alert(error.message)
        return
      }
    } else {
      const error = await addPet(formData)

      if (error) {
        alert(error.message)
        return
      }
    }

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
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="ownerName">Owner name</label>
        <input
          id="ownerName"
          type="text"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleChange}
        />
        <label htmlFor="imageUrl">Image URL</label>
        <input
          id="imageUrl"
          type="text"
          name="imageUrl"
          value={formData.imageUrl ?? ""}
          onChange={handleChange}
        />
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes ?? ""}
          onChange={handleChange}
        />
      </div>
      <AddingPetPopUpButton actionType={actionType} />
    </form>
  )
}
export default AddingPetPopup
