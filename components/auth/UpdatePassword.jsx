'use client'

import { useContext, useState, useEffect } from 'react'
import AuthContext from '@context/AuthContext'
import { toast } from 'react-toastify'

const UpdatePassword = () => {
  const { error, updateUserPassword, clearError } = useContext(AuthContext)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (error) {
      console.log(error.message)
      const errorMessage =
        error.message || error.statusText || 'An unknown error occurred'
      toast.error(errorMessage)
      clearError()
    }
  }, [error])

  const submitHandler = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    try {
      await updateUserPassword(currentPassword, newPassword)

      setSuccessMessage('User password updated successfully!')
      console.log(currentPassword)
      console.log(newPassword)
    } catch (error) {
      console.log(error)
      toast.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <div style={{ maxWidth: '480px' }} className='updatepassword-container'>
        <form onSubmit={submitHandler}>
          <h2 className='updatepassword-form'>Update Password</h2>

          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>
              {' '}
              Current Password{' '}
            </label>
            <input
              type='password'
              placeholder='Current Password'
              minLength={6}
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '4px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>
              {' '}
              New Password{' '}
            </label>
            <input
              type='password'
              placeholder='New Password'
              minLength={6}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className='updatepassword-btn-container'>
            <button disabled={isLoading}>
              {isLoading ? 'Updating ...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default UpdatePassword
