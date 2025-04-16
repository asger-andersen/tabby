require('dotenv').config({
    path: `${__dirname}/.env`
});
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const supabase = require('../../db-config');

const protect = asyncHandler(async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

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

        next();
    } catch (error) {
        res.status(401).json({ message: 'Authorization failed' })
        throw new Error('Not authorized')
    }
})

module.exports = {
    protect
}