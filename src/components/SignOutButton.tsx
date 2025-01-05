"use client"

import { invalidateSession } from "@/app/utils/auth"
import { redirect } from "next/navigation"

const SignOutButton = ({ sessionToken }: { sessionToken: string }) => {
  return (
    <button
      onClick={async () => {
        await invalidateSession(sessionToken)
        redirect("/login")
      }}
    >
      Sign Out
    </button>
  )
}
export default SignOutButton
