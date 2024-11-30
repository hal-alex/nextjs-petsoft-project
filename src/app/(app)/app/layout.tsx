import { Metadata } from "next"
import style from "./page.module.css"
import Link from "next/link"

type LayoutProps = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "App",
  description: "Pet daycare project",
}

const Layout = async ({ children }: LayoutProps) => {
  return (
    <>
      <BackgroundImage />
      <div className={style.container}>
        <AppHeader />
        {children}
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
