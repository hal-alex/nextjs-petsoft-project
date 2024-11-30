import style from "./components.module.css"

const ContentBlock = ({ children }: { children: React.ReactNode }) => {
  return <div className={style.contentBlock}>{children}</div>
}
export default ContentBlock
