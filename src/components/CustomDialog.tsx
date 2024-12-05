"use client"

import { X } from "lucide-react"
import styles from "./components.module.css"
import { useEffect } from "react"

interface CustomDialogProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function CustomDialog({ isOpen, onClose, children }: CustomDialogProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={20} />
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
