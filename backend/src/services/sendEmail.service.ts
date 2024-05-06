import nodemailer from "nodemailer";
import { IEmail } from "../models/email.model";

class sendEmailService {
  handle = async (email: IEmail): Promise<boolean | null> => {
    try {
      const trasnporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "22200460@aluno.cotemig.com.br",
          pass: process.env.GMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: "22200460@aluno.cotemig.com.br",
        to: email.email || "viniguarnierisouza@gmail.com",
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
