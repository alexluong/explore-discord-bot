import * as Discord from "discord.js"
import { z } from "zod"
import { mongo } from "~/modules/core"

import { GuildSchema } from "./guild.entity"

export const JoinInputSchema = GuildSchema.omit({ wishtenderStatus: true })

export async function join(guild: z.infer<typeof JoinInputSchema>) {
  console.log(
    await mongo.db().collection("users").find({ email: "alex+gifter@example.com" }).toArray(),
  )

  return 1
}

export async function leave() {}
