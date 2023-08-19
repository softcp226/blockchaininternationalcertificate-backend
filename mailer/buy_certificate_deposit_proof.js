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
    subject: `Deposit Request Notification`, //
    // text: "just wanna know if this works",
    html: `
<div class="mail_template"
            style="max-width: 600px; margin: auto; font-family: 'Poppins', sans-serif; background-color: #f2f2f2; padding: 20px; border-radius: 10px; border: 1px solid #ccc;">
            <div style="text-align: center;">
                <img src=""
                    alt="Company Logo" style="width: 80px; border-radius: 50%;">
            </div>

  <div class="head-txt">
    <h1 style="text-align: center; font-size: 16px; color: #081336">
      NEW Deposit Notification
    </h1>
  </div>
  <div style="text-align: center">
    
  </div>
  <p class="sm-p">
    Dear ${userInfo.Name}, We just recieved your request to create/upgrade certificate.
  </p>
  <p class="sm-p">
    your request was backed up with a proof to show you already paid for a certificate.
    However we need to verify and make sure you actually paid for the requested certificate as claimed.
  </p>
    <p class="sm-p">
    It might take up 24 hours for your payment to be completed before we can proccess your certificate.
    
  </p>
  <p class="sm-p">
    For more detailed informations, please contact our customer support or the
    relationship officer 
  </p>

  <p class="sm-p">
    incase you have any questions do not hesitate to contact us and we will
    reach out to you as soon as possible
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
        </style>
`,
  });
};
module.exports = { create_mail_options, transporter }; //
