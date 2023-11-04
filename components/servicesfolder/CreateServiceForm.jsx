import { useState, useEffect, useContext, useRef } from 'react'
import AuthContext from '@context/AuthContext'
import { redirect, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const CreateServiceForm = ({ type }) => {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('')
  const [availability, setAvailability] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const [description, setDescription] = useState('')
  const [numReviews, setNumReviews] = useState(0)
  const [rating, setRating] = useState()
  const [images, setImages] = useState([])
  const [imagePreview, setImagePreview] = useState([
    '/assets/images/defaultimage.png',
  ])
  const router = useRouter()

  const { postService, error, success } = useContext(AuthContext)
  const formRef = useRef()

  const createService = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    console.log(createService)
    try {
      postService({
        name,
        category,
        slug,
        availability,
        quantity,
        description,
        numReviews,
        rating,
        images,
      })
      formRef.current.reset()
      setName('')
      setCategory('')
      setSlug('')
      setAvailability('')
      setQuantity(0)
      setDescription('')
      setNumReviews(0)
      setRating('')
      setImages([])
      setImagePreview(['/assets/images/defaultimage.png'])
      setIsLoading(false)
      toast.success(message)
      router.push('/')
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  const onChange = (e) => {
    const selectedFiles = e.target.files
    setImages(selectedFiles)
    const previewImages = []

    for (let i = 0; i < selectedFiles.length; i++) {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          previewImages.push(reader.result)

          // Check if all images have been read and update state
          if (previewImages.length === selectedFiles.length) {
            setImagePreview([...previewImages])
          }
        }
      }

      reader.readAsDataURL(selectedFiles[i])
    }
  }

  return (
    <>
      <div className='createservice_form_container'>
        <>
          <div className='form-image'>
            <Image
              src='/assets/images/register_img.png'
              width={400}
              height={400}
              alt='register image'
              className='register-image'
            />
          </div>
          <form onSubmit={createService} ref={formRef}>
            <h1>{type} Service Form</h1>
            <input
              type='text'
              placeholder='service name'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type='text'
              placeholder='Enter Slug'
              value={slug}
              required
              onChange={(e) => setSlug(e.target.value)}
            />
            <input
              type='text'
              placeholder='Enter Your category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              type='text'
              placeholder='Availability'
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            />
            <input
              type='number'
              placeholder='quantity'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <input
              type='number'
              placeholder='numReviews'
              value={numReviews}
              onChange={(e) => setNumReviews(e.target.value)}
            />
            <select
              name='select'
              id=''
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value=''>Rating...</option>
              <option value='1'>1 </option>
              <option value='2'>2</option>
              <option value='3'>3 </option>
              <option value='4'>4 </option>
              <option value='5'>5 </option>
            </select>
            <textarea
              name=''
              id=''
              cols='60'
              rows='7'
              type='description'
              placeholder='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div>
              {imagePreview.map((preview, index) => (
                <Image
                  key={index}
                  src={preview}
                  alt={`image-${index}`}
                  width={100}
                  height={100}
                  priority
                />
              ))}
            </div>
            <div className='file_upload'>
              <p>
                <input
                  type='file'
                  id='formFile'
                  accept='image/*'
                  multiple
                  onChange={onChange}
                />
              </p>
              <div className='mb-4'>
                <div className='mb-4 flex flex-col md:flex-row'>
                  <div className='md:w-2/3 lg:w-80'>
                    <h5 style={{ color: 'red' }}>
                      (*) Only accept image files less than 1mb in size and the
                      format include png/jpeg/jpg
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <button
              type='submit'
              className='my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700'
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </form>
        </>
      </div>
    </>
  )
}

export default CreateServiceForm
