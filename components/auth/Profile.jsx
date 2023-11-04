'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import AuthContext from '@context/AuthContext'
import UserAddresses from '@components/user/UserAddresses'
import { useSession } from 'next-auth/react'
import { redirect, usePathname, useRouter } from 'next/navigation'

const Profile = ({ addressData }) => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login?callbackUrl=/me')
    },
  })

  const { user, setUser, submitting, setSubmitting } = useContext(AuthContext)

  console.log(user)
  if (status === 'loading') {
    return <div>Loading...</div>
  }
  const pathName = usePathname()
  const router = useRouter()
  if (!session || status === 'unauthenticated') {
    redirect('/login')
  }

  const handleUserUpdate = () => {
    router.push(`/me/update?id=${user._id}`)
  }

  return (
    <>
      <figure className='adminprofilepage-container'>
        <div className='image-container'>
          <Image
            className='admin-avatar'
            src={
              user?.avatar
                ? user.avatar.url
                : '/assets/images/defaultavatar.jpg'
            }
            alt={user?.name}
            width={300}
            height={300}
          />
        </div>
        <figcaption>
          <h5 className='admin-name'>{user?.name}</h5>
          <p className='admin-email'>
            <b>Email:</b> {user?.email} | <br />
            <b>Joined On: </b>
            {user?.createdAt}
          </p>
          {session?.user.id ||
            (pathName === '/me' && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <p
                  style={{
                    fontFamily: 'inter',
                    padding: '20px 30px',
                    fontSize: 'small',
                    cursor: 'pointer',
                    color: 'green',
                  }}
                  onClick={handleUserUpdate}
                >
                  Edit
                </p>
              </div>
            ))}
        </figcaption>
        <hr className='my-4' />
        {addressData.map((useraddress) => (
          <div className='address-adminPage-container'>
            <UserAddresses useraddress={useraddress} user={user} />
          </div>
        ))}
      </figure>

      <Link href={'/address/new'} className='admin-address-btn-wrapper'>
        <button className='admin-address-btn'>Add new address</button>
      </Link>
      <hr className='my-4' />
    </>
  )
}

export default Profile
