const { Router } = require("express")
const { register, login, verifyEmail, resentPassword, forgatePassword, changPassword, logOut, myProfile, getAlluser } = require("../controller/auth.ctr")

const authValidationMiddleware = require("../middleware/auth.validation.middleware")
const AdmineCHeker = require("../middleware/cheakAdmin")
const refreshTokeMiddleware = require("../middleware/refresh.toke.middleware")

const authRouter = Router()

authRouter.post("/register", authValidationMiddleware, register)
authRouter.post("/verify", verifyEmail)
authRouter.post("/resend", resentPassword)
authRouter.post("/forgatepassword", forgatePassword)
authRouter.post("/changPassword", changPassword)
authRouter.post("/login", login)
authRouter.post("/logOut", logOut)
authRouter.post("/refreshtoken", refreshTokeMiddleware)
authRouter.get("/myProfile",authValidationMiddleware,myProfile)
authRouter.get("/getalluser",AdmineCHeker,getAlluser)

module.exports = authRouter