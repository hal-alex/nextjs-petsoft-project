"use client"

import { useDialog } from "@/app/context/dialog-context-provider"

interface DialogButtonProps {
  content: React.ReactNode
  children: React.ReactNode
}

function DialogButton({ content, children }: DialogButtonProps) {
  const { openDialog } = useDialog()

  const handleClick = () => {
    openDialog(content)
  }

  return <button onClick={handleClick}>{children}</button>
}

export default DialogButton
