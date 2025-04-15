require('dotenv').config({
    path: `${__dirname}/.env`
});
const jwt = require('jsonwebtoken')


// @desc    Create and return cookie
// @func    Used in signIn
//
const generateCookie = async (data) => {

    // Destructure payload
    const { userid, json, res, status } = data

    // Generate JWT
    const token = await generateToken(userid);

    // Define cookie options
    const options = {
        httpOnly: true,
        sameSite: 'None', // For cross-origin
        secure: true,     // Only over HTTPS
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    };


    // Return cookie
    res.status(status)
    res.cookie('jwt', token, options)
    res.json(
        json
    );
}



// @desc    Generate JWT
// @func    Used in generateCookie
//
const generateToken = async (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}



module.exports = {
    generateCookie
}