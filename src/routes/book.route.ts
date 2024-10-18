import { Router } from 'express'

import bookController from '../controllers/book.controller'

const router = Router()

router.post('/create', bookController.createBookAndAuthor)
router.get('/all', bookController.getAllBooks)
router.get('/average/:id', bookController.getAverageBook)

export default router
