'use client'

import { useState } from 'react'
import Spinner from '@components/Spinner'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaLastfmSquare } from 'react-icons/fa'
import { useSearchParams } from 'next/navigation'

const ResetPasswordForm = ({ authState, setAuthState, submitHandler, loading, setLoading }) => {
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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Password ?</h1>

          <form onSubmit={submitHandler}>
            <div
              style={{ marginTop: '2rem' }}
              className='forgot_password_container'
            >
              <label htmlFor='' style={{ display: 'block' }}>
                Password
              </label>
              <input
                type='password'
                placeholder='Enter your new password'
                value={authState.password}
                name='password'
                onChange={(e) =>
                  setAuthState({ ...authState, password: e.target.value })
                }
                className='reset-password-input'
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '5px',
                }}
              />
              <label htmlFor='' style={{ display: 'block', margin: '15px 0' }}>
                Confirm password
              </label>
              <input
                type='password'
                placeholder='Confirm password'
                value={authState.cpassword}
                name='cpassword'
                onChange={(e) =>
                  setAuthState({ ...authState, cpassword: e.target.value })
                }
                className='reset-password-input'
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '5px',
                }}
              />
            </div>
            <div className='forgot_password_btn'>
              <button
                disabled={loading}
                style={{
                  border: 'none',
                }}
              >
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

export default ResetPasswordForm
