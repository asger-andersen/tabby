require('dotenv').config({
    path: `${__dirname}/.env`
})
const asyncHandler = require('express-async-handler')
const supabase = require('../../db-config');


// @desc    Create category
// @route   POST /api/category/create
// @access  Private
const createCategory = asyncHandler(async (req, res) => {
    // Destructure request data
    const { category_name } = req.body;

    // Save the user in a variable
    const userInfo = req.user[0]

    // Verify that all required values was passed along in the request
    if (!category_name) {
        res.status(400).json({ error: "All fields are required." });
        return
    }

    //Insert product into database
    const { data, error } = await supabase
        .from('category')
        .insert({
            category_name: category_name,
            company_id: userInfo.company_id
        })
        .select()

    if (error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(201).json(data);
    }
});



// @desc    Update category
// @route   PUT /api/category/update
// @access  Private
const UpdateCategory = asyncHandler(async (req, res) => {

});



// @desc    Delete category
// @route   DELETE /api/category/delete
// @access  Private
const deleteCategory = asyncHandler(async (req, res) => {

});



module.exports = {
    createCategory
};