import { decode } from 'jsonwebtoken'
import { generateToken, verifyToken } from '../config/jwt.js'
import { User } from '../models/userModel.js'
import bcrypt from "bcrypt"

const Register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    
    if(password !== confirmPassword){
        return res.send("Passwords didn't match")
    }

    const existingUser = await User.findOne({email})

    if(existingUser){
        return res.send("User Exists")
    }

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));


    const newUser = {
        name,
        email,
        password: hashedPassword
    }


    const user = await User.create(newUser)

    const token = generateToken(user)

    user.password = undefined

    return res.json({user, token})
    
}


const Login = async(req,res) => {
    const { email, password } = req.body

    const userExists = await User.findOne({email})

    if(!userExists){
        return res.send("User not found")
    }

    const isValid = await bcrypt.compare(password, userExists.password)

    if(!isValid){
        return res.send("Invalid Credentials")
    }

    const token = generateToken(userExists)
    
    userExists.password = undefined

    const data = userExists

    res.cookie("token", token, {sameSite: 'Strict', maxAge: 30*24*60*60*60*1000})
    return res.json({data, token})
}

const Verify = async(req, res) => {
    const token = req.cookies.token
    if(!token){
        return res.send("No token found")
    }

    const decoded = verifyToken(token)

    const user = await User.findById(decoded.id)

    if(!user){
        return res.send("Unauthorized")
    }

    user.password = undefined

    return res.send(user)
    
}

export {Register, Login, Verify}


