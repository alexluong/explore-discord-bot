import { z } from "zod"

export const DiscordUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  discriminator: z.string(),
  bot: z.boolean(),
})
