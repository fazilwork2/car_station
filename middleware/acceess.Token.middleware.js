const jwt = require("jsonwebtoken")
const CustomError = require("../error/baseError")

module.exports = function acceessTokenMiddleware(req,res,next) {
    try {
        const acceessToken = req.cookies.accesToken

        if (!acceessToken) {
            throw CustomError.UnAuthorized("acceess token is not found")
        }
        const decode = jwt.verify(acceessToken,process.env.SEKRET_KEY) 

        req.user =decode
        next()
    } catch (error) {
        next(error)
    }
}  