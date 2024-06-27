import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from '../routes/user.route.js'

dotenv.config() 

const app = express()

// connect to mongodb

mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
    console.log("Succcessfully connected to MongoDB");
}).catch((err) => {
    console.log("Could not connect to MONGO!! " + err) 
})

app.get('/', (req, res) => {
    console.log("Welcome home")
    res.status(200).send({
        "message": "Welcome Home"
    })
})

app.use('/users', userRoutes)

app.listen(3001, () => {
    console.log("Server started listening at 3001")
})
