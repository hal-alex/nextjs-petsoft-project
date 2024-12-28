import { createSession, generateSessionToken } from "@/app/utils/auth"

type AuthForm = { authType: "login" | "signup" }

const AuthForm = ({ authType }: AuthForm) => {
  return (
    <form
      action={async () => {
        "use server"
        const token = generateSessionToken()

        await createSession(token, 2)
      }}
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
