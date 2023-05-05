import { Collection } from "discord.js"
import { Command } from "~/types"

// commands
import { echoCommand } from "./echo"
import { pingCommand } from "./ping"

const commandArray: Command[] = [echoCommand, pingCommand]

export const commands = commandArray.reduce((commands, command) => {
  commands.set(command.data.name, command)
  return commands
}, new Collection<string, Command>())
