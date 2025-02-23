/*
<ai_context>
Initializes the database connection and schema for the app.
</ai_context>
*/

import { profilesTable, todosTable } from "@/db/schema"
import { config } from "dotenv"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

config({ path: ".env" })

const schema = {
  profiles: profilesTable,
  todos: todosTable
}

const client = postgres(process.env.DATABASE_URL!, {
  ssl: {
    rejectUnauthorized: false
  },
  max: 1,
  idle_timeout: 20,
  connect_timeout: 30,
  connection: {
    options: "--client_encoding=UTF8"
  }
})

export const db = drizzle(client, { schema })
