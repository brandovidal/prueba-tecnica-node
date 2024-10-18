import { afterAll, beforeAll, describe, test, expect } from 'vitest'
import type { SuperTest } from 'supertest'

import prisma from '../src/db/prisma'

import { startServer, stopServer } from './test.server'

const baseUrl = 'http://localhost:3000'
let server: SuperTest

describe('Server App', () => {
  beforeAll(async () => {
    server = await startServer()
  })

  afterAll(async () => {
    await stopServer()
  })

  test('POST /api/book/create', async () => {
    const title = 'Random Book'

    const response = await server
      .post('/api/book/create')
      .set('Accept', 'application/json')
      .send({
        title,
        chapters: 8,
        pages: 100,
        authors: [{ name: 'Random Author' }]
      })

    expect(response.status).toBe(201)
    expect(response.body.data.title).toBe(title)
  })

  test('GET /api/book/all', async () => {
    const response = await server
      .get('/api/book/all')
      .set('Accept', 'application/json')

    const data = await prisma.book.findMany()

    expect(response.status).toBe(200)
    expect(response.body.data.length).greaterThanOrEqual(data.length)
  })

  test('GET /api/book/average/:id', async () => {
    const data = await prisma.book.findFirst()

    expect(data).not.toBeNull()

    const response = await server.get(`/api/book/average/${data.id}`)

    expect(response.status).toBe(200)

    const averagePage = Number(data.pages / data.chapters).toFixed(2)
    expect(response.body.data.averagePage).toBe(averagePage)
  })
})
