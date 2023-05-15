import {
  ButtonInteraction,
  ChatInputCommandInteraction,
  Client,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord.js"

type CommandContext = {
  interaction: ChatInputCommandInteraction | ButtonInteraction
  client: Client
}

export type Command = {
  data: RESTPostAPIChatInputApplicationCommandsJSONBody
  execute: (context: CommandContext) => void | Promise<unknown>
}

export type Event<Params extends Array<any>> = {
  name: string
  once?: boolean
  execute: (...params: Params) => void
}
