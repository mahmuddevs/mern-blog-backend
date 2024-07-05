import jwt from 'jsonwebtoken'
import { jwtSecretkey } from './config.js'


const generateToken = (user) => {
    return jwt.sign(
        {id:user._id, email: user.email, userType: user.userType}, 
        jwtSecretkey, 
        {expiresIn: '30d'}
    )
}

const verifyToken = (token) => {
    return jwt.verify(token, jwtSecretkey)
}

export {generateToken, verifyToken}