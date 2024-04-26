import express from 'express'
import { Blog } from '../models/blogModel.js'
import { upload } from '../config/multer.js'

const blogRouter = express.Router()

blogRouter.post('/add-blog', upload.single('postThumbnail'), async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.content ||
            !req.file
        ) {
            return res.status(400).send({
                message: 'Fill all the required input fields'
            })
        }
        const newBlog = {
            title: req.body.title,
            author: req.body.author,
            content: req.body.content,
            postThumbnail: req.file.filename
        }

        const blog = await Blog.create(newBlog)
        return res.status(201).send(blog)

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})

blogRouter.get('/show-blogs', async (req, res) => {
    try {
        const blogs = await Blog.find({})
        return res.status(200).json({
            count: blogs.length,
            data: blogs
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message })
    }
})

blogRouter.get('/show-blog/:id', async (req, res) => {
    try {
        const { id } = req.params
        const blog = await Blog.findById(id)
        return res.status(200).json(blog)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message })
    }
})

blogRouter.put('/edit-blog/:id', upload.single('postThumbnail'), async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.content ||
            !req.file
        ) {
            return res.status(400).send({
                message: 'Fill all the required input fields'
            })
        }

        const { id } = req.params

        const updatedBLog = {
            title: req.body.title,
            author: req.body.author,
            content: req.body.content,
            postThumbnail: req.file.filename
        };

        const updatedBlog = await Blog.findByIdAndUpdate(id, updatedBLog);

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' })
        }

        return res.status(200).send({ message: 'Blog updated successfully' })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})

blogRouter.delete('/delete-blog/:id', async (req, res) => {
    try {
        const { id } = req.params

        const newBlog = await Blog.findByIdAndDelete(id, req.body)

        if (!newBlog) {
            return res.status(404).json({ message: 'Blog not found' })
        }

        return res.status(200).send({ message: 'Blog deleted successfully' })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})

export default blogRouter