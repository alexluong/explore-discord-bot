import { Collection } from "discord.js"
import { Command } from "~/types"

// commands
import { echoCommand } from "./echo"
import { infoCommand } from "./info"
import { pingCommand } from "./ping"

const commandArray: Command[] = [echoCommand, infoCommand, pingCommand]

export const commands = commandArray.reduce((commands, command) => {
  commands.set(command.data.name, command)
  return commands
}, new Collection<string, Command>())
