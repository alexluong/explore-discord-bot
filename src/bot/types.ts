import {
  ButtonInteraction,
  ChatInputCommandInteraction,
  Client,
  ContextMenuCommandInteraction,
  ModalSubmitInteraction,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  RESTPostAPIContextMenuApplicationCommandsJSONBody,
} from "discord.js"

type CommandContext = {
  interaction:
    | ChatInputCommandInteraction
    | ButtonInteraction
    | ModalSubmitInteraction
    | ContextMenuCommandInteraction
  client: Client
}

export type Command = {
  data:
    | RESTPostAPIChatInputApplicationCommandsJSONBody
    | RESTPostAPIContextMenuApplicationCommandsJSONBody
  execute: (context: CommandContext) => void | Promise<unknown>
}

export type Event<Params extends Array<any>> = {
  name: string
  once?: boolean
  execute: (...params: Params) => void
}
