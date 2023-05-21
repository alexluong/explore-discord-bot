import { ClientEvents, Events } from "discord.js"
import { Event } from "~/types"

export const guildDeleteEvent: Event<ClientEvents[Events.GuildDelete]> = {
  name: Events.GuildDelete,
  execute: (guide) => {
    console.log(`Left a new guide ${guide.name}`)
  },
}
