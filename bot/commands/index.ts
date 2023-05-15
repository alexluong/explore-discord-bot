import { Collection } from "discord.js"
import { Command } from "~/types"

// commands
import { contextMenuCommand } from "./context-menu"
import { echoCommand } from "./echo"
import { embedCommand } from "./embed"
import { infoCommand } from "./info"
import { messageCommand } from "./message"
import { modalCommand } from "./modal"
import { pingCommand } from "./ping"

const commandArray: Command[] = [
  contextMenuCommand,
  echoCommand,
  embedCommand,
  infoCommand,
  messageCommand,
  modalCommand,
  pingCommand,
]

export const commands = commandArray.reduce((commands, command) => {
  commands.set(command.data.name, command)
  return commands
}, new Collection<string, Command>())
