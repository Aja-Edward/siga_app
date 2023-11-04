'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()
  const logoutHandler = async () => {
    await signOut()
    router.push('/login')
  }
  return (
    <div className='logoutpage'>
      <h2 style={{marginBottom: '2rem',}}>
        We Are Here <span>247</span>
      </h2>
      <h3>It is nice doing business with you!</h3>
      <p>Click the button below to logout.</p>
      <button className='logoutpage-btn' onClick={logoutHandler}>
        {' '}
        LOGOUT
      </button>
    </div>
  )
}

export default page
