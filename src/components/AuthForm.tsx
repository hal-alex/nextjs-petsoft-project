"use client"
import { signIn, signUp } from "@/app/utils/auth"
import { newUserEmailSchema } from "@/app/utils/validators"
import { useRouter } from "next/navigation"
import { useFormStatus } from "react-dom"
import { toast } from "react-toastify"
import AuthFormButton from "./AuthFormButton"

type AuthForm = { authType: "login" | "signup" }

const AuthForm = ({ authType }: AuthForm) => {
  const router = useRouter()
  const { pending } = useFormStatus()
  console.log(pending, "pending")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const success =
      authType === "login"
        ? await signIn(email, password)
        : await signUp(email, password)

    // console.log(success, "success")
    if (success.success) {
      router.push("/app")
    } else {
      toast.error("Invalid email or password")
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
        <input type="email" id="email" name="email" required maxLength={100} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          maxLength={100}
          minLength={5}
        />
      </div>
      <AuthFormButton type={authType} />
    </form>
  )
}
export default AuthForm
