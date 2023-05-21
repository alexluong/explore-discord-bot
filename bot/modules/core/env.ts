const getEnv = (name: string) => {
  return process.env[name]
}

export const mongoUrl = getEnv("MONGO_URL")
