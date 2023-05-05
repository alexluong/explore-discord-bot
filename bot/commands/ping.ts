import { Command } from "bot/types"

export const pingCommand: Command = {
  name: "ping",
  description: "pong!",
  execute: ({ interaction }) => {
    interaction.reply("pong!")
  },
}
