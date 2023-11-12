import { connectToDB } from '@utils/database'
import Service from '@models/serviceModel'
import path from 'path'
import fs from 'fs'
import { cloudinary } from '@utils/cloudinary'
import DatauriParser from 'datauri/parser'

export const GET = async (request, { params }) => {
  try {
    await connectToDB()
    const service = await Service.findOne({ slug: params.id })

    console.log('service from backend', service)
    if (!service) {
      return new Response('Cannot find service', { status: 404 })
    }
    return new Response(JSON.stringify(service), { status: 200 })
  } catch (error) {
    return new Response('No Service available', { status: 500 })
  }
}

const getFormDataFields = (formData) => {
  const fields = {}
  let files = []

  for (const [fieldName, fieldValue] of formData.entries()) {
    if (fieldName.includes('images')) {
      files.push({ name: fieldName, file: fieldValue })
    } else {
      fields[fieldName] = fieldValue
    }
  }
  return { fields, files }
}

const checkFileType = (blob) => {
  // We only want to accept image files of type jpg, jpeg, and png.
  // If file is not such, we reject it.
  const allowedTypes = /jpg|jpeg|png/

  if (!allowedTypes.test(path.extname(blob.name).toLowerCase())) {
    throw new Error('Please upload either a jpeg, jpg or a pn file online')
  }
}
const saveFileToDisk = async (blob) => {
  // checkFileType(blob)

  // try {
  //   const blobBuffer = Buffer.from(await blob.arrayBuffer())
  //   const extname = path.extname(blob.name)
  //   const partName = path.basename(blob.name, extname)
  //   const filename = `${partName}-${Date.now()}${extname}`
  //   const destinationPath = 'tmp/' + filename

  //   // Write the Blob data to the destination file
  //   fs.writeFile(destinationPath, blobBuffer, (err) => {
  //     if (err) {
  //       console.error('Error writing file:', err)
  //       return
  //     }

  //     console.log('File saved successfully to upload folder')
  //   })
  //   return destinationPath
  // } catch (error) {
  //   console.log('error: ', error.message)
  // }

  const parser = new DatauriParser()
  checkFileType(blob)
  try {
    const blobBuffer = Buffer.from(await blob.arrayBuffer())

    const base64Image = parser.format(
      path.extname(blob.name).toString(),
      blobBuffer
    )

    return base64Image.content
  } catch (error) {
    console.log('error: ', error.message)
  }
}

export const PATCH = async (request, { params }) => {
  try {
    const form = await request.formData()
    const { fields, files } = getFormDataFields(form)
    console.log(files)
    console.log('Form from frontend', form)
    const filePaths = await Promise.all(
      files.map(async (fileData) => {
        return await saveFileToDisk(fileData.file)
      })
    )

    await connectToDB()
    // await multerMiddleware(request, response);
    const existingService = await Service.findOne({ slug: params.id })

    console.log('Existing Service', existingService)

    const servicesFolder = 'mysiga/services'

    for (const filePath of filePaths) {
      if (filePath) {
        console.log(filePath)
        try {
          const uploadResponse = await cloudinary.uploader.upload(filePath, {
            folder: servicesFolder,
          })

          // fs.unlinkSync(filePath)

          existingService.images.push({
            public_id: uploadResponse.public_id,
            url: uploadResponse.url,
          })
        } catch (uploadError) {
          console.error('Error uploading to Cloudinary:', uploadError.message)
        }
      }
    }

    let numReviews

    existingService.name = fields.name
    existingService.slug = fields.slug
    existingService.description = fields.description
    existingService.category = fields.category
    existingService.availability = fields.availability
    existingService.quantity = fields.quantity ? Number(fields.quantity) : 0
    existingService.rating = fields.rating ? Number(fields.rating) : 0
    numReviews = fields.numReviews ? Number(fields.numReviews) : 0
    if (!isNaN(numReviews)) {
      existingService.numReviews = numReviews
    } else {
      console.error('Invalid numReviews value:', fields.numReviews)
    }

    await existingService.save()

    const successResponse = { message: 'Service updated successfully' }
    return new Response(JSON.stringify(successResponse), { status: 200 })
  } catch (error) {
    console.log('error', error.message, error.response?.data)
    const errorResponse = { message: 'Failed to update Service' }
    return new Response(JSON.stringify(errorResponse), { status: 500 })
  }
}

// GET SPECIFIC SERVICE AND DELETE IT
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB()
    console.log('Deleting service with slug:', params.id)
    const deletedService = await Service.findOneAndRemove({ slug: params.id })
    if (deletedService) {
      console.log('Service deleted successfully:', deletedService)
      return new Response('Service deleted successfully', { status: 200 })
    } else {
      console.log('Service not found')
      return new Response('Service not found', { status: 404 })
    }
  } catch (error) {
    console.error('DELETE Error:', error.message)
    return new Response('Failed to delete service', { status: 500 })
  }
}

// export const POST = async (req, { params }) => {
//   const { rating, comment, name, user } = await req.json()
//   console.log('Params ID', params)

//   try {
//     await connectToDB()
//     const service = await Service.findById(params.id)

//     if (!service) {
//       console.log('Service not found')
//     }
//     console.log('Found service:', service)

//     if (service) {
//       const alreadyReviewed = service.reviews.find(
//         (r) => r.user.toString() === user.toString()
//       )
//       console.log('User data:', req.user)
//       console.log('Already reviewed:', alreadyReviewed)
//       if (alreadyReviewed) {
//         return new Response('Service already reviewed', { status: 400 })
//       }
//     }

//     const review = {
//       name,
//       rating: Number(rating),
//       user,
//       comment,
//     }
//     console.log('New review:', review)

//     service.reviews.push(review)

//     service.numReviews = service?.reviews?.length

//     console.log('Service after updating numReviews:', service)
//     if (service.reviews.length > 0) {
//       service.rating =
//         service.reviews.reduce((acc, item) => item.rating + acc, 0) /
//         service.reviews.length
//     } else {
//       service.rating = 0 // Handle case when there are no reviews
//     }

//     await service.save()

//     console.log('updated service', service)

//     return new Response(JSON.stringify(review), {
//       status: 201,
//       message: 'Sucessfully reviewed',
//     })
//   } catch (error) {
//     console.log(error)
//     return new Response('Failed to review service', { status: 500 })
//   }
// }
