export const errorHandler = (err,req, res, next) => {
    console.log("Inside middleware!!")
    const errorCode = err.statusCode || 500
    const errorMessage = err.message

    return res.status(errorCode).json({
        message: errorMessage,
        errorCode,
        success: false
    })
}