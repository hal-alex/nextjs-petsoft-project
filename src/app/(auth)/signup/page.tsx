import { isLoggedIn } from "@/app/utils/auth"
import AuthForm from "@/components/AuthForm"
import Link from "next/link"
import { redirect } from "next/navigation"

const SignUp = async () => {
  const isLoggedInUser = await isLoggedIn()

  if (isLoggedInUser) {
    redirect("/app/dashboard")
  }

  return (
    <main>
      <h1>Sign Up</h1>
      <AuthForm authType="signup" />
      <p>
        Have an account? <Link href="/login">Log in here</Link>
      </p>
    </main>
  )
}
export default SignUp
