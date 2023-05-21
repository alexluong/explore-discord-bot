import * as Discord from "discord.js"
import { z } from "zod"

import { JoinInputSchema } from "./guild.service"

export function dguildToJoinInput(guild: Discord.Guild): z.infer<typeof JoinInputSchema> {
  return {
    id: guild.id,
    name: guild.name,
    ownerId: guild.ownerId,
  }
}
