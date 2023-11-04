import { connectToDB } from '@utils/database'
import Freebie from '@models/freebieModel'

// GET SINGLE FREEBIE

export const GET = async (request, { params }) => {
  try {
    await connectToDB()
    const freebie = await Freebie.findOne({ slug: params.id })
    console.log('free lesson from backend', freebie)
    if (!freebie) {
      return new Response('Cannot find free lesson', { status: 404 })
    }
    return new Response(JSON.stringify(freebie), { status: 200 })
  } catch (error) {
    return new Response('No Free lesson available', { status: 500 })
  }
}

export const PATCH = async (request, { params }) => {
  const {
    topic,
    slug,
    fsubtopic,
    firstdescription,
    ssubtopic,
    seconddescription,
    tsubtopic,
    thirddescription,
    user,
  } = await request.json()

  try {
    console.log('About to connect to Database')
    await connectToDB()

    console.log('Connected sucessfully to the database')

    const existingFreebie = await Freebie.findOne({ slug: params.id })

    console.log('Existing freebie you want to edit', existingFreebie)

    if (!existingFreebie)
      return new Response('Free lesson not found', { status: 404 })

    existingFreebie.topic = topic
    existingFreebie.slug = slug
    existingFreebie.fsubtopic = fsubtopic
    existingFreebie.firstdescription = firstdescription
    existingFreebie.ssubtopic = ssubtopic
    existingFreebie.seconddescription = seconddescription
    existingFreebie.tsubtopic = tsubtopic
    existingFreebie.thirddescription = thirddescription
    request.user = user

    console.log('This is the freebie about to save', existingFreebie)

    await existingFreebie.save()

    return new Response(JSON.stringify(existingFreebie), { status: 200 })
  } catch (error) {
    return new Response('Failed to update Lesson', { status: 500 })
  }
}
// GET SPECIFIC SERVICE AND DELETE IT

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB()

    await Freebie.findByIdAndRemove(params.id)
    return new Response('Free lesson deleted sucessfully', { status: 200 })
  } catch (error) {
    return new Response('Failed to delete lesson', { status: 500 })
  }
}
