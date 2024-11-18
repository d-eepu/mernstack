const Agenda = require("agenda");
const nodemailer = require("nodemailer");

const agenda = new Agenda({
  db: { address: process.env.MONGO_URI },
});

agenda.define("send-email", async (job) => {
  const { emailBody, subject, emailAddress } = job.attrs.data;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: emailAddress,
    subject,
    text: emailBody,
  });
  console.log("Email sent to", emailAddress);
});

agenda.start();

module.exports = agenda;
