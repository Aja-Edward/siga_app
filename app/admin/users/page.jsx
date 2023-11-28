'use client'

import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import AuthContext from '@context/AuthContext'
import AllUserList from '@components/user/AllUserList'

const UserListPage = () => {
  const searchParams = useSearchParams()
  const userId = searchParams.get('id')
  const [allUsers, setAllUsers] = useState([])
  const [addresses, setAddresses] = useState([])
  const [singleAddress, setSingleAddress] = useState([])
  const [singleUser, setSingleUser] = useState(null)
  const router = useRouter()
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/me/login?callbackUrl=/admin/users')
    },
  })

  const fetchUserList = async () => {
    try {
      const { data } = await axios.get('/api/userlist', { cache: 'no-store' })
      setAllUsers(data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUserData = async () => {
    try {
      const [addressResponse, userResponse] = await Promise.all([
        fetch(`/api/address`),
        fetch(`/api/users/${session?.user._id}/address`),
      ])

      if (!addressResponse.ok) {
        throw new Error(
          `Address API returned status: ${addressResponse.status}`
        )
      }

      if (!userResponse.ok) {
        throw new Error(`User API returned status: ${userResponse.status}`)
      }

      const addressData = await addressResponse.json()
      const singleUserAddress = await userResponse.json()

      setAddresses(addressData)
      setSingleAddress(singleUserAddress)
    } catch (error) {
      console.error('Fetch Error:', error)
    }
  }

  const fetchSingleUser = async () => {
    if (session?.user._id) {
      try {
        const response = await fetch(`/api/users/${session.user._id}`)
        const singleUserInfo = await response.json()
        setSingleUser(singleUserInfo)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    fetchUserList()
    fetchUserData()
    fetchSingleUser()
  }, [session?.user._id])

  const handleEdit = (address) => {
    router.push(`/update-address?id=${address._id}`)
  }

  const handleUserUpdate = (id) => {
    router.push(`/me/update/user-role?id=${id}`)
  }

  const handleDelete = async (address) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this address?'
    )
    if (hasConfirmed) {
      try {
        await fetch(`/api/address/${address._id.toString()}`, {
          method: 'DELETE',
        })
        const filteredAddresses = singleAddress.filter(
          (a) => a._id !== address._id
        )
        setSingleAddress(filteredAddresses)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <section>
      {session && (
        <AllUserList
          allUsers={allUsers}
          name='My'
          addressData={addresses}
          singleUserInfo={singleUser}
          singleUserAddress={singleAddress}
          session={session}
          description='Welcome this is your profile page utilize it'
          handleEdit={handleEdit}
          handleUserUpdate={handleUserUpdate}
          handleDelete={handleDelete}
        />
      )}
    </section>
  )
}

export default UserListPage
