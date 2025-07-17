const bcrypt = require("bcryptjs");
const AuthModel = require("../schema/auth.register.schema");
const BaseError = require("../error/baseError");
const emailService = require("../utils/nodemailer");
const logger = require("../utils/log");
const { profile } = require("winston");
const CustomError = require("../error/baseError");
const { acceessTokenGen, refreshTokenGen } = require("../utils/tokens.gen");

const register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    const foundedUser = await AuthModel.findOne({ email });

    if (foundedUser) {
      throw CustomError.UnAuthorized("user is alrady registered");
    }

    const hashPassword = await bcrypt.hash(password, 8);

    const randomNumbers = +Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * 9) + 1
    ).join("");
    const OtpTime = Date.now() + 300000;

    await AuthModel.create({
      username,
      email,
      password: hashPassword, 
      otp: randomNumbers,
      otpTime: OtpTime,
    });

    emailService(email, randomNumbers);

    res.status(201).json({
      message: "verify",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const foundedUser = await AuthModel.findOne({ email });

  console.log(foundedUser);

  if (!foundedUser) {
    throw CustomError.UnAuthorized("user not found");
  }

const decodePassword = await bcrypt.compare(
  password,
  foundedUser.password
);

console.log("work");

  if (decodePassword && foundedUser.isVerified) {
    const payload = {
      id: foundedUser.id,
      email: foundedUser.email,
      role: foundedUser.role,
    };
    const acceessToken = acceessTokenGen(payload);
    const refreshToken = refreshTokenGen(payload);
    
    res.cookie("accesToken", acceessToken, {
      httpOnly: true,
      maxAge: 15 * 1000 * 60,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });



    return res.status(200).json({
      message: "all work",
      acceessToken,
    });
  } else {
    throw CustomError.UnAuthorized("email or password wrong");
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const foundedUser = await AuthModel.findOne({ email });

    if (!foundedUser) {
      throw BaseError.UnAuthorized("User not found");
    }

    if (otp !== foundedUser.otp) {
      throw BaseError.UnAuthorized("Wrong otp");
    }

    const now = Date.now();

    if (foundedUser.otpTime < now) {
      await AuthModel.findOneAndUpdate({ email: email }, { otpTime: null });
      throw BaseError.UnAuthorized("Otp expired");
    }

    await AuthModel.findOneAndUpdate({ email: email }, { isVerified: true });

    logger.info(`verified success: ${email}`);

    res.status(201).json({
      message: "Otp successfully verified",
    });
  } catch (error) {
    logger.error(`verify error ${error.message}`);
    next(error);
  }
};

const resentPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const foundedUser = await AuthModel.findOne({ email });

    if (!foundedUser) {
      throw BaseError.UnAuthorized("User not found");
    }

    const randomNumbers = +Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * 9) + 1
    ).join("");
    const otpTimeNow = Date.now() + 120000;

    await AuthModel.findOneAndUpdate(
      { email },
      { otp: randomNumbers, otpTime: otpTimeNow, isVerified: false }
    );

    emailService(email, randomNumbers);

    logger.info(`Resend new code success: ${email}`);

    res.status(201).json({
      message: "Resend new code please verify your email!",
    });
  } catch (error) {
    logger.error(
      `resent password error for ${req.body?.email}: ${error.message}`
    );
    next(error);
  }
};
const myProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Profile = await carModel.findById(id);

    if (!profile) {
      return res.status(404).json({
        message: "bad reqvest",
      });
    }

    logger.info(`profile dound success: ${email}`);

    res.status(200).json(car);
  } catch (error) {
    logger.error(
      `profile found error for ${req.body?.email} : ${error.message}`
    );
    next(error);
  }
};

const changPassword = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;

    const foundedUser = await AuthModel.findOne({ email });

    if (!foundedUser) {
      throw BaseError.UnAuthorized("User not found");
    }

    if (foundedUser.isVerified) {
      const hashPassword = await bcrypt.hash(newPassword, 18);
      await AuthModel.updateOne({ email: email }, { password: hashPassword });
    }

    await AuthModel.updateOne({ email: email }, { isVerified: false });

    const randomNumbers = +Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * 9) + 1
    ).join("");
    const otpTimeNow = Date.now() + 120000;

    await AuthModel.findOneAndUpdate(
      { email },
      { otp: randomNumbers, otpTime: otpTimeNow, isVerified: false }
    );

    emailService(email, randomNumbers);

    logger.info(`passwors chenget success: ${email}`);

    res.status(201).json({
      message: "succses",
    });
  } catch (error) {
    logger.error(
      `chenget password error for ${req.body?.email} : ${error.message}`
    );
    next(error);
  }
};

const forgatePassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const foundedUser = await AuthModel.findOne({ email });

    if (!foundedUser) {
      throw BaseError.UnAuthorized("you are not registered");
    }

    if (!decodePassword && foundedUser.isVerified) {
      throw BaseError.UnAuthorized("Wrong password or email doesn't verified");
    }

    await AuthModel.updateOne({ email: email }, { isVerified: false });

    logger.info(`code has been sended success: ${email}`);

    res.status(200).json({
      message: "code has been sended",
      token,
    });
  } catch (error) {
    logger.error(
      `forgate password error for ${req.body?.email} : ${error.message}`
    );
    next(error);
  }
};

const logOut = async (req, res, next) => {
  try {
    res.clearCookie("accesToken");
    res.clearCookie("refreshToken");
  } catch (error) {
    logger.error(` logOut error for ${req.body?.email} : ${error.message}`);
    next(error);
  }
};
const getAlluser = async (req, res, next) => {
  try {
    const cars = await AuthModel.find();

    logger.info(`all users success`);
    res.status(200).json({ cars });

  } catch (error) {
    logger.error(`getAll user error for `);
    next(error);
  }
};

module.exports = {
  register,
  getAlluser,
  verifyEmail,
  resentPassword,
  login,
  changPassword,
  forgatePassword,
  logOut,
  myProfile,
};
