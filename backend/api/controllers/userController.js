require('dotenv').config({
    path: `${__dirname}/.env`
})
const fetch = require("node-fetch");
const asyncHandler = require('express-async-handler')
const supabase = require('../../db-config');
const bcrypt = require('bcrypt')
const { generateCookie } = require('../cookies/createCookie')



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

    // Generate the hashed password
    const hashedpassword = await hashPassword(user_password);

    //Create user profile in the database
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
        res.status(201).json(data);
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

    console.log(data)

    if (data.length < 1) {
        res.status(401).json({ message: "Credentials do not match!" });
        return
    }

    const userData = data[0]

    // Restructure user data
    console.log(userData)
    //const { password_hash, created_at, ...resturcturedUserInfo } = userData;

    // Compare passwords
    const correctPassword = await comparePassword(user_password, userData.password_hash);

    if (error) {
        res.status(400).json({ error: error.message });
    } else if (!correctPassword) {
        res.status(401).json({ message: "Credentials do not match!" });
    } else {
        // Return response in cookie
        generateCookie({ userid: userData.user_id, json: { user: userData }, res: res, status: 200 })
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



// @desc    Hash the given password
//
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
//
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



// @desc    Get all data associated with user
// @route   GET /api/user/getdata
// @access  Private
const getUserData = asyncHandler(async (req, res) => {

    // Save user in variable
    const userInfo = req.user[0]

    console.log(userInfo);

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



module.exports = {
    createUser,
    signIn,
    verifySession,
    getUserData
}