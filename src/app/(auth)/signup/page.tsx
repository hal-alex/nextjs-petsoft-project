import AuthForm from "@/components/AuthForm"
import Link from "next/link"
import { toast } from "react-toastify"

const SignUp = () => {
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
