import express, { json } from 'express'

import type * as http from 'http'
import morgan from 'morgan'

import bookRouter from './routes/book.route'
import authorRouter from './routes/author.route'

const PORT = 3000
let httpServer: http.Server

async function start (port = PORT) {
  const app = express()

  app.use(json())
  app.use(morgan('dev'))

  app.use('/api/book', bookRouter)
  app.use('/api/author', authorRouter)

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
