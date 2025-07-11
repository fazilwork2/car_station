const { authRegisterValidate } = require("../validation/auth.register.validate")

module.exports = function (req, res, next) {
    const { error } = authRegisterValidate(req.body)
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }

    next()
}