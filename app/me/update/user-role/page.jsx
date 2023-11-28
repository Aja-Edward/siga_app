'use client'

import { useState, useEffect, useContext } from 'react'
import { useSearchParams, useRouter, redirect } from 'next/navigation'
import axios from 'axios'
import AuthContext from '@context/AuthContext'
import UpdateUserRoleForm from '@components/user/UpdateUserRoleForm'
import { toast } from 'react-toastify'

const UpdateUserRole = () => {
  const searchParams = useSearchParams()
  const userId = searchParams.get('id')
  const router = useRouter()
  const { error, clearError } = useContext(AuthContext)
  const [submitting, setSubmitting] = useState(false)
  const [user, setUser] = useState({
    role: '',
  })

  const updateRole = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    if (!userId) return alert('User Id not found!')

    try {
      const response = await fetch(`/api/userlist/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: user.role, // Directly pass the data you want to update
        }),
        cache: 'no-store',
      })

      if (response.ok) {
        alert('User Role updated successfully!')
        router.push('/admin/users')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`)
        const data = await response.json()
        console.log(data)
        console.log(data.role)

        setUser({
          role: data.role,
        })
      } catch (error) {
        toast.error(error)
        clearError()
      }
    }
    getUserDetails()
    toast.success('App User Detailed Fetched')
  }, [userId])

  return (
    <div>
      <UpdateUserRoleForm
        type='Updating User Role'
        user={user}
        setUser={setUser}
        handleSubmit={updateRole}
        submitting={submitting}
        setSubmitting={setSubmitting}
      />
    </div>
  )
}

export default UpdateUserRole
