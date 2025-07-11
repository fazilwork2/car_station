const { Router } = require("express")
const { register, login, verifyEmail, resentPassword, forgatePassword, changPassword, logOut } = require("../controller/auth.ctr")

const authValidationMiddleware = require("../middleware/auth.validation.middleware")

const authRouter = Router()

authRouter.post("/register", authValidationMiddleware, register)
authRouter.post("/verify", verifyEmail)
authRouter.post("/resend", resentPassword)
authRouter.post("/forgatepassword", forgatePassword)
authRouter.post("/changPassword", changPassword)
authRouter.post("/login", authValidationMiddleware, login)
authRouter.post("/logOut", logOut)
module.exports = authRouter
