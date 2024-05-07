const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_SECRET ?? "9e42b180d11e050c369cb618f77a862a";

function generateToken(payload) {
  return jwt.sign(payload, secret, {
    expiresIn: "36000000s",
  });
}

function checkTokenValid(token) {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    return error.message || "token is not valid";
  }
}

module.exports = { generateToken, checkTokenValid };
