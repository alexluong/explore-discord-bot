import { z } from "zod"

export const GuildMemberSchema = z.object({
  id: z.string(),
  username: z.string(),
  discriminator: z.string(),
  bot: z.boolean(),
  discordUserId: z.string(),
  // TODO: add roles
})
