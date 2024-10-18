import type { Request, Response } from 'express'

import { prisma } from '../db/prisma'

const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body

    const post = await prisma.post.create({
      data: {
        title,
        content
      }
    })

    res.status(201).json(post)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const createPostAndComments = async (req: Request, res: Response) => {
  try {
    const { title, content, comments } = req.body

    const post = await prisma.post.create({
      data: {
        title,
        content,
        comments: {
          create: comments
        }
      },
      include: {
        comments: true
      }
    })

    res.status(201).json(post)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany()

    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const post = await prisma.post.findUnique({ where: { id } })
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, content } = req.body

    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content
      }
    })
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const post = await prisma.post.delete({ where: { id } })
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const likePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.body

    const post = await prisma.post.update({
      where: { id },
      data: {
        likesCount: {
          increment: 1
        }
      }
    })
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

export default {
  createPost,
  getAllPosts,
  getPostById,
  createPostAndComments,
  updatePost,
  deletePost,
  likePost
}
