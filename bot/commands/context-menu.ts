import { ApplicationCommandType, ContextMenuCommandBuilder } from "discord.js"
import { Command } from "~/types"

export const contextMenuCommand: Command = {
  data: new ContextMenuCommandBuilder() //
    .setName("contextMenu")
    .setType(ApplicationCommandType.User)
    .toJSON(),
  execute: async ({ interaction }) => {
    if (!interaction.isUserContextMenuCommand()) return
    await interaction.reply("pong!")
  },
}
