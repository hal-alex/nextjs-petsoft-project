"use client"

import exp from "constants"
import { useFormStatus } from "react-dom"

const AuthFormButton = ({ type }: { type: "login" | "signup" }) => {
  const { pending } = useFormStatus()

  return (
    <button disabled={pending} type="submit">
      {type === "login" ? "Log in" : "Sign up"}
    </button>
  )
}

export default AuthFormButton
