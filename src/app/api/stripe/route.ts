import { db } from "@/db/connection"
import { user } from "@/db/schema"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export const POST = async (req: NextRequest) => {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    )

    switch (event.type) {
      case "checkout.session.completed":
        await db
          .update(user)
          .set({ isPaid: true })
          .where(eq(user.email, event.data.customer_email))
        return NextResponse.json({ status: 200 })
      default:
        return NextResponse.json({ status: 200 })
    }
  } catch (error) {
    console.log("webhook error", error)
    return NextResponse.json({ status: 400 })
  }
}
