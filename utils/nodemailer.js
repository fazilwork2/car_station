const nodemailer = require("nodemailer");

module.exports = async function emailServise(email, randomNumbers) {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3a878c7f3da67d",
      pass: "91da4bcf58479b",
    },
  });

  await transport.sendMail({
    from: "fsadikov574@gmail.com",
    to: email,
    subject: "car_sataion email verify",
    html: `randomNumbers: <b style = "font-size: 40px; color: red;">${randomNumbers}</b> this password work 2 minuts`,
  });
};
