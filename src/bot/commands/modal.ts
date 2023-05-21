import {
  ActionRowBuilder,
  ChannelType,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js"
import { Command } from "~/types"

const COMMAND_NAME = "modal"

export const modalCommand: Command = {
  data: new SlashCommandBuilder()
    .setName(COMMAND_NAME)
    .setDescription("Your test modal command!")
    .toJSON(),
  execute: async ({ interaction }) => {
    if (interaction.isChatInputCommand()) {
      const modal = new ModalBuilder() //
        .setCustomId(`${COMMAND_NAME}:modal`)
        .setTitle("My Modal")

      const favoriteColorInput = new TextInputBuilder()
        .setCustomId("favoriteColorInput")
        // The label is the prompt the user sees for this input
        .setLabel("What's your favorite color?")
        // Short means only a single line of text
        .setStyle(TextInputStyle.Short)

      const hobbiesInput = new TextInputBuilder()
        .setCustomId("hobbiesInput")
        .setLabel("What's some of your favorite hobbies?")
        // Paragraph means multiple lines of text.
        .setStyle(TextInputStyle.Paragraph)

      // An action row only holds one text input,
      // so you need one action row per text input.
      const firstActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        favoriteColorInput,
      )
      const secondActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        hobbiesInput,
      )

      modal.addComponents(firstActionRow, secondActionRow)

      await interaction.showModal(modal)
    } else if (interaction.isModalSubmit()) {
      const favoriteColor = interaction.fields.getTextInputValue("favoriteColorInput")
      const hobbies = interaction.fields.getTextInputValue("hobbiesInput")

      await interaction.reply({
        content: `Your submission was received successfully: ${favoriteColor} - ${hobbies}`,
      })
    }
  },
}
