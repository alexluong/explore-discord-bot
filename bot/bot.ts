import { Client, GatewayIntentBits } from "discord.js"

import { listenEvents } from "./events"

export function createBot() {
  const bot = new Client({ intents: [GatewayIntentBits.Guilds] })

  listenEvents(bot)

  return bot
}
