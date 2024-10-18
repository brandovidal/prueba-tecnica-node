import { afterAll, beforeAll, describe, test, expect } from 'vitest'
import request, { SuperTest } from 'supertest'

import prisma from '../src/db/prisma'
import { Post } from '@prisma/client'

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

  test('POST /api/post/create', async () => {
    const name = 'test'

    const response = await server
      .post('/api/post/create')
      .set('Accept', 'application/json')
      .send({
        title: name,
        content: name
      })

    expect(response.status).toBe(201)
    expect(response.body.title).toBe(name)
  })

  test('GET /api/post/all', async () => {
    const response = await server
      .get('/api/post/all')
      .set('Accept', 'application/json')

    const data = await prisma.post.findMany()

    expect(response.status).toBe(200)
    expect(response.body.length).greaterThanOrEqual(data.length)
  })

  test('UPDATE /api/post/:id', async () => {
    const data = await prisma.post.findFirst()

    expect(data).not.toBeNull()

    const response = await server
      .put(`/api/post/${data.id}`)
      .set('Accept', 'application/json')
      .send({
        title: 'new title'
      })

    const newData = await prisma.post.findFirst()

    expect(response.status).toBe(200)
    expect(response.body.title).toBe(newData?.title)
  })

  test('DELETE /api/post/:id', async () => {
    const data = await prisma.post.findFirst()

    expect(data).not.toBeNull()

    const response = await server.delete(`/api/post/${data.id}`)

    expect(response.status).toBe(200)
  })
})
