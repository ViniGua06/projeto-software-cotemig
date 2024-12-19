import nodemailer from "nodemailer";
import { IEmail } from "../models/email.model";
require("dotenv").config();

class sendEmailService {
  handle = (email: IEmail): Promise<boolean | null> => {
    try {
      const trasnporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "",
          pass: process.env.GMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: "",
        to: email.to,
        subject: email.subject,
        text: email.text,
      };

      trasnporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return null;
        }

        console.log(info.response);
        return true;
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}

export default sendEmailService;