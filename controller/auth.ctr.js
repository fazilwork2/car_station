const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const AuthModel = require("../schema/auth.register.schema")
const BaseError = require("../error/baseError")
const emailService = require("../utils/nodemailer")

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body

        const foundedUser = await AuthModel.findOne({ email })
        if (foundedUser) {
            throw BaseError.UnAuthorized("Email already in use")
        }

        const foundedUsername = await AuthModel.findOne({ username })
        if (foundedUsername) {
            throw BaseError.BadRequest("User already in use")
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const randomNumbers = +Array.from({length: 6}, () => Math.floor(Math.random() * 9) + 1).join("")
        const otpTimeNow = Date.now() + 120000

        await AuthModel.create({
            username,
            email,
            password: hashPassword,
            otp: randomNumbers,
            otpTime: otpTimeNow
        })

        emailService(email, randomNumbers)  

        res.status(201).json({
            message: "Registered please verify your email!"
        })

    } catch (error) {
        next(error)
    }
}


const verifyEmail = async (req, res, next) => {
    try {
        const { email, otp } = req.body

        const foundedUser = await AuthModel.findOne({ email })

        if (!foundedUser) {
            throw BaseError.UnAuthorized("User not found")
        }

        if (otp !== foundedUser.otp) {
            throw BaseError.UnAuthorized("Wrong otp")
        }
        
        const now = Date.now()

        if (foundedUser.otpTime < now) {
            await AuthModel.findOneAndUpdate({ email: email }, { otpTime: null })
            throw BaseError.UnAuthorized("Otp expired")
        }

        await AuthModel.findOneAndUpdate({ email: email }, { isVerified: true })

        res.status(201).json({
            message: "Otp successfully verified"
        })

    } catch (error) {
        next(error)
    }
}


const resentPassword = async (req, res, next) => {
    try {
        const { email } = req.body

        const foundedUser = await AuthModel.findOne({ email })

        if (!foundedUser) {
            throw BaseError.UnAuthorized("User not found")
        }

        const randomNumbers = +Array.from({length: 6}, () => Math.floor(Math.random() * 9) + 1).join("")
        const otpTimeNow = Date.now() + 120000

        await AuthModel.findOneAndUpdate({ email }, { otp: randomNumbers, otpTime: otpTimeNow, isVerified: false})

        emailService(email, randomNumbers)

        res.status(201).json({
            message: "Resend new code please verify your email!"
        })
    } catch (error) {
        next(error)
    }
}


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const foundedUser = await AuthModel.findOne({ email })

        if (!foundedUser) {
            throw BaseError.UnAuthorized("User not found");
        }

        const decodePassword = await bcrypt.compare(password, foundedUser.password)

        if (!decodePassword && foundedUser.isVerified) {
            throw BaseError.UnAuthorized("Wrong password or email doesn't verified")
        }

        const payload = { email: foundedUser.email, id: foundedUser._id, role: foundedUser.role }
        const token = jwt.sign(payload, process.env.SEKRET_KEY, { expiresIn: "20m" })

        res.status(200).json({
            message: "Success",
            token
        })

    } catch (error) {
        next(error)
    }
}

const changPassword = async (req, res, next) => {
    try {
        const { email,newPassword } = req.body

        const foundedUser = await AuthModel.findOne({ email })

        if (!foundedUser) {
            throw BaseError.UnAuthorized("User not found")
        }

        if (foundedUser.isVerified) {
            const hashPassword = await bcrypt.hash(newPassword,18)
            await AuthModel.updateOne({email:email},{password:hashPassword})
        }

        await AuthModel.updateOne({email:email},{isVerified:false})


        const randomNumbers = +Array.from({length: 6}, () => Math.floor(Math.random() * 9) + 1).join("")
        const otpTimeNow = Date.now() + 120000

        await AuthModel.findOneAndUpdate({ email }, { otp: randomNumbers, otpTime: otpTimeNow, isVerified: false})

        emailService(email, randomNumbers)

        res.status(201).json({
            message: "succses"
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    register,
    verifyEmail,
    resentPassword,
    login,
    changPassword,
}