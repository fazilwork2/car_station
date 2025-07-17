const jwt = require("jsonwebtoken");
const CustomError = require("../error/baseError");
const { refreshTokenGen, acceessTokenGen } = require("../utils/tokens.gen");

module.exports = function acceessTokenMiddleware(req, res, next) {
  try {
    const refresh_Token = req.cookies.refreshToken;

    if (!refresh_Token) {
      throw CustomError.UnAuthorized("refresh token is not found");
    }
    const decode = jwt.verify(refresh_Token, process.env.SEKRET_REFRESH_KEY);

    req.user = decode;

    const payload = {email:req.user.email,id:req.user.id,role:req.user.role}

    const acceessToken = acceessTokenGen(payload);

    res.cookie("accesToken", acceessToken, {
      httpOnly: true,
      maxAge: 1000 * 60  * 15,
    });


    return next();
  } catch (error) {
    next(error);
  }
};
