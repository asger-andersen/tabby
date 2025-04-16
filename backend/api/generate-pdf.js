const { generatePDF } = require('./scripts/manipulateReceipt');

module.exports = async (req, res) => {
    console.log("Generate PDF route triggered")
    res.status(200).json({ message: "Genrate PDF route triggered!" })
    /*
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { receipt_data } = req.body;

        const pdfBuffer = await generatePDF(receipt_data);

        if (!pdfBuffer) {
            throw new Error('PDF generation failed');
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=kvittering.pdf');
        res.send(pdfBuffer);
    } catch (err) {
        console.error('PDF Error:', err);
        res.status(500).json({ error: 'Failed to generate PDF' });
    }
        */
};
