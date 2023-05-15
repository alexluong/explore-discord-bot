import { ChannelType, SlashCommandBuilder } from "discord.js"
import { Command } from "~/types"

export const echoCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Replies with your input!")
    .addStringOption((option) => option.setName("input").setDescription("The input to echo back"))
    .addBooleanOption((option) =>
      option.setName("ephemeral").setDescription("Whether or not the echo should be ephemeral"),
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to echo into")
        .addChannelTypes(ChannelType.GuildText),
    )
    .toJSON(),
  execute: async ({ interaction }) => {
    if (!interaction.isChatInputCommand()) return

    try {
      const input = interaction.options.getString("input")
      const ephemeral = interaction.options.getBoolean("ephemeral")
      const channel = interaction.options.getChannel("channel")

      if (channel) {
        // @ts-ignore .send() does exist
        await channel.send(input)
        await interaction.reply({ content: `Responded in #${channel.name}`, ephemeral: true })
      } else {
        await interaction.reply({ content: String(input), ephemeral: Boolean(ephemeral) })
      }
    } catch (error) {
      console.error(error)
    }
  },
}
