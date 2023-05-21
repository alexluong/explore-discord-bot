import { Client } from "discord.js"
import { Event } from "~/types"

// events
import { clientReadyEvent } from "./client-ready"
import { guildCreateEvent } from "./guild-create"
import { guildDeleteEvent } from "./guild-delete"
import { interactionCreatedEvent } from "./interaction-created"

const events: Event<any>[] = [
  clientReadyEvent,
  guildCreateEvent,
  guildDeleteEvent,
  interactionCreatedEvent,
]

export function listenEvents(client: Client) {
  for (const event of events) {
    const listenMethod = event.once ? "once" : "on"
    client[listenMethod](event.name, (...args) => event.execute(...args))
  }
}
