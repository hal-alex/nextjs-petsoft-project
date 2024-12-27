import { db } from "@/db/connection"
import { user as userSchema } from "@/db/schema"
import { eq } from "drizzle-orm"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const { auth, signIn } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      // credentials: {
      //   email: { label: "email", type: "text", placeholder: "jsmith" },
      //   password: { label: "Password", type: "password" },
      // },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials

        const user = await db
          .select()
          .from(userSchema)
          .where(eq(userSchema.email, email as string)).limit(1)

        if (!user[0]) {
          console.log("User not found")
          return null
        }

        const isPasswordMatch = await bcrypt.compare(
          password as string,
          user[0].hashedPassword,
        )

        if (!isPasswordMatch) {
          console.log("Password does not match")
          return null
        }

        return user[0]
      },
    }),
  ],
  callbacks: {
    authorized: ({ request }) => {
      const isApp = request.nextUrl.pathname.includes("/app")
      return isApp ? false : true
    },
  },
  session: {},
})
