import { Event } from "bot/types"
import { ClientEvents, Events } from "discord.js"

export const clientReadyEvent: Event<ClientEvents[Events.ClientReady]> = {
  name: Events.ClientReady,
  once: true,
  execute: (client) => {
    console.log(`Ready! Logged in as ${client.user.tag}`)
  },
}
