import nodemailer = require('nodemailer');
import jwt = require('jsonwebtoken');
import { UnauthorizedException } from '@nestjs/common';

class AuthManager {
  /**
   * Sents a password reset link to the user using the provided email address. 
   * @param email - the user's email address
   * @param hashedPassword the use's old hashed password
   * 
   * @returns - a JavaScript object containing the id of the sent message.
   */
  // Todo: Move this to a seperate mail service
  async sendSecureEmil(email: string, hashedPassword: string) {
    const secret = process.env.PASSWORD_RESET_SECRET || 'secret';
    const secretComposite = `${secret}${hashedPassword}`;
    const token = jwt.sign({}, secretComposite, {
      issuer: 'example.io',
      audience: 'reset-password',
      expiresIn: '3600s'
    });

    const passwordResetLink = `http://localhost:8080/auth/password/reset?email=${email}&token=${token}`;

    // // create reusable transporter object using the default SMTP transport
    // const transporter = nodemailer.createTransport({
    //   service: process.env.MAILER_EMAIL_ID,
    //   auth: {
    //     user: process.env.MAILER_EMAIL_ID,
    //     pass: process.env.MAILER_PASSWORD
    //   }
    // });

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILER_EMAIL_ID,
        pass: process.env.MAILER_PASSWORD
      }
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Tasti" <no-reply@example.com>',
      to: email,
      subject: 'Reset Your Password',
      html: `
        <div>
            <p>Follow the link below to unlock your account. If you didn’t request a reset, you can safely ignore this email.</p>
            </br>
            <div>
                <p><a href="${passwordResetLink}" target="_blank" rel="noreferrer">${passwordResetLink}</a></p>
            </div>
            </br>
            <b>Why do I need a new password?</b>
            <p>To keep every account secure, we do not store passwords. Since we can’t look up your current password, we
            generate a unique link to reset it instead.</p>
        </div>
    ` // html body
    });

    console.log('Message sent: %s', info.messageId);
    return info.messageId;
  }

  /**
   * Confirm the validity of a JWT token issued by the server.
   * @param { String } token - a JWT token
   * @param { String } hashedPassword - hash of the user's password 
   * 
   * @returns - the decode token in a JSON format if the token is valid.
   * @throws - an {@link UnauthorizedException}
   */
  verifyResetToken(token: string, hashedPassword: string) {
    const secret = process.env.PASSWORD_RESET_SECRET || 'secret';
    /* 
     We used the old hashed password to compose the final JWT secret preventing the user to reset his/her password multiple time with the same
     token. This is because every hashed password is different making the token invalid.
     */
    const secretComposite = `${secret}${hashedPassword}`;
    try {
      return jwt.verify(token, secretComposite, {
        issuer: 'example.io',
        audience: 'reset-password'
      });
    } catch (error) {
      // Verification error
      console.log('Error during jwt verification ', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}

export default new AuthManager();