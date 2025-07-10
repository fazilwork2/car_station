const express = require("express")
const cors = require("cors")
const { conectDb } = require("./config/connect.mongodb")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())
conectDb()

const PORT = process.env.PORT || 3000



app.listen(PORT,()=>{console.log(`server run in ${PORT}`);})