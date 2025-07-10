const { number } = require("joi")
const mongoose = require("mongoose")


const carsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        MinLength:[4,"char less then four"],
        MaxLength:[30,"char more then 30"]
    },
    Tanirovkasi:{
        type:Boolean,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:[20000000],
        max:[10000000000]
    },
    marca:{
        type:String,
        required:true,
        enum:["CHEVROLET","lamborghini","lada","ferrari"]
    },
    motor:{
        type:Number,
        required:true,
        MinLength:[1,"char less then four"],
        MaxLength:[30,"char more then 30"]
    },
    year:{
        type:Date,
        required:true,
        min: 0,
        max: new Date()
    },
    color:{
        type:String,
        required:true,
        MinLength:[2,"char less then four"],
        MaxLength:[30,"char more then 30"]
    },
    Distance:{
        type:Number,
        required:true,
        MinLength:[4200,"char less then four"],
        MaxLength:[300000,"char more then 30"]
    },
    Gearbook:{
        type:String,
        required:true,
        enum:["Avtomat karobka","mahanik karobka"]

    },
    desc:{
        type:String,
        required:true,
        MinLength:[15,"char less then four"],
        MaxLength:[300,"char more then 30"]
    },
})

const carsModule = mongoose.model("cars",carsSchema)


module.exports = {
    carsModule
}