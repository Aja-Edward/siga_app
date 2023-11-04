'use client'

import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { createContext, useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { countries } from 'countries-list'
import { useSearchParams } from 'next/navigation'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const searchParams = useSearchParams()
  const userId = searchParams.get('id')
  const serviceSlug = searchParams.get('slug')

  const router = useRouter()
  const { data: session, update } = useSession()

  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    phoneNo: '',
    zipCode: '',
  })
  const [freebie, setFreebie] = useState({
    topic: '',
    slug: '',
    fsubtopic: '',
    firstdescription: '',
    ssubtopic: '',
    seconddescription: '',
    tsubtopic: '',
    thirddescription: '',
  })
  const countriesList = Object.values(countries)

  const registerUser = async ({ name, email, password, phone }) => {
    try {
      const { data } = await axios.post('/api/auth/register', {
        name,
        email,
        phone,
        password,
      })
      console.log(data)
      if (data) {
        setSuccess(success?.response?.data.message)
      }
    } catch (error) {
      setError('An error occurred during registration.')
      return false
    }
  }

  const updateUserProfile = async (formData) => {
    setLoading(true)
    try {
      const formDataObj = new FormData()
      formDataObj.append('name', formData.name)
      formDataObj.append('email', formData.email)
      formDataObj.append('phone', formData.phone)

      formDataObj.append('image', formData.avatar)

      const response = await axios.patch(`/api/users/${userId}`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.status === 200) {
        const { name, email, phone, avatar } = response.data
        await update({
          ...session,
          user: {
            ...session?.user,
            name,
            email,
            phone,
            avatar,
          },
        })
        setLoading(false)
        alert('User updated successfully!')
        router.push('/me/userprofilepage')
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const updateTeamProfile = async (formData) => {
    setLoading(true)
    try {
      const formDataObj = new FormData()
      formDataObj.append('name', formData.name)
      formDataObj.append('email', formData.email)
      formDataObj.append('phone', formData.phone)
      formDataObj.append('title', formData.title)
      formDataObj.append('description', formData.description)

      formDataObj.append('image', formData.avatar)

      const response = await axios.patch(`/api/team/${userId}`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.status === 200) {
        const { name, email, phone, avatar, title, description } = response.data
        await update({
          ...session,
          user: {
            ...session?.user,
            name,
            email,
            phone,
            avatar,
            title,
            description,
          },
        })
        setLoading(false)
        alert('Welcome into our team!')
        router.push('/me/userprofilepage')
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const updateUserPassword = async (currentPassword, newPassword) => {
    const myuserId = session.user._id
    console.log(myuserId)
    try {
      const response = await axios.patch(
        `/api/users/update-password/${myuserId}`,
        {
          currentPassword,
          newPassword,
        }
      )
      console.log(response)
      if (response.status === 200) {
        alert('User password updated successfully!')
        router.push('/')
      }
    } catch (error) {
      console.log(error.message)
      setError(error.response)
    }
  }

  const editService = async (props) => {
    if (!serviceSlug) {
      alert('Service Id not available')
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('name', props.name)
      formData.append('slug', props.slug)
      formData.append('description', props.description)
      formData.append('category', props.category)
      formData.append('availability', props.availability)
      formData.append('quantity', props.quantity)
      formData.append('rating', props.rating)
      // formData.append('numReviews', props.numReviews)

      Array.from(props.images).forEach((file, i) => {
        formData.append(`images-${i}`, file)
      })

      const response = await axios.patch(
        `/api/ourservices/${serviceSlug}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      if (response.status === 200) {
        alert('Service updated Successfully!')
        router.push('/admin/sigaservices')
      } else {
        alert('Failed to update service')
      }
    } catch (error) {
      console.error('Error updating service:', error.message)
      alert('An error occurred while updating the service')
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  const postService = async (formData) => {
    setLoading(true)

    try {
      const formDataObj = new FormData()
      formDataObj.append('name', formData.name)
      formDataObj.append('slug', formData.slug)
      formDataObj.append('description', formData.description)
      formDataObj.append('category', formData.category)
      formDataObj.append('availability', formData.availability)
      formDataObj.append('quantity', formData.quantity)
      formDataObj.append('rating', formData.rating)
      formDataObj.append('numReviews', formData.numReviews)
      Array.from(formData.images).forEach((file, i) => {
        formDataObj.append(`images-${i}`, file, file.name)
      })

      console.log(formDataObj)
      const response = await axios.post('/api/ourservices/new', formDataObj)
      if (response.status === 200) {
        router.push('/')
      }
      console.log(response)
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const addNewFreebie = async (e) => {
    setSubmitting(true)
    try {
      const response = await fetch('/api/team/serviceprovider/new', {
        method: 'POST',
        body: JSON.stringify({
          topic: freebie.topic,
          slug: freebie.slug,
          fsubtopic: freebie.fsubtopic,
          firstdescription: freebie.firstdescription,
          ssubtopic: freebie.ssubtopic,
          seconddescription: freebie.seconddescription,
          tsubtopic: freebie.tsubtopic,
          thirddescription: freebie.thirddescription,
          user: session?.user._id,
        }),
      })
      console.log(response)
      if (response.ok) {
        setFreebie({
          topic: '',
          slug: '',
          fsubtopic: '',
          firstdescription: '',
          ssubtopic: '',
          seconddescription: '',
          tsubtopic: '',
          thirddescription: '',
        })
        alert('Freebie added successfully')
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  const addNewAddress = async (e) => {
    setSubmitting(true)

    try {
      const response = await fetch('/api/address/new', {
        method: 'POST',
        body: JSON.stringify({
          street: address.street,
          city: address.city,
          state: address.state,
          phoneNo: address.phoneNo,
          zipCode: address.zipCode,
          country: address.country,
          user: session?.user._id,
        }),
      })
      if (response.ok) {
        setAddress({
          street: '',
          city: '',
          state: '',
          phoneNo: '',
          zipCode: '',
          countries: '',
        })
        alert('Address addeded successfully')
        router.push('/me/userprofilepage')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  const clearError = () => {
    setError(null)
  }
  return (
    <AuthContext.Provider
      value={{
        service,
        postService,
        setService,
        editService,
        user,
        setUser,
        registerUser,
        updateUserProfile,
        updateUserPassword,
        loading,
        address,
        addNewAddress,
        setAddress,
        submitting,
        setSubmitting,
        updateTeamProfile,
        error,
        addNewFreebie,
        clearError,
        freebie,
        setFreebie,
        success,
        countriesList,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export default AuthContext
