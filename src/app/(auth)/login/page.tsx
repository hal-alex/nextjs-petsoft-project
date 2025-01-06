import { isLoggedIn } from "@/app/utils/auth"
import AuthForm from "@/components/AuthForm"
import Link from "next/link"
import { redirect } from "next/navigation"

const LoginPage = async () => {
  const isLoggedInUser = await isLoggedIn()

  if (isLoggedInUser) {
    redirect("/app/dashboard")
  }

  return (
    <main>
      <h1>Log In</h1>
      <AuthForm authType="login" />
      <p>
        Don't have an account? <Link href="/signup">Sign up here</Link>
      </p>
    </main>
  )
}
export default LoginPage
