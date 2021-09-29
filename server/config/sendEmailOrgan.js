const { OAuth2Client } = require("google-auth-library");

const nodemailer = require("nodemailer");

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`;
const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`;
const REFRESH_TOKEN = `${process.env.MAIL_REFRESH_TOKEN}`;
const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`;
const sendEmailRegister = async (to, account, password) => {
  const oAuth2Client = new OAuth2Client(
    CLIENT_ID,
    CLIENT_SECRET,
    OAUTH_PLAYGROUND
  );

  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  try {
    const access_token = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: SENDER_MAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: access_token,
      },
    });

    const mailOptions = {
      from: SENDER_MAIL,
      to: to,
      subject: "Thông báo tạo tài khoản",
      html: `
          <div style="max-width: 750px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
          <h2 style="text-align: center; text-transform: uppercase;color: teal;">Chào mừng bạn đến với hệ thống tiêm chủng covid quốc gia</h2>
          <p>Bạn đã được cấp một tài khoản để sử dụng hệ thống tiêm chủng covid quốc gia </p>
          <p>+ Account: ${account}</p>   
          <p>+ Password: ${password}</p> 
          <a href=${`http://localhost:3000/sign_in`} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Đăng nhập vào hệ thống</a>
          </div>
        `,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log(error);
  }
};
module.exports = sendEmailRegister;
