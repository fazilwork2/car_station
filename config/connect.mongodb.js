const mongoose = require('mongoose');
require("dotenv").config()

const conectDb = async ()=> {
    try {
        await mongoose.connect("mongodb+srv://fsadikov574:0NOYtSKicb6NFivX@cluster0.unqrha0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
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