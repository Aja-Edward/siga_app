import nodemailer from 'nodemailer'
import { host, port, pass, email, secure, from } from '@app/config/env'

export const transporter = nodemailer.createTransport({
  host,
  port,
  secure: false,
  auth: {
    user: email,
    pass,
  },
})
// To send the email

export const sendEmail = async ({ recipient, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from,
      to: recipient,
      subject,
      html,
    })

    console.log('Email sent:', info.response)
    return info?.messageId
  } catch (error) {
    console.error('Email sending error:', error)
    throw error
  }
}
