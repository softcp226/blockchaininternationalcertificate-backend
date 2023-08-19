const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: false,
  auth: {
    user: process.env.company_mail,
    pass: process.env.mail_password,
  },
});
let create_mail_options = (userInfo) => {
  return (mailOptions = {
    from: process.env.mail,
    to: userInfo.reciever,
    subject: `Account Registration Notification`, //
    text: "just wanna know if this works",
    html: `
<div class="mail_template"
            style="max-width: 600px; margin: auto; font-family: 'Poppins', sans-serif; background-color: #f2f2f2; padding: 20px; border-radius: 10px; border: 1px solid #ccc;">
            <div style="text-align: center;">
                <img src=""
                    alt="Company Logo" style="width: 80px; border-radius: 50%;">
            </div>


  <div class="head-txt">
    <h1 style="text-align: center; font-size: 16px; color: #081336">
      NEW ACCOUNT NOTIFICATION
    </h1>
  </div>
  <div style="text-align: center">
    <img
      src="${userInfo.passport}"
      alt="user Profile"
      style="height: 70px; width: 70px; border-radius: 50%"
    />
  </div>
  <p class="sm-p">
    Dear ${userInfo.Name} Thank you so much for allowing us to help you with
    your account opening. We are committed to providing our customers with the
    highest level of service and the most innovative brokerage certificate that
    are possible. We are very glad you chose us. We hope you will take advantage
    of our wide variety of Brokerage certificate that are designed to meet your
    needs
  </p>
  
  <p class="sm-p">
    For more detailed informations, please contact our customer support or the
    relationship officer that would be assigned to you shortly
  </p>

 
  <br />
  <h1
    style="
      font-size: 18px;
      text-align: center;
      background: linear-gradient(87deg, #081336 0, #081336 100%);
      color: white;
    "
  >
    BLOCKCHAININTERNATIONALCERTIFICATE
  </h1>
  <p class="disclaimer" style="font-size: 12px; font-weight: bolder">
    Disclaimer: this message was automatically generated via
    blockchaininternationalcertificate secured channel,please do not reply to
    this message. All correspondence should be addressed to
    BLOCKCHAININTERNATIONALCERTIFICATE.COM or your relationship officer
  </p>


  </div>
        
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        </style>`,
  });
};
module.exports = { create_mail_options, transporter }; //
