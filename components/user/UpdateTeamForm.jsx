'use client'

import { useState, useEffect, useContext, useRef } from 'react'
import Image from 'next/image'
import AuthContext from '@context/AuthContext'
import { useSearchParams, useRouter, redirect } from 'next/navigation'
import { toast } from 'react-toastify'

const UpdateProfile = ({ type }) => {
  const searchParams = useSearchParams()

  const formRef = useRef()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState(
    '/assets/images/defaultimage.png'
  )
  const { user, updateTeamProfile, loading, error, clearError } =
    useContext(AuthContext)

  const submitHandler = async (e) => {
    e.preventDefault()

    updateTeamProfile({
      name,
      email,
      phone,
      avatar,
      title,
      description,
    })
  }

  const onChange = (e) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result)
      }
    }
    setAvatar(e.target.files[0])
    reader.readAsDataURL(e.target.files[0])
  }

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setPhone(user.phone)
      setAvatar(user.avatar)
      setTitle(user.title)
      setDescription(user.description)
    }
    toast.success('User details fetched')
    if (error) {
      toast.error(error)
      clearError()
    }
  }, [error, user])

  return (
    <>
      <div
        style={{
          maxWidth: '480px',
          marginTop: '0.25rem',
          marginBottom: '5rem',
          padding: '1rem',
          backgroundColor: 'white',
          borderRadius: '0.25rem',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        className='update_user'
      >
        <form onSubmit={submitHandler}>
          <h2
            style={{
              marginBottom: '1.25rem',
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#282c37',
            }}
          >
            {type} Service Provider
          </h2>

          <div
            className='user_input_container'
            style={{ marginBottom: '1rem' }}
          >
            <label style={{ display: 'block', marginBottom: '0.25rem' }}>
              Full Name
            </label>
            <input
              style={{
                appearance: 'none',
                border: '1px solid #ccc',
                backgroundColor: '#f0f0f0',
                borderRadius: '0.25rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                paddingLeft: '0.75rem',
                paddingRight: '0.75rem',
                transition: 'border-color 0.2s',
                outline: 'none',
                width: '90%',
              }}
              type='text'
              placeholder='Type your name'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div
            className='user_input_container'
            style={{ marginBottom: '1rem' }}
          >
            <label style={{ display: 'block', marginBottom: '0.25rem' }}>
              Email
            </label>
            <input
              style={{
                appearance: 'none',
                border: '1px solid #ccc',
                backgroundColor: '#f0f0f0',
                borderRadius: '0.25rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                paddingLeft: '0.75rem',
                paddingRight: '0.75rem',
                transition: 'border-color 0.2s',
                outline: 'none',
                width: '90%',
              }}
              type='text'
              placeholder='Type your email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div
            className='user_input_container'
            style={{ marginBottom: '1rem' }}
          >
            <label style={{ display: 'block', marginBottom: '0.25rem' }}>
              Title
            </label>
            <input
              style={{
                appearance: 'none',
                border: '1px solid #ccc',
                backgroundColor: '#f0f0f0',
                borderRadius: '0.25rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                paddingLeft: '0.75rem',
                paddingRight: '0.75rem',
                transition: 'border-color 0.2s',
                outline: 'none',
                width: '90%',
              }}
              type='text'
              placeholder='Type your Title'
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div
            className='user_input_container'
            style={{ marginBottom: '1rem' }}
          >
            <label style={{ display: 'block', marginBottom: '0.25rem' }}>
              Description
            </label>
            <textarea
              style={{
                appearance: 'none',
                border: '1px solid #ccc',
                backgroundColor: '#f0f0f0',
                borderRadius: '0.25rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                paddingLeft: '0.75rem',
                paddingRight: '0.75rem',
                transition: 'border-color 0.2s',
                outline: 'none',
                width: '90%',
              }}
              type='text'
              placeholder='Describe your skill here'
              required
             
              rows='4'
              cols='40'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div
            className='user_input_container'
            style={{ marginBottom: '1rem' }}
          >
            <label style={{ display: 'block', marginBottom: '0.25rem' }}>
              Phone No
            </label>
            <input
              style={{
                appearance: 'none',
                border: '1px solid #ccc',
                backgroundColor: '#f0f0f0',
                borderRadius: '0.25rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                paddingLeft: '0.75rem',
                paddingRight: '0.75rem',
                transition: 'border-color 0.2s',
                outline: 'none',
                width: '90%',
              }}
              type='number'
              placeholder='Type your Phone No'
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className='profile_image' style={{ marginBottom: '1rem' }}>
            <Image
              src={avatarPreview}
              alt='image'
              width={100}
              height={100}
              priority
              style={{ borderRadius: '50%' }}
            />
          </div>
          <div className='file_upload'>
            <p>
              <input
                style={{
                  appearance: 'none',
                  border: '1px solid #ccc',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '0.25rem',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                  paddingLeft: '0.75rem',
                  paddingRight: '0.75rem',
                  transition: 'border-color 0.2s',
                  outline: 'none',
                  width: '90%',
                }}
                type='file'
                id='formFile'
                accept='image/*'
                onChange={onChange}
              />
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <div className='user_update_imageformat'>
                <div className=''>
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
            style={{
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
              paddingLeft: '1rem',
              paddingRight: '1rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              TextAlign: 'center',
              display: 'inline-block',
              color: 'white',
              backgroundColor: '#3182ce',
              border: '1px solid transparent',
              borderRadius: '0.25rem',
            }}
            disabled={loading ? true : false}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>
    </>
  )
}

export default UpdateProfile
