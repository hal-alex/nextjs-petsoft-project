"use client"
import { createCheckoutSession } from "@/actions/actions"

const PaymentPage = () => {
  return (
    <main>
      <h1>Access requires payment</h1>
      <button
        onClick={async () => {
          await createCheckoutSession()
        }}
      >
        Pay now
      </button>
    </main>
  )
}
export default PaymentPage
