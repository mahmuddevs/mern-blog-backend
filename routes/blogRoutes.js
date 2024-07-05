import express from 'express'
import { upload } from '../config/multer.js'
import { addBlog, getBlog, getSingleBlog, editBlog, deleteBlog } from '../controller/blogController.js'

const blogRouter = express.Router()

blogRouter.post('/add-blog', upload.single('postThumbnail'), addBlog)

blogRouter.get('/show-blogs', getBlog)

blogRouter.get('/show-blog/:id', getSingleBlog)

blogRouter.put('/edit-blog/:id', upload.single('postThumbnail'), editBlog)

blogRouter.delete('/delete-blog/:id', deleteBlog)

export default blogRouter