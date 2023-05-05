import { commands } from "bot/commands"
import { Event } from "bot/types"
import { ClientEvents, Events } from "discord.js"

export const interactionCreatedEvent: Event<ClientEvents[Events.InteractionCreate]> = {
  name: Events.InteractionCreate,
  once: true,
  execute: async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    const command = commands.get(interaction.commandName)
    try {
      await command?.execute({ interaction, client: interaction.client })
    } catch (error) {
      console.error(`Failed to run command "${command?.name}":`, error)
    }
  },
}
