'use client'

import SingleUserWishList from '@components/wishlist/SingleUserWishList'
import { useSession } from 'next-auth/react'


import { redirect, useRouter } from 'next/navigation'

const UserWishListPage = () => {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      if (session?.user?.role === 'admin') {
        redirect('login?callbackUrl=/wishlist')
      } else {
        redirect(' /login?callbackUrl=/wishlist/user-wishlist')
      }
    },
  })
  console.log(session?.user)

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session || status === 'unauthenticated') {
    return <div>Please login to view this page.</div>
  }

  return <section>{session && <SingleUserWishList />}</section>
}

export default UserWishListPage
