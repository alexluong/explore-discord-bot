import { Client } from "discord.js"
import { Event } from "~/types"

// events
import { clientReadyEvent } from "./client-ready"
import { interactionCreatedEvent } from "./interaction-created"

const events: Event<any>[] = [clientReadyEvent, interactionCreatedEvent]

export function listenEvents(client: Client) {
  for (const event of events) {
    const listenMethod = event.once ? "once" : "on"
    client[listenMethod](event.name, (...args) => event.execute(...args))
  }
}
