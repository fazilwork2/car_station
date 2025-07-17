const {Router} =require("express")
const { getAllCars, addcar, getOnecar, updatecar, deletecar, getCarsbyCategori } = require("../controller/cars.ctr")
const AdmineCHeker = require("../middleware/cheakAdmin")
const acceessTokenMiddleware = require("../middleware/acceess.Token.middleware")
const AdminChecker = require("../middleware/cheakAdmin")


const carsRouter = Router()


carsRouter.get("/getAllcars",acceessTokenMiddleware,getAllCars)
carsRouter.get("/getOnecars",acceessTokenMiddleware,getOnecar)
carsRouter.get("/getCarsByMarca/:marca",acceessTokenMiddleware,getCarsbyCategori)
carsRouter.post("/addcars",[AdminChecker,acceessTokenMiddleware],addcar)
carsRouter.put("/updataOnecars/:id",acceessTokenMiddleware,AdminChecker,AdmineCHeker,updatecar)
carsRouter.delete("/deleatCar/:id",[acceessTokenMiddleware,AdmineCHeker],deletecar)


module.exports = {
    carsRouter
}