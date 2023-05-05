import { ApplicationCommandOptionData, ChatInputCommandInteraction, Client } from "discord.js"

type CommandContext = {
  interaction: ChatInputCommandInteraction
  client: Client
}

export type Command = {
  name: string
  description: string
  options?: ApplicationCommandOptionData[]
  execute: (context: CommandContext) => void | Promise<unknown>
}

export type Event<Params extends Array<any>> = {
  name: string
  once?: boolean
  execute: (...params: Params) => void
}
