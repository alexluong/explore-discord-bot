import { Collection } from "discord.js"
import { Command } from "~/types"

// commands
import { pingCommand } from "./ping"

const commandArray: Command[] = [pingCommand]

export const commands = commandArray.reduce((commands, command) => {
  commands.set(command.name, command)
  return commands
}, new Collection<string, Command>())
