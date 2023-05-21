import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChatInputCommandInteraction,
  Interaction,
  SlashCommandBuilder,
} from "discord.js"
import { Command } from "~/types"

const COMMAND_NAME = "message"

const createButtonName = (name: string) => `${COMMAND_NAME}:${name}`

export const messageCommand: Command = {
  data: new SlashCommandBuilder()
    .setName(COMMAND_NAME)
    .setDescription("Your test message command!")
    .addBooleanOption((option) =>
      option.setName("await").setDescription("Whether or not to await message interaction"),
    )
    .toJSON(),
  execute: async ({ interaction }) => {
    if (interaction.isChatInputCommand()) {
      return handleCreateMessage({ interaction })
    } else if (interaction.isButton()) {
      return handleButton({ interaction })
    }
  },
}

async function handleCreateMessage({ interaction }: { interaction: ChatInputCommandInteraction }) {
  const shouldAwait = interaction.options.getBoolean("await")

  const confirm = new ButtonBuilder()
    .setCustomId(createButtonName("confirm") + (shouldAwait ? "_await" : ""))
    .setLabel("Confirm Ban")
    .setStyle(ButtonStyle.Danger)

  const cancel = new ButtonBuilder()
    .setCustomId(createButtonName("cancel") + (shouldAwait ? "_await" : ""))
    .setLabel("Cancel")
    .setStyle(ButtonStyle.Secondary)

  const emoji = new ButtonBuilder()
    .setCustomId(createButtonName("emoji") + (shouldAwait ? "_await" : ""))
    .setLabel("Primary")
    .setStyle(ButtonStyle.Primary)
    .setEmoji("🤩")

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(cancel, confirm, emoji)

  const response = await interaction.reply({
    content: "Hello!",
    components: [row],
  })

  if (!shouldAwait) return

  const collectorFilter = (i: Interaction) => i.user.id === interaction.user.id

  try {
    const confirmation = await response.awaitMessageComponent({
      filter: collectorFilter,
      time: 10 * 1000, // 60s
    })

    const action = confirmation.customId.split(":")[1]

    if (action === "confirm_await") {
      await confirmation.update({
        content: `${interaction.user.username} has been banned!`,
        components: [],
      })
    } else if (action === "cancel_await") {
      await confirmation.update({ content: "Action cancelled!!!!", components: [] })
    } else if (action === "emoji_await") {
      await confirmation.update({ content: "😇", components: [] })
    }
  } catch (e) {
    await interaction.editReply({
      content: "Confirmation not received within 1 minute, cancelling",
      components: [],
    })
  }
}

async function handleButton({ interaction }: { interaction: ButtonInteraction }) {
  const action = interaction.customId.split(":")[1]

  if (action === "confirm") {
    await interaction.message.edit({
      content: `${interaction.user.username} has been banned!`,
      components: [],
    })
  } else if (action === "cancel") {
    await interaction.message.edit({ content: "Action cancelled", components: [] })
  } else if (action === "emoji") {
    await interaction.message.edit({ content: "😇", components: [] })
  }
}
