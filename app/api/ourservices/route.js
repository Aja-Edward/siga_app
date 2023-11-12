import { connectToDB } from '@utils/database'
import Service from '@models/serviceModel'
// import { createRouter } from 'next-connect'

// export const router = createRouter()
export const GET = async (request, cxt) => {
  // router.run(request, cxt)

  try {
    await connectToDB()

    const services = await Service.find({})
    console.log(services)
    return new Response(JSON.stringify(services), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch your service', { status: 500 })
  }
}
