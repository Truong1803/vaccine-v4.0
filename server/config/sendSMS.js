const accountSid = `${process.env.TWILIO_ACCOUNT_SID}`;
const authToken = `${process.env.TWILIO_AUTH_TOKEN}`;
const from = `${process.env.TWILIO_PHONE_NUMBER}`;
const serviceID = `${process.env.TWILIO_SERVICE_ID}`;
const client = require('twilio')(accountSid, authToken);

const sms = {
  sendSMS: (to, body, txt) => {
    try {
      client.messages
        .create({
          body: `Blog ${txt} - ${body}`,
          from,
          to,
        })
        .then((message) => console.log(message.sid));
    } catch (error) {
      console.log(error);
    }
  },
  smsOTP: async (to, channel) => {
    try {
      const data = await client.verify
        .services(serviceID)
        .verifications.create({ to, channel });
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  smsVerify: async (to, code) => {
    try {
      const data = await client.verify
        .services(serviceID)
        .verificationChecks.create({ to, code });
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
};

module.exports = sms;
