require('dotenv').config({
    path: `${__dirname}/.env`
})
const asyncHandler = require('express-async-handler')
const supabase = require('../../db-config');


// @desc    Create product
// @route   POST /api/product/create
// @access  Private
const createProduct = asyncHandler(async (req, res) => {
    // Destructure request data
    const { product_name, product_price, product_category } = req.body;

    // Save the user in a variable
    const userInfo = req.user[0]

    // Verify that all required values was passed along in the request
    if (!product_name || !product_price || !product_category) {
        res.status(400).json({ error: "All fields are required." });
        return
    }

    //Insert product into database
    const { data, error } = await supabase
        .from('products')
        .insert({
            product_name: product_name,
            product_price: product_price,
            category_id: product_category,
            company_id: userInfo.company_id
        })
        .select()

    if (error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(201).json(data);
    }
});



// @desc    Update product
// @route   PUT /api/product/update
// @access  Private
const UpdateProduct = asyncHandler(async (req, res) => {

});



// @desc    Delete product
// @route   DELETE /api/product/delete
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {

});



module.exports = {
    createProduct
};