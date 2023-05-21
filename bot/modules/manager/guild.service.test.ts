import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { z } from "zod"

import { mongo } from "../core"
import * as guildService from "./guild.service"

describe("guild service", () => {
  const input: z.infer<typeof guildService.JoinInputSchema> = {
    id: "1234",
    name: "hello",
    ownerId: "4321",
  }

  beforeAll(async () => {
    await mongo.connect()
  })

  afterAll(async () => {
    await mongo
      .db()
      .collection<guildService.MongoGuild>("discord:guilds")
      .deleteOne({ _id: input.id })

    await mongo.close()
  })

  it("can add new guild", async () => {
    await guildService.join(input)

    const data = await mongo
      .db()
      .collection<guildService.MongoGuild>("discord:guilds")
      .findOne({ _id: input.id })

    expect(data?._id).eq(input.id)
    expect(data?.name).eq(input.name)
    expect(data?.ownerId).eq(input.ownerId)
    expect(data?.wishtenderStatus).eq("active")
  })

  it("can remove guild", async () => {
    await guildService.leave(input.id)

    const data = await mongo
      .db()
      .collection<guildService.MongoGuild>("discord:guilds")
      .findOne({ _id: input.id })

    expect(data?.wishtenderStatus).eq("inactive")
  })

  it("can join a previous guild after leaving", async () => {
    await guildService.join(input)

    const data = await mongo
      .db()
      .collection<guildService.MongoGuild>("discord:guilds")
      .findOne({ _id: input.id })

    expect(data?._id).eq(input.id)
    expect(data?.name).eq(input.name)
    expect(data?.ownerId).eq(input.ownerId)
    expect(data?.wishtenderStatus).eq("active")
  })
})
