import * as Discord from "discord.js"
import { afterAll, assert, beforeAll, describe, expect, it } from "vitest"
import { z } from "zod"

import { mongo } from "../core"
import * as guildService from "./guild.service"

describe("guild service", () => {
  beforeAll(async () => {
    await mongo.connect()
  })

  afterAll(async () => {
    await mongo.close()
  })

  it("can add new guild", async () => {
    const input: z.infer<typeof guildService.JoinInputSchema> = {
      id: "1234",
      name: "hello",
      ownerId: "4321",
    }

    expect(await guildService.join(input)).eq(1)
  })
})
