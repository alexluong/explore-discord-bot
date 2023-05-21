import { ClientEvents, Events } from "discord.js"
import { logger } from "~/modules/core"
import { manager } from "~/modules/manager"
import { Event } from "~/types"

// TODO: persist leaving reason

export const guildDeleteEvent: Event<ClientEvents[Events.GuildDelete]> = {
  name: Events.GuildDelete,
  execute: async (guild) => {
    logger.info({ metadata: { id: guild.id, name: guild.name } }, `Left a guide!`)
    await manager.guild.leave(guild.id)
  },
}
