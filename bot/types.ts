import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from "discord.js"

type CommandContext = {
  interaction: ChatInputCommandInteraction
  client: Client
}

export type Command = {
  data: SlashCommandBuilder
  execute: (context: CommandContext) => void | Promise<unknown>
}

export type Event<Params extends Array<any>> = {
  name: string
  once?: boolean
  execute: (...params: Params) => void
}
