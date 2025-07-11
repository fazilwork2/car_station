const BaseError = require("../error/baseError");

module.exports = function errorMiddleware(err, req, res, next) {

    console.log(err);
    

    if (err instanceof BaseError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors || [] })
    }

    if (err.name === "ValidationError") {
        const myErrors = Object.values(err.errors || {}).map(e => e.message)

        return res.status(400).json({
            message: "Validation failed",
            errors: myErrors,
            errorName: "ValidationError"
        })
    }

    if (err.name === "MongooseError") {
        const myErrors = Object.values(err.errors || {}).map(e => e.message)

        return res.status(400).json({
            message: "Mongoose failed",
            errors: myErrors,
            errorName: "MongooseError"
        })
    }

    return res.status(500).json({ message: "Internal server error" })
}