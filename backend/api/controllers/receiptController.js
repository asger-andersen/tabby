require('dotenv').config({
    path: `${__dirname}/.env`
})
const asyncHandler = require('express-async-handler')
const { generatePDF } = require('../scripts/manipulateReceipt')
const { sendEmail } = require('../scripts/emailController')
const supabase = require('../../db-config');


// @desc    Fetch user information
// @route   POST /api/receipt/generate
// @access  Private
const generateReceipt = asyncHandler(async (req, res) => {

    // Destructure request data
    const { customer_mail, product_info, payment_method_id } = req.body;

    // Store user info - Note: User info is passed from authMiddleware
    const userInfo = req.user[0]

    // Store receipt in DB
    const receipt = await createReceipt({
        customer_mail: customer_mail,
        user_id: userInfo.user_id,
        payment_method_id: payment_method_id,
        product_info: product_info
    });

    // Fetch receipt information (prices, etc.) from DB
    if (receipt) {
        const receiptData = await fetchReceiptData(receipt)

        // Generate PDF version of receipt
        const PDFbuffer = await generatePDF(receiptData)

        // Pass the PDF file in an email
        const sendingEmail = await sendEmail({
            emailTo: customer_mail,
            contactInfo: receiptData[0].user,
            PDFbuffer: PDFbuffer
        });

        if (sendingEmail) {
            res.status(202).json(`Successfully sent a mail to ${customer_mail}`);
        } else {
            throw new Error();
        }
    }
})



// @desc    Insert receipt into DB
// @func    Used in generateReceipt
//
const createReceipt = async (receipt_info) => {

    // Destructure all values passed in object
    const { customer_mail, user_id, payment_method_id, product_info } = receipt_info

    // Create the receipt in the db - return receipt info
    const add_receipt = async () => {
        const { data, error } = await supabase
            .from('receipt')
            .insert({ customer_mail: customer_mail, user_id: user_id, payment_method_id: payment_method_id })
            .select()

        if (error) {
            throw new Error(error.message);
        } else {
            return data
        }
    }

    // Save receipt id in variable
    const receipt_data = await add_receipt()
    const { receipt_id } = receipt_data[0]


    // Restructure line item data for bulk insert
    const restructured_product_info = product_info.map(product => ({
        ...product,
        "receipt_id": receipt_id
    }))


    // Create item lines for receipt
    const { error } = await supabase
        .from('item_line')
        .insert(restructured_product_info)

    // Return response
    if (error) {
        throw new Error(error.message);
    } else {
        return receipt_id
    }

};



// @desc    Get receipt from DB
// @func    Used in signIn
//
const fetchReceiptData = async (receipt_id) => {

    const { data, error } = await supabase
        .from('receipt')
        .select('*, user(*, company(*)), item_line(*, products(*)), payment_methods(*)')
        .eq('receipt_id', receipt_id)

    if (error) {
        throw new Error(error.message);
    } else {
        console.log(data)
        return data
    }

};



module.exports = {
    generateReceipt
};