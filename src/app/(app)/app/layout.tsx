import { Metadata } from "next"
import style from "./page.module.css"
import Link from "next/link"
import PetContextProvider from "@/app/context/pet-context-provider"
import SearchContextProvider from "@/app/context/search-context-provider"
import { DialogProvider } from "@/app/context/dialog-context-provider"
import { getAllPets } from "@/db/queries"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { validateSessionToken } from "@/app/utils/auth"

type LayoutProps = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "App",
  description: "Pet daycare project",
}

const Layout = async ({ children }: LayoutProps) => {
  const response = await getAllPets()

  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("session-token")?.value

  if (!sessionToken) {
    return redirect("/login")
  }

  const isValidated = await validateSessionToken(sessionToken)

  if (!isValidated.session) {
    return redirect("/login")
  }

  return (
    <>
      <BackgroundImage />
      <div className={style.container}>
        <AppHeader />
        <PetContextProvider data={response}>
          <DialogProvider>
            <SearchContextProvider>{children}</SearchContextProvider>
          </DialogProvider>
        </PetContextProvider>
        <AppFooter />
      </div>
    </>
  )
}
export default Layout

const links = [
  {
    label: "Dashboard",
    path: "/app/dashboard",
  },
  {
    label: "Account",
    path: "/app/account",
  },
]

const AppHeader = () => (
  <header className={style.header}>
    <nav>
      <ul className={style.ulList}>
        {links.map((link) => (
          <li key={link.path} className={style.liItem}>
            <Link href={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  </header>
)

const AppFooter = () => (
  <footer className={style.footer}>
    <small>&copy; 2030 Pet Soft. All rights reserved</small>
  </footer>
)

const BackgroundImage = () => <div className={style.background} />
