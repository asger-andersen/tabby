const nodemailer = require("nodemailer");

// @desc    Create and send email
//
//
const sendEmail = async (data) => {

    try {
        
        const { emailTo, contactInfo, PDFbuffer } = data;

        // Configure
        const transporter = nodemailer.createTransport({
            host: "send.one.com",
            port: 465,
            secure: true, // true for port 465, false for other ports
            auth: {
            user: "kvittering@jhsnedker.dk",
            pass: "De@Y9JT_9cQ3x#b",
            },
        });

        // Define mail content
        const mailContent = {
            from: `"${contactInfo.company.company_name}" <kvittering@jhsnedker.dk>`, // Sender address
            to: `${emailTo}`, // list of receivers
            subject: "Tak for dit køb!", // Subject line
            text:
            `Hej, 
        
            Det er ${contactInfo.firstname} fra ${contactInfo.company.company_name} :-)
        
            Jeg vil bare sige mange tak for dit køb! 
            Forhåbentligt kan produkterne bruges.
        
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
            .join("\n"), // Rejoin into a single string, // Plain text body
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






/*
    `
    Hej, 

    Det er ${contactInfo.firstname} fra ${contactInfo.company.company_name} :-)

    Jeg vil bare sige mange tak for dit køb! 
    Forhåbentligt kan produkterne bruges.

    Jeg har vedhæftet din kvittering i denne mail. 
    Tøv ikke med at kontakte mig, hvis du skulle have nogle spørgsmål.

    Rigtig god dag. 
    Med venlig hilsen 
    ${contactInfo.firstname + " " + contactInfo.lastname} 
    --- 
    Tlf. ${contactInfo.company.company_phone} 
    E-mail ${contactInfo.company.company_email}
    `, // Plain text body
*/

/*
    text: `Hej, \nDet er ${contactInfo.firstname} fra ${contactInfo.company.company_name} :-) \n\nJeg vil bare sige mange tak for dit køb! \nForhåbentligt kan produkterne bruges. \n\nJeg har vedhæftet din kvittering i denne mail. \nTøv ikke med at kontakte mig, hvis du skulle have nogle spørgsmål. \n\nRigtig god dag. \nMed venlig hilsen \n${contactInfo.firstname + " " + contactInfo.lastname} \n--- \nTlf. ${contactInfo.company.company_phone} \nE-mail ${contactInfo.company.company_email}`, // Plain text body
*/