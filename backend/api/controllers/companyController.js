require('dotenv').config({
    path: `${__dirname}/.env`
})
const asyncHandler = require('express-async-handler')
const supabase = require('../../db-config');
const bcrypt = require('bcrypt')
const { generateTokenResponse } = require('../tokens/createToken')


// @desc    Create company
// @route   POST /api/company/create
// @access  Public
const createCompany = asyncHandler(async (req, res) => {

});



// @desc    Get company data, company products, company categories, and payment methods
// @route   GET /api/company/get
// @access  Private
const getCompany = asyncHandler(async (req, res) => {
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
});



// @desc    Join company
// @route   PUT /api/company/join
// @access  Private
const joinCompany = asyncHandler(async (req, res) => {
    try {
        // Store user in variable
        const userInfo = req.user[0];
        const inviteCode = req.body.invite_code;

        // Check if the user is already linked to a company
        if (userInfo.company_id) {
            res.status(405).json({ error: "User is already in a company" });
            return
        };

        // @func    Find company from invite code
        const findCompany = async (invitation_code) => {
            // Find company by invite code
            const { data, error } = await supabase
                .from('company')
                .select()
                .eq("company_invite_code", invitation_code);

            if (error) {
                throw new Error(error.message)
            } else {
                return data
            };
        };
        // Call findCompany function and store value in variable 
        const company = await findCompany(inviteCode);

        // @func    Add company to user instance
        const updateUserCompany = async (user, company) => {
            // Update company column on user
            const { data, error } = await supabase
                .from('user')
                .update({ company_id: company.company_id })
                .eq("user_id", user.user_id)
                .select(`
                    *,
                    company:company (
                        *
                    )
                `);

            if (error) {
                throw new Error(error.message)
            } else {
                return data
            };
        };
        // Call updateUserCompany function to update user profile, and store response in variable
        const updatedUserProfile = await updateUserCompany(userInfo, company[0]);

        // Respond to initial request
        res.status(201).json(updatedUserProfile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



// @desc    Delete company
// @route   DELETE /api/company/delete
// @access  Private
const deleteCompany = asyncHandler(async (req, res) => {

});



module.exports = {
    getCompany,
    joinCompany
};