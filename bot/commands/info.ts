import { SlashCommandBuilder } from "discord.js"
import { Command } from "~/types"

enum SubcommandType {
  user = "user",
  server = "server",
}

export const infoCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Get info about a user or a server!")
    .addSubcommand((subcommand) =>
      subcommand
        .setName(SubcommandType.user)
        .setDescription("Info about a user")
        .addUserOption((option) => option.setName("target").setDescription("The user")),
    )
    .addSubcommand((subcommand) =>
      subcommand.setName(SubcommandType.server).setDescription("Info about the server"),
    )
    .setDMPermission(false)
    .toJSON(),
  execute: async ({ interaction }) => {
    switch (interaction.options.getSubcommand()) {
      case "user": {
        const user = interaction.options.getUser("target")
        if (user) {
          await interaction.reply(`Username: ${user.username}\nID: ${user.id}`)
        } else {
          await interaction.reply(
            `Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`,
          )
        }
        break
      }

      case "server": {
        await interaction.reply(
          `Server name: ${interaction.guild?.name}\nTotal members: ${interaction.guild?.memberCount}`,
        )
        break
      }

      default:
        await interaction.reply("Subcommand not found!")
    }
  },
}
