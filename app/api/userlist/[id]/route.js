import { connectToDB } from '@utils/database'
import User from '@models/userModel'

// GET SPECIFIC SERVICE AND EDIT IT
export const PATCH = async (request, { params }) => {
  const { role } = await request.json()
  try {
    await connectToDB()
    const existingAppUser = await User.findByIdAndUpdate(params.id)
    if (!existingAppUser) return new Response('User not found', { status: 404 })

    existingAppUser.role = role

    await existingAppUser.save()
    console.log('New Role Update', existingAppUser)
    return new Response(JSON.stringify(existingAppUser), { status: 200 })
  } catch (error) {
    return new Response('Failed to upate User Role', { status: 500 })
  }
}
