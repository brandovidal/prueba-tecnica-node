import { Router } from 'express'

import authorController from '../controllers/author.controller'

const router = Router()

router.post('/create', authorController.createAuthor)
router.get('/all', authorController.getAllAuthors)

export default router
