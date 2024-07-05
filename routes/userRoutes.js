import express from 'express'
import { User } from '../models/userModel.js'
import { Login, Register, Verify } from '../controller/userController.js'

  
const userRouter = express.Router()


userRouter.post('/register', Register);
userRouter.post('/login', Login);
userRouter.get('/verify', Verify);

userRouter.post('/add', async (req, res) => {
    try {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        const user = await User.create(newUser)
        return res.status(201).send(user)

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }

})

userRouter.get('/',(req,res) => {
    res.send("working")
})


export default userRouter