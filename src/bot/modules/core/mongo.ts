import { MongoClient } from "mongodb"

import * as env from "./env"

let _client: MongoClient

export function getClient(): MongoClient {
  if (_client) return _client
  const client = new MongoClient(String(env.mongoUrl))
  return client
}

export const mongo = getClient()
