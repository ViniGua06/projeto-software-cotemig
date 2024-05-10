import nodemailer from "nodemailer";
import { IEmail } from "../models/email.model";

class sendEmailService {
  handle = (email: IEmail): Promise<boolean | null> => {
    try {
      const emailReceiving = "22200460@aluno.cotemisfsetg.com.br";

      console.log(email);
      const trasnporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_ACCOUNT,
          pass: process.env.GMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: "echurch.mailsender@gmail.com",
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
