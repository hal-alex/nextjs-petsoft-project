"use client"

import { useFormStatus } from "react-dom"

const AddingPetPopUpButton = ({
  actionType,
}: {
  actionType: "add" | "edit"
}) => {
  const { pending } = useFormStatus()
  console.log(pending, pending)
  return (
    <button type="submit">
      {pending && "Adding pet..."}
      {actionType === "add" ? "Add pet" : "Edit pet"}
    </button>
  )
}
export default AddingPetPopUpButton
