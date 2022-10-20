import nodemailer from 'nodemailer';
import Email from 'email-templates';
import path from 'path';
import logger from '../utils/logger';

// eslint-disable-next-line import/prefer-default-export
export const password = async (to: string, subject: string, params: Object) => {
  try {
    logger.debug(`Sending email to ${to} through ${process.env.SMTP_HOST}`);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD, // generated ethereal password
      },
    });

    const email = new Email({
      views: {
        root: path.resolve('src', 'emails'),
      },
    });

    const emailResults = await email.renderAll('password', {
      ...params,
    });

    if (!emailResults.html && !emailResults.text) {
      logger.error('Could not send password message, missing content.');
      return null;
    }

    const info = await transporter.sendMail({
      from: process.env.MAIL_NOTIFIER_FROM,
      to,
      subject,
      text: emailResults.text,
      html: emailResults.html,
    });

    logger.debug(`Password Reset message sent: ${info.messageId}`);
    return info;
  } catch (ex) {
    logger.error(`Could not send password message: ${ex}`);
    return null;
  }
};
