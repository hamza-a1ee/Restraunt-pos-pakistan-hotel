import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.HOST_EMAIL,
    pass: process.env.HOST_PASSWORD,
  },
});

export const getMailOptions = (to: string, subject: string, text: string) => {
  return { from: process.env.HOST_EMAIL, to, subject, text };
};
