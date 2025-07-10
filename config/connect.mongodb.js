const mongoose = require('mongoose');
require("dotenv").config()

const conectDb = async ()=> {

    try {
        await mongoose.connect(process.env.MONGODB_LINK)
        .then(() =>
            console.log("mongoose connevted")
        ).catch((err)=> console.log(err.message))
    } catch (error) {
      throw new Error(error.message)
    }
}



module.exports = {
    conectDb
}