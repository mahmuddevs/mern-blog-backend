import express from 'express'
import cors from 'cors'
import { PORT, mongoDBURL } from './config/config.js'
import mongoose from 'mongoose'
import 'dotenv/config'
import blogRouter from './routes/blogRoutes.js'
import userRouter from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())
app.use('/uploads', express.static('uploads'))

app.use('/blogs',blogRouter)
app.use('/users',userRouter)


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Connected to database');
        app.listen(PORT, () => {
            console.log(`Running in port ${PORT}`);
        })

    })
    .catch((error) => {
        console.log(error);
    })