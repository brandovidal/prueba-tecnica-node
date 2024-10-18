import express from 'express'

import postController from '../controllers/post.controller'

const router = express.Router()

router.post('/create', postController.createPost)
router.post('/create/comments', postController.createPostAndComments)
router.get('/all', postController.getAllPosts)
router.get('/:id', postController.getPostById)
router.put('/:id', postController.updatePost)
router.delete('/:id', postController.deletePost)

router.post('/like', postController.likePost)

export default router
