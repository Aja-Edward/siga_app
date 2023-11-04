import { connectToDB } from '@utils/database'
import Service from '@models/serviceModel'

export const POST = async (req, { params }) => {
  try {
    const { rating, comment, user, name } = await req.json()
    console.log('Params ID', params)

    await connectToDB()
    console.log('Received serviceId:', params.id)

    const service = await Service.findById(params.id)

    console.log('Found service:', service)

    if (!service) {
      return new Response('Service  not found', { status: 404 })
    }

    const alreadyReviewed = service?.reviews?.find(
      (r) => r.user?.toString() === user?._id?.toString()
    )

    console.log('User data:', req.user)
    console.log('Already reviewed:', alreadyReviewed)

    if (alreadyReviewed) {
      return new Response('Service already reviewed', { status: 400 })
    }

    const review = {
      rating: Number(rating),
      comment,
      user,
      name,
    }
    console.log('New review:', review)

    service.reviews.push(review)

    service.numReviews = service?.reviews?.length

    console.log('Service after updating numReviews:', service)

    service.rating =
      service.reviews.reduce((acc, item) => item.rating + acc, 0) /
      service.reviews.length

    await service.save()

    console.log('Updated service', service)

    return new Response(JSON.stringify(review), {
      status: 201,
      message: 'Sucessfully reviewed',
    })
  } catch (error) {
    console.log(error.stack)
    return new Response('Failed to review service', { status: 500 })
  }
}
