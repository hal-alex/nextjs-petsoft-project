import ContentBlock from "@/components/ContentBlock"
import style from "./page.module.css"
import { getUser, invalidateSession } from "@/app/utils/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import SignOutButton from "@/components/SignOutButton"

const AccountPage = async () => {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("session-token")?.value

  if (!sessionToken) {
    return redirect("/login")
  }

  const user = await getUser(sessionToken)

  return (
    <main>
      <h1>Account</h1>
      <ContentBlock className={style.redBackground}>
        <p>Logged in as {user?.email}</p>
        <SignOutButton sessionToken={sessionToken} />
      </ContentBlock>
    </main>
  )
}
export default AccountPage
