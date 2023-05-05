import { ClientEvents, Events } from "discord.js"
import { commands } from "~/commands"
import { Event } from "~/types"

export const interactionCreatedEvent: Event<ClientEvents[Events.InteractionCreate]> = {
  name: Events.InteractionCreate,
  once: true,
  execute: async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    const command = commands.get(interaction.commandName)
    try {
      await command?.execute({ interaction, client: interaction.client })
    } catch (error) {
      console.error(`Failed to run command "${command?.data?.name}":`, error)
    }
  },
}
