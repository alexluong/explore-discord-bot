import { ClientEvents, Events } from "discord.js"
import { logger } from "~/modules/core"
import { manager, managerMapper } from "~/modules/manager"
import { Event } from "~/types"

export const guildCreateEvent: Event<ClientEvents[Events.GuildCreate]> = {
  name: Events.GuildCreate,
  execute: async (guild) => {
    logger.info({ metadata: { id: guild.id, name: guild.name } }, `Joined a new guide!`)
    await manager.guild.join(managerMapper.guild.dguildToJoinInput(guild))
  },
}
