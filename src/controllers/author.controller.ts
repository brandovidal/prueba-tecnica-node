import type { Request, Response } from 'express'

import { prisma } from '../db/prisma'

const createAuthor = async (req: Request, res: Response) => {
  try {
    const { name } = req.body

    const data = await prisma.author.create({
      data: {
        name
      }
    })

    res.status(201).json({ success: true, data })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const data = await prisma.author.findMany()

    res.status(200).json({ success: true, data })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}


export default {
  createAuthor,
  getAllAuthors
}
