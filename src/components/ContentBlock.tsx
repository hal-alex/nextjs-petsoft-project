import clsx from "clsx"
import style from "./components.module.css"

type ContentBlockProps = {
  children: React.ReactNode
  className?: string
}

const ContentBlock = ({ children, className }: ContentBlockProps) => {
  return <div className={clsx(style.contentBlock, className)}>{children}</div>
}
export default ContentBlock
