const { carsModule } = require("../schema/cars.schema");
const logger = require("../utils/log");

const getAllCars = async (req, res, next) => {
  try {
    const cars = await carsModule.find();

    logger.info(`all cars success`);
    res.status(200).json({ cars });

  } catch (error) {
    logger.error(`getAll cars error for `);
    next(error);
  }
};

const getCarsbyCategori = async (req, res, next) => {
  try {
    const { marca } = req.params;
    const cars = await carsModule.find({ marca: marca });
    
    logger.info(`code has been sended success`);
    res.status(200).json({ cars });
  } catch (error) {
    logger.error(`get cars by categori error`);
    next(error);
  }
};

const addcar = async (req, res, next) => {
  try {
    const {
      title,
      Tanirovkasi,
      price,
      marca,
      motor,
      year,
      color,
      Distance,
      Gearbook,
      desc,
    } = req.body;

    await carsModule.create({
      title,
      Tanirovkasi,
      price,
      marca,
      motor,
      year,
      color,
      Distance,
      Gearbook,
      desc,
    });

    
    logger.info(`add car success`);
    res.status(201).json({ message: "Added new car" });
  } catch (error) {
    logger.error(`add care error`);
    next(error);
  }
};

const getOnecar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await carModel.findById(id);

    if (!car) {
      return res.status(404).json({
        message: "bad reqvest",
      });
    }

    
    logger.info(`code has been sended success`);
    res.status(200).json(car);
  } catch (error) {
    logger.error(`get one care error for`);
    next(error);
  }
};

const updatecar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      Tanirovkasi,
      price,
      marca,
      motor,
      year,
      color,
      Distance,
      Gearbook,
      desc,
    } = req.body;

    const car = await carsModule.findById(id);

    if (!car) {
      return res.status(404).json({
        message: "bad reqvest",
      });
    }

    await carsModule.findByIdAndUpdate(id, {
      title,
      Tanirovkasi,
      price,
      marca,
      motor,
      year,
      color,
      Distance,
      Gearbook,
      desc,
    });

    
    logger.info(`code has been sended success`);
    res.status(201).json({
      message: "car updated",
    });
  } catch (error) {
    logger.error(`uppdate car error`);
    next(error);
  }
};

const deletecar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await carsModule.findById(id)

    if (!car) {
      return res.status(404).json({
        message: "bad reqvest",
      });
    }

    await carsModule.findByIdAndDelete(id);
    
    logger.info(`code has been sended success`);
    res.status(200).json({
      message: "car deleted",
    });
  } catch (error) {
    logger.error(`dealet car error`);
    next(error);
  }
};

module.exports = {
  getAllCars,
  addcar,
  getOnecar,
  updatecar,
  deletecar,
  getCarsbyCategori,
};
