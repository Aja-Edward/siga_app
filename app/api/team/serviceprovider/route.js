import Freebie from '@models/freebieModel'
import { connectToDB } from '@utils/database'

export const GET = async (request) => {
  try {
    await connectToDB()
    const freebies = await Freebie.find({}).populate('user')
    return new Response(JSON.stringify(freebies), { status: 200 })
  } catch (error) {
    return new Response('failed to fetch new lesson', { status: 500 })
  }
}
