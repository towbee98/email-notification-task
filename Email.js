const nodemailer=require('nodemailer');
const {google}= require('googleapis');

const OAuth2=google.auth.OAuth2;

module.exports = class Email {
  constructor() {
    this.to = process.env.Email;
    this.from = `Zuri Email Notification`;
  }
  newTransport() {
      //Gmail
      const oauth2Client = new OAuth2(
        process.env.client_id,
        process.env.client_secret,
        process.env.redirect_uri
      );

      oauth2Client.setCredentials({
        refresh_token: process.env.refresh_token
      });

      const accessToken = oauth2Client.getAccessToken((err, token) => {
        if (err) {
          return err;
        }
        return token;
      });

      return nodemailer.createTransport({
        service: "Gmail",
        auth: {
            type:"OAUTH2",
          user: process.env.Email,
          clientId: process.env.client_id,
          clientSecret: process.env.client_secret,
          refreshToken: process.env.refresh_token,
          accessToken
        }
      });
    
  }

  //Send the actual email
  async send() {
    //2. Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject:'Zuri Email Notification',
      text: 'A device made a request just now. Your Zuri  nodejs Email application task is working perfectly.'
    };
    //3. Define a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }
  async sendMail() {
    await this.send();
  }
};