import { Command } from "~/types"

export const pingCommand: Command = {
  name: "ping",
  description: "pong!",
  execute: async ({ interaction }) => {
    await interaction.reply("pong!")
  },
}
