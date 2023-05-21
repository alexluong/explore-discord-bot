import { omit } from "lodash"
import { z } from "zod"
import { mongo } from "~/modules/core"

import { GuildSchema } from "./guild.entity"

export type Guild = z.infer<typeof GuildSchema>
export type MongoGuild = Omit<Guild, "id"> & { _id: Guild["id"] }

export const JoinInputSchema = GuildSchema.omit({ wishtenderStatus: true })

export async function join(guild: z.infer<typeof JoinInputSchema>) {
  await mongo
    .db()
    .collection<MongoGuild>("discord:guilds")
    .updateOne(
      { _id: guild.id },
      { $set: { ...omit(guild, "id"), _id: guild.id, wishtenderStatus: "active" } },
      { upsert: true },
    )
}

export async function leave(id: Guild["id"]) {
  await mongo
    .db()
    .collection<MongoGuild>("discord:guilds")
    .updateOne({ _id: id }, { $set: { wishtenderStatus: "inactive" } })
}
