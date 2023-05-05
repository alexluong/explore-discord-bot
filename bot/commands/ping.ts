import { SlashCommandBuilder } from "discord.js"
import { Command } from "~/types"

export const pingCommand: Command = {
  data: new SlashCommandBuilder() //
    .setName("ping")
    .setDescription("pong!"),
  execute: async ({ interaction }) => {
    await interaction.reply("pong!")
  },
}
