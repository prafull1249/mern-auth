import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from '../routes/user.route.js'
import authRouter from '../routes/auth.route.js'
import { errorHandler } from '../utils/errorHandler.js'
import cors from 'cors'

dotenv.config() 

const app = express()

// connect to mongodb
mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
    console.log("Succcessfully connected to MongoDB");
}).catch((err) => {
    console.log("Could not connect to MONGO!! " + err) 
})


// middleware
app.use(express.json())
app.use(cors())

app.listen(3001, () => {
    console.log("Server started listening at 3001")
})


app.use('/users', userRoutes)
app.use('/auth', authRouter)

/*
Express middleware functions are executed sequentially, in the order they are defined using app.use(). 
This order is crucial for how they interact with requests and responses. Therefore the errorHandler below should be
after the routes as its intended to catch errors after the routes and controllers are executed. 

*/

app.use(errorHandler)

app.get('/', (req, res) => {
    console.log("Welcome home")
    res.status(200).send({
        "message": "Welcome Home"
    })
})
