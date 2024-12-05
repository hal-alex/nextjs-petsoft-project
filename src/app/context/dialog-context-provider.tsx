"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { CustomDialog } from "@/components/CustomDialog"

interface DialogContextType {
  isOpen: boolean
  content: ReactNode | null
  openDialog: (content: ReactNode) => void
  closeDialog: () => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState<ReactNode | null>(null)

  const openDialog = (content: ReactNode) => {
    setContent(content)
    setIsOpen(true)
  }

  const closeDialog = () => {
    setIsOpen(false)
    setContent(null)
  }

  return (
    <DialogContext.Provider
      value={{ isOpen, content, openDialog, closeDialog }}
    >
      {children}
      <CustomDialog isOpen={isOpen} onClose={closeDialog}>
        {content}
      </CustomDialog>
    </DialogContext.Provider>
  )
}

export function useDialog() {
  const context = useContext(DialogContext)
  if (context === undefined) {
    throw new Error("useDialog must be used within a DialogProvider")
  }
  return context
}
