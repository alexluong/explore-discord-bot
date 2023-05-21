import { ClientEvents, Events } from "discord.js"
import { Event } from "~/types"

export const clientReadyEvent: Event<ClientEvents[Events.ClientReady]> = {
  name: Events.ClientReady,
  once: true,
  execute: (client) => {
    console.log(`Ready! Logged in as ${client.user.tag}`)
  },
}
