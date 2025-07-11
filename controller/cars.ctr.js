const { carsModule } = require("../schema/cars.schema");

const getAllCars = async (req, res, next) => {
  try {
    const cars = await carsModule.find();
    res.status(200).json({ cars });
  } catch (error) {
    next(error);
  }
};

const getCarsbyCategori = async (req, res, next) => {
  try {
    const { marca } = req.params;
    const cars = await carsModule.find({ marca: marca });
    res.status(200).json({ cars });
  } catch (error) {
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

    res.status(201).json({ message: "Added new car" });
  } catch (error) {
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

    res.status(200).json(car);
  } catch (error) {
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

    const car = await carModel.findById(id);

    if (!car) {
      return res.status(404).json({
        message: "bad reqvest",
      });
    }

    await carModel.findByIdAndUpdate(id, {
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

    res.status(201).json({
      message: "car updated",
    });
  } catch (error) {
    next(error);
  }
};

const deletecar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await carModel.findById(id);

    if (!car) {
      return res.status(404).json({
        message: "bad reqvest",
      });
    }

    await carModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "car deleted",
    });
  } catch (error) {
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
