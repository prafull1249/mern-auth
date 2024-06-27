import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from '../routes/user.route.js'
import authRouter from '../routes/auth.route.js'

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

app.listen(3001, () => {
    console.log("Server started listening at 3001")
})


app.use('/users', userRoutes)
app.use('/auth', authRouter)
const errorHandler = (err,req, res, next) => {
    console.log("Inside middleware!!")
    const errorCode = err.statusCode || 500
    const errorMessage = err.message

    return res.status(errorCode).json({
        message: errorMessage,
        errorCode,
        success: false
    })
}

app.use(errorHandler)

app.get('/', (req, res) => {
    console.log("Welcome home")
    res.status(200).send({
        "message": "Welcome Home"
    })
})
