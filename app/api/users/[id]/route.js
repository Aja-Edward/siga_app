import { connectToDB } from '@utils/database'
import User from '@models/userModel'
import path from 'path'
import fs from 'fs'
import { cloudinary } from '@utils/cloudinary'

// GET ALL THE USER

export const GET = async (request, { params }) => {
  try {
    await connectToDB()
    const user = await User.findById(params.id)

    if (!user) {
      return new Response('Cannot find User', { status: 404 })
    }

    return new Response(JSON.stringify(user), { status: 200 })
  } catch (error) {
    return new Response('No User available', { status: 500 })
  }
}

// GET SPECIFIC USER AND EDIT IT

const getFormDataFields = (formData) => {
  try {
    const fields = {}
    let files = []
    console.log('My files and files1', files, fields)
    for (const field of formData) {
      if (field[1] instanceof Blob) {
        files.push({ name: field[0], file: field[1] })
        console.log('My files and files2', files, fields)
      } else {
        fields[field[0]] = field[1]
      }
    }
    console.log('My files and files3', files, fields)
    return { fields, files }
  } catch (error) {
    console.lor(error)
  }
}

const checkFileType = (blob) => {
  try {
    const allowedTypes = /jpg|jpeg|png/
    console.log('Your image is allowed type1', allowedTypes)
  } catch (error) {
    if (!allowedTypes.test(path.extname(blob.name).toLowerCase())) {
      throw new Error('Please upload either a jpeg, jpg or a pn file online')
    }
  }
}
const saveFileToDisk = async (blob) => {
  checkFileType(blob)

  console.log('SAVE FILE TO DISK', saveFileToDisk)
  try {
    const blobBuffer = Buffer.from(await blob.arrayBuffer())

    const extname = path.extname(blob.name)

    const partName = path.basename(blob.name, extname)

    const filename = `${partName}-${Date.now()}${extname}`
    console.log('FILE NAME HERE', filename)

    const destinationPath = 'tmp/' + filename

    console.log('THIS IS THE DESTINATION PATH', destinationPath)

    // Write the Blob data to the destination file
    fs.writeFile(destinationPath, blobBuffer, (err) => {
      if (err) {
        console.error('Error writing file:', err)
        return
      }

      console.log('sucessfully written on the destinatinoPath', destinationPath)
    })
    return destinationPath
  } catch (error) {
    console.log('error: ', error.message)
  }
}

export const PATCH = async (request, { params }) => {
  try {
    const form = await request.formData()

    console.log('OUR FORM', form)
    const { fields, files } = getFormDataFields(form)

    console.log('OUR FIELDS AND FILES', { fields, files })
    const { name, email, phone } = fields

    console.log('OUR FIELS', fields)
    const filePath = await saveFileToDisk(files[0].file)
    console.log('THIS IS OUR FILE PATH', filePath)

    await connectToDB()
    console.log('MONGODB IS CONNECTED HERE')

    const existingUser = await User.findOne({ email })
    console.log('THIS IS THE USER I WANT TO CHANGE THE AVATAR', existingUser)
    const avatarFolder = 'mysiga/avatar'

    console.log('THIS IS WHERE THE AVATAR IS SAVED ON CLOUDINARY', avatarFolder)

    let avatar

    console.log('MY AVATAR', avatar)
    if (filePath) {
      const uploadResponse = await cloudinary.uploader.upload(filePath, {
        folder: avatarFolder,
      })
      console.log('MY EXPECTED RESPOSNE FOR UPLOAD AVATAR', uploadResponse)
      fs.unlinkSync(filePath)

      avatar = {
        public_id: uploadResponse.public_id,
        url: uploadResponse.url,
      }
      console.log('THE AVATAR URL', avatar)
      existingUser.avatar = avatar
      console.log('THE AVATAR ITSELF', avatar)
    }

    existingUser.name = name
    existingUser.email = email
    existingUser.phone = phone

    console.log('User that want to change avatar', existingUser)
    await existingUser.save()

    const successResponse = {
      message: 'User updated successfully',
      avatar,
      ...fields,
    }
    console.log('MESSAGE FOR SUCESSFUL UPDATE', successResponse.message)
    console.log('MESSAGE FOR SUCESSFUL UPDATE', successResponse.avatar)
    console.log('MESSAGE FOR SUCESSFUL UPDATE', successResponse.fields)
    return new Response(JSON.stringify(successResponse), { status: 200 })
  } catch (error) {
    console.log('error', error.message, error.response?.data)
    const errorResponse = { message: 'Failed to update user' }
    return new Response(JSON.stringify(errorResponse), { status: 500 })
  }
}
// GET SPECIFIC USER AND DELETE IT
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB()

    await User.findByIdAndRemove(params.id)
    return new Response('User deleted successfully', { status: 200 })
  } catch (error) {
    return new Response('Faied to delete User', { status: 500 })
  }
}
