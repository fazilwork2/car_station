const {Router} =require("express")
const { getAllCars, addcar, getOnecar, updatecar, deletecar, getCarsbyCategori } = require("../controller/cars.ctr")


const carsRouter = Router()


carsRouter.get("/getAllcars",getAllCars)
carsRouter.get("/getOnecars",getOnecar)
carsRouter.get("/getCarsByMarca/:marca",getCarsbyCategori)
carsRouter.post("/addcars",addcar)
carsRouter.put("/updataOnecars",updatecar)
carsRouter.delete("/deleatCar",deletecar)


module.exports = {
    carsRouter
}