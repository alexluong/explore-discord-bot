import { ClientEvents, Events } from "discord.js"
import { commands } from "~/commands"
import { Event } from "~/types"

export const interactionCreatedEvent: Event<ClientEvents[Events.InteractionCreate]> = {
  name: Events.InteractionCreate,
  execute: async (interaction) => {
    if (interaction.isButton() || interaction.isModalSubmit()) {
      const commandName = interaction.customId.split(":")[0]
      const command = commands.get(commandName)
      try {
        await command?.execute({ interaction, client: interaction.client })
      } catch (error) {
        console.error(`Failed to run command "${command?.data?.name}":`, error)
      }
    } else if (interaction.isChatInputCommand()) {
      const command = commands.get(interaction.commandName)
      try {
        await command?.execute({ interaction, client: interaction.client })
      } catch (error) {
        console.error(`Failed to run command "${command?.data?.name}":`, error)
      }
    } else if (interaction.isUserContextMenuCommand()) {
      const command = commands.get(interaction.commandName)
      try {
        await command?.execute({ interaction, client: interaction.client })
      } catch (error) {
        console.error(`Failed to run command "${command?.data?.name}":`, error)
      }
    }
  },
}
