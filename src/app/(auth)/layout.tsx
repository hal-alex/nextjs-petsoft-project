import style from './styles.module.css'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className={style.layoutContainer}>Layout {children}</div>
}
export default Layout
