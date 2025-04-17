const express = require('express');

let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    chrome = require("@sparticuz/chromium-min");
    puppeteer = require("puppeteer-core");
} else {
    puppeteer = require("puppeteer");
}

const app = express();
app.use(express.json());

const remoteExecutablePath = "https://github.com/Sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar";

app.post("/api", async (req, res) => {
    const receiptData = req.body

    // Define options for browser
    let options = {};

    if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
        options = {
            args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
            defaultViewport: chrome.defaultViewport,
            executablePath: await chrome.executablePath(remoteExecutablePath),
            headless: true,
            ignoreHTTPSErrors: true,
        };
    }

    // Reformat date and time
    const dateTimeOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };

    const createDate = new Date(receiptData.created_at)
    const formattedDate = createDate.toLocaleString("en-GB", dateTimeOptions);

    try {
        let browser = await puppeteer.launch(options);
        let page = await browser.newPage();

        await page.setContent(`
            <!doctype html>
            <html>
                <head>
                    <title>Receipt</title>
                    <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
                    <link href="https://gcmekcowvulxpwukxjhz.supabase.co/storage/v1/object/sign/tabby/css/test.css?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0YWJieS9jc3MvdGVzdC5jc3MiLCJpYXQiOjE3NDE4NjczMjQsImV4cCI6MzMyNzc4NjczMjR9.zO3mphCNa9quZK7Rsp4ro6uqH7chzTKH6--IT2KMwSw" rel="stylesheet">
                </head>
                <body class="w-9/12 m-auto my-20">
                    <div id="receipt">
                        <div id="header" class="mb-6 mt-18 flex flex-col justify-center items-center">
                            <img class="align-center" src="${receiptData.user.company.company_logo}" width="60%">
                            <h1 class="font-bold text-5xl pt-2">
                                ${(receiptData.user.company.company_name).toUpperCase()}
                            </h1>
                        </div>
                        <div class="dashedSpace"></div>
                        <div id="formals" class="flex-col justify-between font-45">
                            <div class="flex flex-row justify-between mt-2">
                                <p>
                                    Betjent af:
                                </p>
                                <p>
                                    ${receiptData.user.firstname + " " + receiptData.user.lastname}
                                </p>
                            </div>
                            <div class="flex flex-row justify-between">
                                <p>
                                    Dato og tidspunkt:
                                </p>
                                <p>
                                    ${formattedDate}
                                </p>
                            </div>
                        </div>
                        <div class="dashedSpace"></div>
                        <div class="my-6">
                            <table class="w-full" id="products">
                                <tr class="gap-3">
                                    <th class="text-left">Antal</th>
                                    <th class="text-left">Produkt</th>
                                    <th class="text-right">Pris</th>
                                </tr>
                                ${receiptData.item_line.map(item => (
            `<tr>
                                        <td class="text-left">${item.product_amount}</td>
                                        <td class="text-left">${item.products.product_name}</td>
                                        <td class="text-right">${((item.products.product_price * item.product_amount) / 100).toFixed(2)} DKK</td>
                                    </tr>`
        )).join('')}                    
                            </table>
                        </div>
                        <div class="dashedSpaceDouble m-0"></div>
                        <div class="dashedSpaceDouble m-0"></div>
                        <div class="my-6">
                            <div class="flex flex-row justify-between">
                                <p class="font-bold">
                                    I alt:
                                </p>
                                <p>
                                    ${((receiptData.item_line.reduce((sum, item) => sum + item.products.product_price * item.product_amount, 0)) / 100).toFixed(2)} DKK
                                </p>
                            </div>
                            <div class="flex flex-row justify-between">
                                <p>
                                    Heraf moms (${receiptData.user.company.vat_registration ? "25%" : "0%"}):
                                </p>
                                <p>
                                    ${((receiptData.item_line.reduce((sum, item) => sum + item.products.product_price * item.product_amount, 0)) / 100).toFixed(2) * (receiptData.user.company.vat_registration ? 0.2 : 0)} DKK
                                </p>
                            </div>
                        </div>
                        <div class="dashedSpaceDouble m-0"></div>
                        <div class="dashedSpaceDouble m-0"></div>
                        <div class="my-6 flex flex-row justify-between">
                            <p>
                                Betalingsmetode:
                            </p>
                            <p>
                                ${receiptData.payment_methods.payment_method_name}
                            </p>
                        </div>
                        <div class="dashedSpace"></div>
                        <div class="my-6">
                            <p class="text-center text-xl">
                                Jeg håber du bliver glad for dit køb!
                            </p>
                            <p class="mt-4 text-5xl text-center alex-brush-regular">
                                ${receiptData.user.firstname}
                            </p>
                            <hr class="border-1 border-black">
                        </div>
                        <div class="text-center flex flex-col">
                            <p class="font-bold">
                                Kontakt os på:
                            </p>
                            <a href="tel:${receiptData.user.company.company_phone}">
                                Telefon: ${receiptData.user.company.company_phone}
                            </a>
                            <a href="mailto:${receiptData.user.company.company_email}">
                                E-mail: ${receiptData.user.company.company_email}
                            </a>
                            ${receiptData.user.company.company_cvr ?
                `<p>
                                    CVR: ${receiptData.user.company.company_cvr}
                                </p>`
                : ""
            }
                        </div>
                        <div class="mb-6 flex flex-col justify-center items-center text-center">
                            <p>
                                Besøg vores hjemmeside ved at <br>
                                scanne- eller trykke på QR-koden
                            </p>
                        </div>
                    </div>
                </body>
            </html>
            `, { waitUntil: 'domcontentloaded', timeout: 20 * 1000 });

        // Store the PDF in a buffer
        const pdfBuffer = await page.pdf({
            width: "150mm",
            height: `${332 + (7 * receiptData.item_line.length) + (receiptData.user.company.company_cvr ? 7 : 0)}mm`, // Dynamic height based on amount of item lines on receipt
            printBackground: true
        });

        // When everything is done close the browser and return the PDF buffer
        await browser.close();

        res.send(pdfBuffer);
    } catch (err) {
        console.error(err);
        return null;
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started");
});

module.exports = app;