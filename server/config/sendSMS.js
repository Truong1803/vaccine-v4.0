const accountSid = `${process.env.TWILIO_ACCOUNT_SID}`;
const authToken = `${process.env.TWILIO_AUTH_TOKEN}`;
const from = `${process.env.TWILIO_PHONE_NUMBER}`;
const serviceID = `${process.env.TWILIO_SERVICE_ID}`;
const client = require("twilio")(accountSid, authToken);

const sms = {
  sendSMS: (to) => {
    try {
      client.messages
        .create({
          body: "Thông báo lịch tiêm chủng. Đơn đăng ký tiêm chủng của bạn đã được xét duyệt. Vui lòng đăng nhập vào hệ thống cổng thông tin tiêm chủng để xem chi tiết thời gian và địa điểm tiêm.",
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
