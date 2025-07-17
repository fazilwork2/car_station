const jwt = require("jsonwebtoken")

const acceessTokenGen = (payload) =>{
    return jwt.sign(payload,process.env.SEKRET_KEY,{expiresIn:"15m"})
}


const refreshTokenGen = (payload) =>{
    return jwt.sign(payload,process.env.SEKRET_REFRESH_KEY,{expiresIn:"7d"})
}


module.exports = {
    acceessTokenGen,
    refreshTokenGen
}