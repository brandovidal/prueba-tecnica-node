import { start, stop } from '../src/app'

import request from 'supertest'

export const startServer = async () => {
  const app = await start(5000)
  return await request(app)
}

export const stopServer = async () => {
  await stop()
}
