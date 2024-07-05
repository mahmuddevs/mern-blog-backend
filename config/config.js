import 'dotenv/config'

export const PORT = process.env.PORT 

export const mongoDBURL = `mongodb+srv://root:${process.env.MONGO_DB_PASS}@merncluster.qifq6.mongodb.net/blogs-collection?retryWrites=true&w=majority&appName=MernCluster`

export const jwtSecretkey = process.env.JWT_SECRET_KEY
