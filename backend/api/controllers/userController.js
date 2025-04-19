require('dotenv').config({
    path: `${__dirname}/.env`
})
const asyncHandler = require('express-async-handler')
const supabase = require('../../db-config');
const bcrypt = require('bcrypt')
const { generateTokenResponse } = require('../tokens/createToken')



// @desc    Create user
// @route   POST /api/user/create
// @access  Public
const createUser = asyncHandler(async (req, res) => {

    // Destructure request data
    const { firstname, lastname, user_email, user_password } = req.body;

    // Verify that all required values was passed along in the request
    if (!firstname || !lastname || !user_email || !user_password) {
        res.status(400).json({ error: "All fields are required." });
        return
    }

    // Hash the password
    const hashedpassword = await hashPassword(user_password);

    //Insert user into database
    const { data, error } = await supabase
        .from('user')
        .insert({
            firstname,
            lastname,
            user_email,
            password_hash: hashedpassword
        })
        .select()

    if (error) {
        res.status(400).json({ error: error.message });
    } else {
        generateTokenResponse({ userid: data[0].user_id, json: { user: data[0] }, res: res, status: 201 })
    }
})



// @desc    Sign in
// @route   POST /api/user/signin
// @access  Public
const signIn = asyncHandler(async (req, res) => {

    // Destructure request data
    const { user_email, user_password } = req.body;

    // Verify that all required credentials was passed in the request
    if (!user_email || !user_password) {
        res.status(400).json({ error: "Please provide all credentials" });
        return
    }

    // Fetch user information from database
    const { data, error } = await supabase
        .from('user')
        .select()
        .eq("user_email", user_email);

    if (data.length < 1) {
        res.status(401).json({ message: "Credentials do not match!" });
        return
    }
    const userData = data[0]

    // Compare passwords
    const correctPassword = await comparePassword(user_password, userData.password_hash);

    if (error) {
        res.status(400).json({ error: error.message });
    } else if (!correctPassword) {
        res.status(401).json({ message: "Credentials do not match!" });
    } else {
        // Return response with signed JWT
        generateTokenResponse({ userid: userData.user_id, json: { user: userData }, res: res, status: 200 })
    }
})



// @desc    Verify user session
// @route   POST /api/user/verify-session
// @access  Private - Note: if no JWT is present, the user simply won't make it to here
const verifySession = asyncHandler(async (req, res) => {

    // Save the user in a variable
    const userInfo = req.user[0]

    // Restructure user info so password is not sent to frontend
    const { password_hash, created_at, ...resturcturedUserInfo } = userInfo;

    if (!resturcturedUserInfo) {
        res.status(400).json({ "Error message": "Falied fetching user" });
    } else {
        // Return user information
        res.status(200).json(resturcturedUserInfo)
    }
})



// @desc    Get all data associated with user
// @route   GET /api/user/getdata
// @access  Private
const getUserData = asyncHandler(async (req, res) => {

    // Store user in variable
    const userInfo = req.user[0]

    // Fetch user data from database
    const { data, error } = await supabase
        .from('user')
        .select(`
            user_id,
            receipts:receipt (
                receipt_id,
                customer_mail,
                items:item_line (
                    product_id,
                    product:product_id (
                        product_name,
                        product_price
                    ),
                product_amount
                ),
                created_at
            )
        `)
        .eq("user_id", userInfo.user_id)
        .order('created_at', { referencedTable: 'receipt', ascending: false })

    if (error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(200).json(data);
    }
})



// @desc    Hash the given password
// @func    Used in createUser
//
const hashPassword = async (password) => {
    try {

        // Generate salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password
        const hash = await bcrypt.hash(password, salt);

        return hash;
    } catch (error) {
        console.error(error);
        throw error;
    }
};



// @desc    Check if the given password match the one in the db
// @func    Used in signIn
//
const comparePassword = async (insertedPassword, hash) => {
    try {

        // Compare passwords
        const result = await bcrypt.compare(insertedPassword, hash)

        return result
    } catch (error) {
        console.error(error);
        throw error;
    }
}



module.exports = {
    createUser,
    signIn,
    verifySession,
    getUserData
}