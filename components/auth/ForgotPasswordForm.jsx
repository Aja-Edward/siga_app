'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from '@components/Spinner'

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState()

  const submitHandler = async (e) => {
    e.preventDefault()

    setLoading(true)
    try {
      const response = await axios.post('/api/message/forgot_password', {
        email,
      })
      const data = response.data
      console.log(data)
      console.log(response)
      if (data.status === 200) {
        toast.success(data.message, { theme: 'colored' })
      } else if (data.status === 400) {
        setErrors(data.errors)
        console.log(data.errors)
      } else if (data.status === 500) {
        toast.error(data.message, { theme: 'colored' })
      }
    } catch (error) {
      console.error('An error occurred:', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#000000',
        }}
      >
        <div
          style={{
            width: '450px',
            padding: '1.25rem',
            borderRadius: '1.375px',
            backgroundColor: '#fefefebd',
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
          }}
        >
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            Forgot Password ?
          </h1>
          <p>
            Don't worry it happens. Just send your email below and we will send
            an email to you
          </p>
          <form onSubmit={submitHandler}>
            <div
              style={{ marginTop: '2rem' }}
              className='forgot_password_container'
            >
              <label htmlFor='' style={{ display: 'block' }}>
                Email
              </label>
              <input
                type='email'
                placeholder='sigaapp@siga247.com'
                value={email}
                name={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '5px',
                }}
              />

              {errors && (
                <div
                  style={{
                    color: 'red',
                    fontWeight: 500,
                    fontSize: '1rem',
                  }}
                >
                  {errors?.email}
                </div>
              )}
            </div>
            <div className='forgot_password_btn'>
              <button disabled={loading}>
                {loading ? (
                  <div>
                    <Spinner /> Processing
                  </div>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgotPasswordForm
