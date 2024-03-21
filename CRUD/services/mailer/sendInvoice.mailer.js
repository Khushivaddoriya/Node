const nodemailer = require("nodemailer");
const puppeteer = require("puppeteer");
const fs = require("fs")
const path = require("path")
const dotenv = require("dotenv")
dotenv.config();

const sendInvoiceEmail = async (toEmail, invoiceContent, invoiceNumber) => {

    try {

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: process.env.SERVICE,
            port: 465,
            secure: false,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASSWORD,
            },
        });

        if (!fs.existsSync("public")) {
            fs.mkdirSync("public");
        } else if (!fs.existsSync("public/invoice")) {
            fs.mkdirSync("public/invoice");
        }

        const pdfFilePath = path.join(__dirname, '../../public/invoice/', `${invoiceNumber}_invoice.pdf`);

        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--disable-dev-shm-usage', '--disable-web-security'],
        });

        const page = await browser.newPage();

        await page.setContent(invoiceContent);

        await page.pdf({
            path: pdfFilePath,
            format: 'A3',
            margin: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px',
            },
        });

        await browser.close();

        const pdfData = await fs.readFileSync(pdfFilePath);

        const emailOptions = {
            from: process.env.USER_EMAIL,
            to: toEmail,
            subject: 'Invoice for Your Plan Purchase',
            text: 'Please find the invoice attached.',
            attachments: [
                {
                    filename: `${invoiceNumber}_invoice.pdf`,
                    content: pdfData,
                    contentType: 'application/pdf',
                },
            ],
        };

        await transporter.sendMail(emailOptions);

        return true;

    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

module.exports = { sendInvoiceEmail }