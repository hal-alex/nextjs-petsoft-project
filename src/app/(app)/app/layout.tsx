import { Metadata } from "next"
import style from "./page.module.css"
import Link from "next/link"
import PetContextProvider from "@/app/context/pet-context-provider"
import { Pet } from "@/components/PetList"
import SearchContextProvider from "@/app/context/search-context-provider"
import { DialogProvider } from "@/app/context/dialog-context-provider"

type LayoutProps = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "App",
  description: "Pet daycare project",
}

const Layout = async ({ children }: LayoutProps) => {
  const response = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets",
  )

  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }

  const data: Pet[] = await response.json()

  return (
    <>
      <BackgroundImage />
      <div className={style.container}>
        <AppHeader />
        <DialogProvider>
          <SearchContextProvider>
            <PetContextProvider data={data}>{children}</PetContextProvider>
          </SearchContextProvider>
        </DialogProvider>
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
