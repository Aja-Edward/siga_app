'use client'

import { useState, useEffect, useContext, useRef } from 'react'
import Image from 'next/image'
import AuthContext from '@context/AuthContext'
import { toast } from 'react-toastify'

const UpdateUserRoleForm = ({
  user,
  type,
  setUser,
  handleSubmit,
  submitting,
  setSubmitting,
}) => {
  return (
    <div style={{ maxWidth: '480px' }} className='updatepassword-container'>
      <h3>{user.name}</h3>

      <form onSubmit={handleSubmit}>
        <h2 className='updatepassword-form'>{type}</h2>

        <div style={{ marginBottom: '8px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>
            {' '}
            User Role{' '}
          </label>
          <select
            name='role'
            id='role'
            placeholder='select'
            required
            type='select'
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          >
            <option>admin</option>
            <option>manager</option>
            <option>service provider</option>
            <option>user</option>
          </select>
        </div>
        <div className='updatepassword-btn-container'>
          <button
            style={{ cursor: 'pointer' }}
            type='submit'
            disabled={submitting ? true : false}
          >
            {submitting ? `${type}...` : 'Role Update'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateUserRoleForm
