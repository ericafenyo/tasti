import nodemailer = require('nodemailer');
import crypto = require('crypto');
import jwt = require('jsonwebtoken');
import uuid = require('uuid/v4');
import { UnauthorizedException } from '@nestjs/common';

class AuthManager {
  decodeToken(token: string) {
    return jwt.decode(token)
  }
  async sendSecureEmil(email: string, hashedPassword: string) {
    const secret = process.env.PASSWORD_RESET_SECRET || 'secret';
    const secretComposite = `${secret}${hashedPassword}`;
    const token = jwt.sign({}, secretComposite, {
      issuer: 'example.io',
      audience: 'reset-password',
      expiresIn: '3600s',
      subject: email
    });

    const passwordResetLink = `http://localhost:8080/auth/password/reset?token=${token}`;

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: process.env.MAILER_EMAIL_ID,
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
                <p><a href="${passwordResetLink}" target="_blank" rel="noopener">${passwordResetLink} </a></p>
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
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  }

  verifyResetToken(token: string, hashedPassword: string) {
    console.log("tokennnnn", token, hashedPassword);

    const secret = process.env.PASSWORD_RESET_SECRET || 'secret';
    const secretComposite = `${secret}${hashedPassword}`;
    try {
      return jwt.verify(token, secretComposite, {
        issuer: 'example.io',
        audience: 'reset-password'
      });
    } catch (error) {
      console.log('Error during jwt verification ', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}

export default new AuthManager();