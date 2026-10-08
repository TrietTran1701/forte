import { spawnSync } from 'node:child_process'
import { config as loadEnv } from 'dotenv'

loadEnv()

const databaseUrl = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL || ''

if (!databaseUrl.startsWith('postgres')) {
  process.exit(0)
}

const result = spawnSync('payload', ['migrate'], {
  stdio: 'inherit',
  env: process.env,
})

process.exit(result.status ?? 1)
