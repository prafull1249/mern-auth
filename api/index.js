import express from 'express'

const app = express()

app.get('/', (req, res) => {
    console.log("Welcome home")
    res.status(200).send({
        "message": "Welcome Home"
    })
})

app.listen(3001, () => {
    console.log("Server started listening at 3001")
})