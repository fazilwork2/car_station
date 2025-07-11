const { Router } = require("express")
const { register, login, verifyEmail, resentPassword } = require("../controller/auth.ctr")

const authValidationMiddleware = require("../middleware/auth.validation.middleware")

const authRouter = Router()

authRouter.post("/register", authValidationMiddleware, register)
authRouter.post("/verify", verifyEmail)
authRouter.post("/resend", resentPassword)
authRouter.post("/login", authValidationMiddleware, login)

module.exports = authRouter
