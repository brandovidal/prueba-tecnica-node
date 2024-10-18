import type { Request, Response } from 'express'

import { prisma } from '../db/prisma'

const createBookAndAuthor = async (req: Request, res: Response) => {
  try {
    const { title, chapters, pages, authors } = req.body

    const data = await prisma.book.create({
      data: {
        title,
        chapters,
        pages,
        authors: {
          create: authors
        }
      },
      include: {
        authors: true
      }
    })

    res.status(201).json({ success: true, data })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const data = await prisma.book.findMany()

    res.status(200).json({ success: true, data })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const getAverageBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const book = await prisma.book.findUnique({ where: { id } })

    const averagePage = Number(book.pages / book.chapters).toFixed(2)

    const data = {
      id: book.id,
      averagePage
    }

    res.status(200).json({ success: true, data })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

export default {
  createBookAndAuthor,
  getAllBooks,
  getAverageBook
}
