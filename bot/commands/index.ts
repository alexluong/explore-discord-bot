import { Command } from "bot/types"
import { Collection } from "discord.js"

// commands
import { pingCommand } from "./ping"

const commandArray: Command[] = [pingCommand]

export const commands = commandArray.reduce((commands, command) => {
  commands.set(command.name, command)
  return commands
}, new Collection<string, Command>())
