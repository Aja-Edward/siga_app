import { NextResponse } from 'next/server'
import Cryptr from 'cryptr'
import { SECRET_KEY } from '@app/config/env'
import User from '@models/userModel'
import { connectToDB } from '@utils/database'
import bcrypt from 'bcryptjs'

export const GET = async (req, res) => {
  return new Response('Hi, my name is Aja Edward')
}

export const POST = async (req, res) => {
  console.log('Connecting to the database...')
  await connectToDB()
  console.log('Database connected successfully.')

  const ResetPasswordPayload = await req.json()

  console.log('The payload from front end', ResetPasswordPayload)

  console.log(
    'Here is the information from the frontend ',
    ResetPasswordPayload.email
  )
  // TO DO:  Add validation to check if both passwords are the same
  if (ResetPasswordPayload.password !== ResetPasswordPayload.password_confirm) {
    return NextResponse.json({
      status: 400,
      message: 'Passwords do not match.',
    })
  }
  // Decrypt string

  const crypter = new Cryptr(SECRET_KEY)
  console.log('This is the email the email is about to change', crypter)
  const email = crypter.decrypt(ResetPasswordPayload.email)
  console.log('This is the email the email is about to change', email)

  const user = await User.findOne({
    email: email,
    password_reset_token: ResetPasswordPayload.signature,
  })

  console.log('This is the user that is changing password', user)
  if (user === null || user === undefined) {
    return NextResponse.json({
      status: 400,
      message: 'Reset url is incorrect. Please double check it.',
    })
  }

  // const salt = bcrypt.genSaltSync(10)
  // user.password = bcrypt.hashSync(ResetPasswordPayload.password, salt)
  user.password_reset_token = null
  await user.save()

  return NextResponse.json({
    status: 200,
    message:
      'Password changed sucessfully. You can now login with the new password',
  })
}
