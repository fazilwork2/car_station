const { number } = require("joi")
const mongoose = require("mongoose")


const carsSchema = new mongoose.Schema({
    title:{
        Type:String,
        require:true,
        MinLength:[4,"char less then four"],
        MaxLength:[30,"char more then 30"]
    },
    Tanirovkasi:{
        Type:Boolean,
        require:true
    },
    price:{
        Type:Number,
        require:true,
        min:[20000000],
        max:[10000000000]
    },
    marca:{
        Type:String,
        require:true,
        enum:["CHEVROLET","lamborghini","lada","ferrari"]
    },
    motor:{
        Type:Number,
        require:true,
        MinLength:[1,"char less then four"],
        MaxLength:[30,"char more then 30"]
    },
    year:{
        Type:Date,
        require:true,
        min: 0,
        max: new Date().getFullYear()
    },
    color:{
        Type:String,
        require:true,
        MinLength:[2,"char less then four"],
        MaxLength:[30,"char more then 30"]
    },
    Distance:{
        Type:Number,
        require:true,
        MinLength:[4,"char less then four"],
        MaxLength:[30,"char more then 30"]
    },
    Gearbook:{
        Type:String,
        require:true,
        enum:["Avtomat karobka","mahanik karobka"]

    },
    desc:{
        Type:String,
        require:true,
        MinLength:[15,"char less then four"],
        MaxLength:[300,"char more then 30"]
    },
})

const carsModule = mongoose.model("cars",carsSchema)


module.exports = {
    carsModule
}