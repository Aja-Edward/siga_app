'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import AuthContext from '@context/AuthContext'
import UserAddresses from '@components/user/UserAddresses'
import UserInfo from '@components/user/UserInfo'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Spinner from '@components/Spinner'

const UserProfile = ({
  name,
  singleUserAddress,
  handleEdit,
  handleDelete,
  singleUserInfo,
  description,
  handleUserUpdate,
  handleUserDelete,
}) => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login?callbackUrl=/me')
    },
  })
  const { updateUser } = useContext(AuthContext)

  if (status === 'loading') {
    return (
      <div>
        <Spinner />
        Loading...
      </div>
    )
  }

  if (!session || status === 'unauthenticated') {
    redirect('/login')
  }

  return (
    <>
      <section
        className='userprofile-container'
        style={{
          backgroundColor: '#ffffff',
          paddingBottom: '2.5rem',
          paddingTop: '1rem',
          boxShadow: '1px 1px 6px 1px #ccc',
          marginRight: '20px',
          '@media (max-width: 768px)': {
            backgroundColor: '#f0f0f0',
            marginRight: '0',
          },
        }}
      >
        <h1
          style={{
            fontSize: '40px',
            fontWeight: 'bold',
            textAlign: 'center',
            height: 'fit-content',
            color: 'rgb(20, 24, 42)',
          }}
        >
          PROFILE
        </h1>

        <UserInfo
          singleUserInfo={singleUserInfo}
          handleUserUpdate={() =>
            handleUserUpdate && handleUserUpdate(singleUserInfo)
          }
          handleUserDelete={() =>
            handleUserDelete && handleUserDelete(singleUserInfo)
          }
          description={description}
        />
        <div className='address-section-container'>
          {singleUserAddress.map((useraddress) => (
            <UserAddresses
              key={useraddress._id}
              useraddress={useraddress}
              handleEdit={() => handleEdit && handleEdit(useraddress)}
              handleDelete={() => handleDelete && handleDelete(useraddress)}
            />
          ))}
        </div>

        <Link href={'/address/new'}>
          <button className='add_address_button'>Add new address</button>
        </Link>
      </section>
    </>
  )
}

export default UserProfile
