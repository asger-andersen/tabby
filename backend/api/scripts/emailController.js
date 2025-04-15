require('dotenv').config({
    path: `${__dirname}/.env`
})
const nodemailer = require("nodemailer");


// @desc    Create and send email
// @func    Used in generateReceipt
//
const sendEmail = async (data) => {
    try {

        // Destructure passed data
        const { emailTo, contactInfo, PDFbuffer } = data;

        // Configure nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: "send.one.com",
            port: 465,
            secure: true, // true for port 465, false for other ports
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASSWORD,
            },
        });

        // Email content
        const mailContent = {
            from: `"${contactInfo.company.company_name}" <kvittering@jhsnedker.dk>`,
            to: `${emailTo}`,
            subject: "Tak for dit køb!",
            text:
                `Hej, 
        
            Det er ${contactInfo.firstname} fra ${contactInfo.company.company_name} :-)
        
            Jeg vil bare sige mange tak for dit køb! 
            Varerne finder forhåbentligt plads i deres nye hjem, og jeg håber i bliver glade for dem.
        
            Jeg har vedhæftet din kvittering i denne mail. 
            Tøv ikke med at kontakte mig, hvis du skulle have nogle spørgsmål.
        
            Rigtig god dag.

            Med venlig hilsen 
            ${contactInfo.firstname + " " + contactInfo.lastname} 
            --- 
            Tlf. ${contactInfo.company.company_phone} 
            E-mail ${contactInfo.company.company_email}`
                    .split("\n") // Split into an array of lines
                    .map(line => line.trim()) // Trim each line separately
                    .join("\n"), // Rejoin into a single string
            attachments: [
                {
                    filename: "kvittering.pdf",
                    content: PDFbuffer,
                    contentType: "application/pdf"
                }
            ]
        };

        // Send the email
        const sendingEmail = await transporter.sendMail(mailContent);
        console.log("Email sent!");

        return sendingEmail

    } catch (error) {
        console.error(error);
        throw new Error;
    }
};

module.exports = {
    sendEmail
}