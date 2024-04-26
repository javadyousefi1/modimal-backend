const nodemailer = require("nodemailer");

async function sendVerifyCode(firstName, lastName, email, verifyCode) {
  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "modimalshop@gmail.com", // Your Gmail account
      pass: "pktocncokaxsutos", // Your Gmail password
    },
  });

  // Set up email data with unicode symbols
  let mailOptions = {
    from: "Modimal Shop", // sender address
    to: email, // list of receivers
    subject: "Verifcation of modimal account", // Subject line
    text: "welcome to modimalshop", // plain text body
    html: `
    <div style="max-width: 600px; margin: auto; color: white;">
        <h1 style="color: white;">Please Verify Your Email Address</h1>
        <p style="color: white;">Hello ${firstName + " " + lastName}</p>
        <p style="color: white;">Thank you for signing up for our service. To complete your registration, please verify code into your profile </p>
        <div  style="background-color: #5a6d57; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Verify code : ${verifyCode}</div>
        <p style="color: white;">If you did not sign up for our service, please ignore this email.</p>
        <p style="color: white;">Thank you,</p>
        <p style="color: white;">Modimal</p>
    </div>
    `, // html body
  };

  // Send mail with defined transport object
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      // console.log("Message sent: %s", info.messageId);
      // res.status(200).json({ message: "ok" });
    }
  });
}

module.exports = sendVerifyCode;
