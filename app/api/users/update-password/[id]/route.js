import { connectToDB } from '@utils/database'
import User from '@models/userModel'
import bcrypt from 'bcryptjs'

export const PATCH = async (req, { params }) => {
  try {
    const { currentPassword, newPassword } = await req.json()
    if (!currentPassword || !newPassword) {
      return {
        error: 'Both currentPassword and newPassword are required fields',
      }
    }
    await connectToDB()

    const user = await User.findById(params.id).select('+password')

    if (!user) {
      return new Response('User not found', { status: 404 })
    }

    const isPasswordMatched = await bcrypt.compare(
      currentPassword,
      user.password
    )

    if (!isPasswordMatched) {
      return new Response('Old password incorrect', { status: 400 })
    }

    user.password = newPassword

    await user.save()

    return new Response('Password updated successfully', { status: 200 })
  } catch (error) {
    console.error('Error updating password:', error)
    return new Response('Failed to update password', { status: 500 })
  }
}
