const nodemailer = require("nodemailer");

module.exports = async function emailServise(email, randomNumbers) {
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fsadikov574@gmail.com",
    pass: "zbcs xkkc vjpv wtrh " 
  }
});



  await transport.sendMail({
    from: "fsadikov574@gmail.com",
    to: email,
    subject: "car_sataion email verify",
    html: `randomNumbers: <b style = "font-size: 40px; color: red;">${randomNumbers}</b> this password work 2 minuts`,
  });
};
