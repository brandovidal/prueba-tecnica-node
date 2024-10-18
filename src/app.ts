import express from 'express'
import type * as http from 'http'

import { PrismaClient } from '@prisma/client'

import postRouter from './routes/post.route'
import { prisma } from './db/prisma'

const PORT = 3000
let httpServer: http.Server

async function start (port = PORT) {
  const app = express()
  app.use(express.json())

  app.get('/', (req, res) => {
    res.send('App is running!')
  })

  app.use('/api/post', postRouter)

  app.all('*', (req, res) => {
    res.status(404).send('Route not found')
  })

  httpServer = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
  })
  return httpServer
}

const stop = async () => {
  httpServer.close()
}

export { start, stop }
