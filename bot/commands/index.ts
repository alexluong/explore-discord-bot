import { Collection } from "discord.js"
import { Command } from "~/types"

// commands
import { echoCommand } from "./echo"
import { embedCommand } from "./embed"
import { infoCommand } from "./info"
import { messageCommand } from "./message"
import { pingCommand } from "./ping"

const commandArray: Command[] = [
  echoCommand,
  embedCommand,
  infoCommand,
  messageCommand,
  pingCommand,
]

export const commands = commandArray.reduce((commands, command) => {
  commands.set(command.data.name, command)
  return commands
}, new Collection<string, Command>())
