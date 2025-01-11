"use client"

import { invalidateSession } from "@/app/utils/auth"
import { redirect } from "next/navigation"
import { useTransition } from "react"

const SignOutButton = ({ sessionToken }: { sessionToken: string }) => {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      disabled={isPending}
      onClick={async () => {
        startTransition(async () => {
          await invalidateSession(sessionToken)
          redirect("/login")
        })
      }}
    >
      Sign Out
    </button>
  )
}
export default SignOutButton
