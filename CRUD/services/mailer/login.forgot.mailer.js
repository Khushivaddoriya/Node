const handlebars = require("handlebars");
const fs = require("fs");
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
const { INTERNAL_SERVER_ERROR_MESSAGE, STATUS_ERROR } = require("../../constant/global.constants");
dotenv.config();


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: process.env.SERVICE,
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
    },
});

// forgot Password Mail send 

const forgotPasswordMailer = async (code, email) => {

    try {

        const url = `${process.env.REACT_APP_BASE_URL}/reset-password`
        const emailTemplateSource = fs.readFileSync("./views/mails/resetPassword.hbs", "utf8");
        const template = handlebars.compile(emailTemplateSource);
        const htmlToSend = template({ urlorcode: `${url}/${code}` });

        const info = await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: `${email}`,
            subject: `Reset Password.`,
            text: "Password Reset",
            html: htmlToSend
        })
        return info;
    }
    catch (err) {
        console.log('err', err);
        const responsePayload = {
            status: STATUS_ERROR,
            message: null,
            data: null,
            error: INTERNAL_SERVER_ERROR_MESSAGE,
        };
        return responsePayload;
    }
}


module.exports = { forgotPasswordMailer }