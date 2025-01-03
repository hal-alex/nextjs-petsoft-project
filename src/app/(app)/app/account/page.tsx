import ContentBlock from "@/components/ContentBlock"
import style from "./page.module.css"
import { getUser } from "@/app/utils/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const AccountPage = async () => {
  const cookieStore = cookies()
  const sessionToken = (await cookieStore).get("session-token")?.value

  if (!sessionToken) {
    return redirect("/login")
  }

  const user = await getUser(sessionToken)

  return (
    <main>
      <h1>Account</h1>
      <ContentBlock className={style.redBackground}>
        <p>Logged in as {user?.email}</p>
        <button>Log out</button>
      </ContentBlock>
    </main>
  )
}
export default AccountPage
