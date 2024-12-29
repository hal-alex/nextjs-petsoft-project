"use client"
import { signIn } from "@/app/utils/auth"
import { redirect } from "next/navigation"
import { toast } from "react-toastify"

type AuthForm = { authType: "login" | "signup" }

const AuthForm = ({ authType }: AuthForm) => {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (authType === "login") {
      const success = await signIn(email, password)
      if (success) {
        redirect("/app")
      } else {
        toast.error("Invalid email or password")
      }
    }
  }

  return (
    <form
      // action={async (formData) => {
      //   "use server"

      //   if (authType === "login") {
      //     if (await signIn(formData.get("email"), formData.get("password"))) {
      //       redirect("/app")
      //     } else {
      //       notify()
      //     }
      //   }
      // }}
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
      </div>
      <button type="submit">
        {authType === "login" ? "Log In" : "Sign up"}
      </button>
    </form>
  )
}
export default AuthForm
