import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"

export const login = (req, res, next) => {
    console.log(req.body)
    res.status(200).json({
        message: "User successfully logged in"
    })
}

export const signup = async (req, res, next) => {
    console.log(req.body)
    const {username, email, password} = req.body
    const hashedpassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({
        username, email, password: hashedpassword
    })

    try {
        await newUser.save()
        res.status(201).json({
            message: `User ${username} created successfully`
        })
    } catch (error) {
        // console.log(`Error occurred while creating user - ${error}`)
        console.log("calling next")
        next(error)
    }
}