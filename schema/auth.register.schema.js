const { required } = require("joi")
const mongoose = require("mongoose")

const AuthRegisterSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username berlmagan"],
        minLength: [3, "Username qamida 3 ta harfdan iborat bo'lsin"],
        maxLength: [16, "Username ko'pi bilan 16 ta harfdan iborat bo'lsin"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email berilmagan"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [false, "Password"],
        minlength: [8, "Parol kamida 8 ta belgidan iborat bo'lishi kerak"]
    },
    otp: {
        type: Number,
        required: false
    },
    role: {
        type: String,
        default: "user",
        required: false,
        enum: {
            values: ["user", "admin", "superadmin"],
            message: "{VALUE} Ushbu roleni tanlash mumkin emas"
        }
    },
    isVerified: {
        type: Boolean,
        default: false,
        required: false
    },
    otpTime: {
        type: Number,
        required: false
    }
},
    {
        versionKey: false,
        timestamps: true
    })

const AuthModel = mongoose.model("Auth", AuthRegisterSchema)
module.exports = AuthModel
