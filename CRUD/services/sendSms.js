const { Twilio } = require("twilio")
const schedule = require('node-schedule');
const dotenv = require("dotenv");
const { User } = require("../schema/user.schema");
dotenv.config();

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

const sendPaymentCompletedSMS = async (orderNumber, user) => {

    try {

        const twilioClient = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
        const smsMessage = `Hello ${user.first_name}, your payment for order ${orderNumber} has been successfully completed. 
                            Thank you for your purchase!`;
        await twilioClient.messages.create({
            body: smsMessage,
            from: TWILIO_PHONE_NUMBER,
            to: `+91${user.phone_number}`,
        });
        return true;
    }
    catch (error) {
        console.log('Error sending SMS:', error);
        return false;
    }
}

const sendPlanExpirySMS = async (userPhoneNumber) => {

    try {

        const twilioClient = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
        const smsMessage = `Hello! Your subscription plan is about to expire. Please consider renewing your plan to continue enjoying our services.`;
        await twilioClient.messages.create({
            body: smsMessage,
            from: TWILIO_PHONE_NUMBER,
            to: `+91${userPhoneNumber}`,
        });
        console.log("sms==========================");
        return true;
    }
    catch (error) {
        console.log('Error sending SMS:', error);
        return false;
    }
}


const schedulePlanExpirySMS = async (user_id, planExpireDate) => {

    try {

        const user = await User.findById(user_id);

        if (user && user.phone_number) {
            
            const expireTime = new Date(planExpireDate);

            // Check if the expiration time is in the future
            if (expireTime <= new Date()) {
                console.log('Plan has already expired.');
                return;
            }

            // Create a valid cron schedule pattern based on the expiration time
            const cronPattern = `${expireTime.getSeconds()} ${expireTime.getMinutes()} ${expireTime.getHours()} ${expireTime.getDate()} ${expireTime.getMonth() + 1} *`;

            // Schedule the SMS to be sent at the specified time
            schedule.scheduleJob(cronPattern, async () => {
                await sendPlanExpirySMS(user.phone_number);
            });
        }
    } catch (error) {
        console.log('Error scheduling planExpiry SMS:', error);
        return false;
    }
}

module.exports = { sendPaymentCompletedSMS, schedulePlanExpirySMS };


