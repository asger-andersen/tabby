require('dotenv').config({
    path: `${__dirname}/.env`
});
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const supabase = require('../../db-config');

const protect = asyncHandler(async (req, res, next) => {
    // Create variable
    let token

    if (req.headers.cookie) {
        try {
            // Split cookies into an array
            const cookies = req.headers.cookie.split(';')

            // Iterate through the cookies in the array
            for (let cookie of cookies) {

                // Remove potential whitespace from cookie
                cookie = cookie.trim()

                if (cookie.startsWith('jwt')) {
                    token = cookie.split('=')[1]

                    //Verify token
                    const decoded = jwt.verify(token, process.env.JWT_SECRET)

                    //Get user from the token
                    const { data, error } = await supabase
                        .from('user')
                        .select()
                        .eq("user_id", decoded.id)

                    if (error) {
                        throw new Error(error.message);
                    } else {
                        req.user = data
                    }
                }
            }

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    // If token is not present, the user is unauthorized
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = {
    protect
}