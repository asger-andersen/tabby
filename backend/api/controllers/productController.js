require('dotenv').config({
    path: `${__dirname}/.env`
})
const fetch = require("node-fetch");
const asyncHandler = require('express-async-handler')
const supabase = require('../../db-config');


// @desc    Fetch company product information
// @route   GET /api/product/getinformation
// @access  Private
const productInformation = asyncHandler(async (req, res) => {
    try {
        // Store user info - Note: User info is passed from authMiddleware
        const userInfo = req.user[0]

        if (!userInfo.company_id) {
            res.status(403).json({ error: "No company assigned to user!" });
            return
        }

        // Fetch company information
        const getCompany = async () => {
            const { data, error } = await supabase
                .from('company')
                .select()
                .eq("company_id", userInfo.company_id)

            if (error) {
                console.error(error)
                throw error
            } else {
                return data
            }
        };
        const company = await getCompany();

        // Fetch all products associated with users company
        const getProducts = async () => {
            const { data, error } = await supabase
                .from('products')
                .select()
                .eq("company_id", userInfo.company_id)

            if (error) {
                console.error(error)
                throw error
            } else {
                return data
            }
        };
        const products = await getProducts();

        // Fetch all categories associated with users company
        const getCategories = async () => {
            const { data, error } = await supabase
                .from('category')
                .select()
                .eq("company_id", userInfo.company_id)

            if (error) {
                console.error(error)
                throw error
            } else {
                return data
            }
        };
        const categories = await getCategories();

        // Fetch all available payment methods
        const getPaymentMethods = async () => {
            const { data, error } = await supabase
                .from('payment_methods')
                .select()

            if (error) {
                console.error(error)
                throw error
            } else {
                return data
            }
        };
        const paymentMethods = await getPaymentMethods();

        if (products && categories && paymentMethods) {
            res.status(200).json({ company: company, products: products, categories: categories, payment_methods: paymentMethods });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


module.exports = {
    productInformation
};