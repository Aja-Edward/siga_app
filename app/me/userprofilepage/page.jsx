'use client'

import Image from 'next/image'
import { useState, useEffect, useContext } from 'react'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import AuthContext from '@context/AuthContext'
import UserProfile from '@components/auth/UserProfile'
import WishList from '@components/wishlist/WishList'

const UserProfilePage = () => {
  const [singleAddress, setSingleAddress] = useState([])
  const [singleUser, setSingleUser] = useState(null)

  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/')
    },
  })
  console.log(session)
  useEffect(() => {
    const fetchAddresses = async () => {
      if (session?.user?._id) {
        const response = await fetch(`/api/users/${session.user._id}/address`)
        const singleUserAddress = await response.json()
        setSingleAddress(singleUserAddress)
        console.log(session.user)
      }
    }

    fetchAddresses()
  }, [session?.user?._id])

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`/api/users/${session?.user._id}`)
      const singleUserInfo = await response.json()
      setSingleUser(singleUserInfo)
      console.log(singleUserInfo)
      console.log(singleUser)
    }
    if (session?.user._id) fetchUsers()
  }, [session?.user._id])

  // const { user } = useContext(AuthContext)

  const handleEdit = (singleUserAddress) => {
    router.push(`/update-address?id=${singleUserAddress._id}`)
  }

  const handleUserUpdate = () => {
    router.push(`/me/update?id=${session?.user._id}`)
  }

  const handleDelete = async (singleUserAddress) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this address?'
    )
    if (hasConfirmed) {
      try {
        await fetch(`/api/address/${singleUserAddress._id.toString()}`, {
          method: 'DELETE',
        })
        const filteredAddresses = singleAddress.filter(
          (a) => a._id !== singleUserAddress._id
        )
        setSingleAddress(filteredAddresses)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleUserDelete = async (singleUser) => {
    console.log(singleUser)
    const hasConfirmed = confirm('Are you sure you want to delete this user?')
    if (hasConfirmed) {
      try {
        await fetch(`/api/users/${singleUser?._id.toString()}`, {
          method: 'DELETE',
        })
        console.log(singleUser)
        const filteredUser = singleUser?.filter(
          (user) => user._id !== singleUser._id
        )
        setSingleUser(filteredUser)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div style={{ position: 'inline-block' }}>
      <UserProfile
        name='My'
        singleUserInfo={singleUser}
        singleUserAddress={singleAddress}
        session={session}
        description="Welcome aboard! We're thrilled to have you join our vibrant community. Explore our features, engage with like-minded individuals, and embark on a journey of growth and connection. Your presence enriches our platform, and we're here to support your every step. Let's make great things happen together! 🌟🚀"
        handleEdit={handleEdit}
        handleUserUpdate={handleUserUpdate}
        handleUserDelete={handleUserDelete}
        handleDelete={handleDelete}
      />
      <WishList type='Wish List' user={singleUser} />
    </div>
  )
}

export default UserProfilePage
