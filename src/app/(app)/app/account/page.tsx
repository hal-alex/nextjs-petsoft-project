import ContentBlock from "@/components/ContentBlock"
import style from "./page.module.css"
import { getUser, isLoggedIn } from "@/app/utils/auth"
import { redirect } from "next/navigation"
import SignOutButton from "@/components/SignOutButton"

const AccountPage = async () => {
  const isLoggedInUser = await isLoggedIn()

  if (!isLoggedInUser) {
    return redirect("/login")
  }

  const user = await getUser(isLoggedInUser.sessionToken)

  return (
    <main>
      <h1>Account</h1>
      <ContentBlock className={style.redBackground}>
        <p>Logged in as {user?.email}</p>
        <SignOutButton sessionToken={isLoggedInUser.sessionToken} />
      </ContentBlock>
    </main>
  )
}
export default AccountPage
