import AuthForm from "@/components/AuthForm"
import Link from "next/link"

const LoginPage = () => {
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
