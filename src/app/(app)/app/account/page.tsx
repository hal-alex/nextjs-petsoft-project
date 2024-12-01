import ContentBlock from "@/components/ContentBlock"
import style from "./page.module.css"

const AccountPage = () => {
  return (
    <main>
      <h1>Account</h1>
      <ContentBlock className={style.redBackground}>
        <p>Logged in as </p>
        <button>Log out</button>
      </ContentBlock>
    </main>
  )
}
export default AccountPage
