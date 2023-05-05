import { REST, RESTGetAPIOAuth2CurrentApplicationResult, Routes } from "discord.js"
import { commands } from "~/commands"

export async function run() {
  try {
    const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN!)

    console.log(`Started refreshing ${commands.size} application (/) commands.`)

    const me = (await rest.get(
      Routes.oauth2CurrentApplication(),
    )) as RESTGetAPIOAuth2CurrentApplicationResult
    const data = await rest.put(Routes.applicationCommands(me.id), {
      body: commands.map((command) => command.data),
    })

    console.log(`Successfully reloaded ${(data as any).length} application (/) commands.`)
  } catch (error) {
    console.error(error)
  }
}

run()
