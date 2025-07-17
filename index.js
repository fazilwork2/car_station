const express = require("express")
const cors = require("cors")
const { conectDb } = require("./config/connect.mongodb")
const { carsRouter } = require("./router/cars.route")
const authRouter = require("./router/auth.routes")
require("dotenv").config()
const cookieParser = require("cookie-parser");
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
const PORT = process.env.PORT || 3000

app.use(carsRouter)
app.use(authRouter)

conectDb()

app.listen(PORT,()=>{console.log(`server run in ${PORT}`)})