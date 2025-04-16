require('dotenv').config({
  path: `${__dirname}/.env`
});
const jwt = require('jsonwebtoken')


// @desc    Create and return JWT
// @func    Used in signIn
//
const generateTokenResponse = async ({ userid, json, res, status }) => {
  const token = await generateToken(userid);

  res.status(status).json({
    ...json,
    token: token,
  });
};



// @desc    Generate JWT
// @func    Used in generateCookie
//
const generateToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}



module.exports = {
  generateTokenResponse
}