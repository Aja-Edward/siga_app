import { NextResponse } from 'next/server'
import cryptoRandomString from 'crypto-random-string'
import Cryptr from 'cryptr'
import { render } from '@react-email/render'
import ForgotPasswordEmail from '@app/emails/ForgotPasswordEmail'
import { sendEmail } from '@app/config/mails'
import { APP_URL, SECRET_KEY } from '@app/config/env'
import User from '@models/userModel'
import { connectToDB } from '@utils/database'

export const GET = async (req, res) => {
  return new Response('Hi, my name is Aja Edward')
}

export const POST = async (request) => {
  const ForgetPasswordPayload = await request.json()

  console.log('Connecting to the database...')
  await connectToDB()
  console.log('Database connected successfully.')

  try {
    console.log('Incoming request:', ForgetPasswordPayload)
    // check the user email first

    const user = await User.findOne({ email: ForgetPasswordPayload.email })

    console.log('This is the user', user)
    if (user === null) {
      return NextResponse.json({
        status: 400,
        errors: {
          email: 'No user found with this email',
        },
      })
    }

    // Generate random string
    const randomStr = cryptoRandomString({
      length: 64,
      type: 'alphanumeric',
    })
    user.password_reset_token = randomStr
    await user.save()

    // Encrypt the user email
    console.log('User Email coming from frontend to backend', user.email)

    const crypt = new Cryptr(SECRET_KEY)
    const encryptedEmail = crypt.encrypt(user.email)
    console.log('Encrypted email', encryptedEmail)
    const url = `${APP_URL}/auth/reset_password/${encryptedEmail}?signature=${randomStr}`

    const html = render(
      // Use the render function to generate the email content
      ForgotPasswordEmail({
        params: {
          name: user.name,
          url: url,
        },
      })
    )

    console.log('Email Data:', {
      to: ForgetPasswordPayload.email,
      subject: 'Reset password',
      html: html,
    })

    // send email to user

    await sendEmail({
      recipient: ForgetPasswordPayload.email,
      subject: 'Reset password',
      html,
    })

    return NextResponse.json({
      status: 200,
      message: 'Email sent successfully. Please check your email',
    })
  } catch (error) {
    console.log('the error is ', error)
    return NextResponse.json({
      status: 500,
      message: 'Something went wrong. Please try again!',
    })
  }
}
