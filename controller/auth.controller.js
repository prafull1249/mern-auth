import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

const SIGNING_SECRET = "prafullgaikwad"

export const login = async (req, res, next) => {
    const {email, password} = req.body;
    console.log(`Finding user - ${email}, ${password}`)
    try {
        const validUser = await User.findOne({
            email,
        })
        
        console.log(validUser)
        if (!validUser) {
            next({
                statusCode: 404,
                message: `User ${email} not found`
            })
        }
        
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        console.log(`${validPassword} - password match result`)
        if (!validPassword) {
            next({statusCode: 401, message: 'The credentials are wrong!!'})
            return
        } 
        const accessToken = jwt.sign({
                username: validUser._id
            },
            SIGNING_SECRET,
            { expiresIn: '1h'})
    
        res.status(200)
            .cookie('accessToken', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })
            .json({
                message: "User logged in successfully",
                user: validUser._doc,
                accessToken
            });
    } catch (exception) {
        console.log(exception)
        next(exception)
    }
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