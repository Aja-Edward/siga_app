import nodemailer from 'nodemailer'

const email = process.env.GMAIL_ADDRESS
const pass = process.env.GMAIL_PASSWORD
const emailto = process.env.GMAIL_ADDRESS_TO

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass,
  },
})

export const mailOptions = {
  from: email,
  to: emailto,
}
