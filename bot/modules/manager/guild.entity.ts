import { z } from "zod"

export const GuildSchema = z.object({
  id: z.string(),
  name: z.string(),
  ownerId: z.string(),
  wishtenderStatus: z.enum(["active", "inactive"]),
})
