"use client"
import { createCheckoutSession } from "@/actions/actions"
import { useSearchParams } from "next/navigation"
import { useTransition } from "react"

const PaymentPage = () => {
  const searchParams = useSearchParams()

  const success = searchParams.get("success")
  const cancelled = searchParams.get("cancelled")

  const [isPending, strartTransition] = useTransition()

  return (
    <main>
      {success === "true" ? (
        <h1>Payment successful</h1>
      ) : (
        <>
          {" "}
          <h1>Access requires payment</h1>
          {cancelled === "true" && <p>Payment cancelled. Please try again</p>}
          <button
            onClick={async () => {
              strartTransition(async () => {
                await createCheckoutSession()
              })
            }}
          >
            {isPending ? "Processing..." : "Pay now"}
          </button>
        </>
      )}
    </main>
  )
}
export default PaymentPage
