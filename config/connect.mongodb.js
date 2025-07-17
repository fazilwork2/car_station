const mongoose = require('mongoose');
require("dotenv").config()

const conectDb = async ()=> {
    try {
        await mongoose.connect(process.env.MONGODB_LINK)
        .then(() =>
            console.log("mongoose connected")
        ).catch((err)=> console.log(err.message))
    } catch (error) {
      console.log("lasasfsa");
      
    }
}
module.exports = {
    conectDb
}