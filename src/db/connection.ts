import * as schema from "./schema"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

const queryClient = postgres("postgresql://postgres.xwtlfrwvybvudsxhypsd:j4h2l3k4jh23l4k2j3h4l23jh@aws-0-eu-west-2.pooler.supabase.com:6543/postgres", { prepare: false })

export const db = drizzle(queryClient, { schema })
