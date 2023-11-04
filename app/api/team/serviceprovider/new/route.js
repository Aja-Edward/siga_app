import Freebie from '@models/freebieModel'
import { connectToDB } from '@utils/database'

export const POST = async (request) => {
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
    await connectToDB()
    const newFreeBieExists = await Freebie.findOne({ topic })

    if (newFreeBieExists) {
      return new Response(
        'The lesson topic is already taken, please change the topic',
        { status: 400 }
      )
    }
    const newFreebie = new Freebie({
      topic,
      slug,
      fsubtopic,
      firstdescription,
      ssubtopic,
      seconddescription,
      tsubtopic,
      thirddescription,
      user,
    })

    await newFreebie.save()

    console.log(newFreebie)

    if (newFreebie) {
      return new Response(JSON.stringify(newFreebie), { status: 201 })
    } else {
      return new Response('Invalid lesson data', { status: 400 })
    }
  } catch (error) {
    console.log(error)
    return new Response('failed to add new lesson', { status: 500 })
  }
}
