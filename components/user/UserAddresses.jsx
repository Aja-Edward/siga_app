'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

const UserAddresses = ({ useraddress, handleDelete, handleEdit, params }) => {
  console.log(params)
  const pathName = usePathname()

  const { data: session } = useSession()

  console.log('Pathname', pathName)
  console.log('sessionData', session)

  const [copied, setCopied] = useState()

  if (!useraddress) {
    return <div>There is no address for this user</div>
  }
  const addressToCopy = `${useraddress.street}, ${useraddress.city}, ${useraddress.state}, ${useraddress.zipCode}, ${useraddress.country}, Phone no: ${useraddress.phoneNo}`

  const handleCopy = () => {
    navigator.clipboard.writeText(addressToCopy)
    setCopied(true)

    // Reset copied state after 3 seconds
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div className='address-container'>
      <figure className='address-container-wrapper'>
        <figcaption className='address-card'>
          <span className='address-user'>
            <Image
              src={'/assets/icons/location.svg'}
              width={40}
              height={40}
              alt='user_image'
              style={{ color: '#fff' }}
            />
          </span>
          <div className='address-user-info'>
            <p className='address-details '>
              {useraddress.street} <br /> {useraddress.city},{' '}
              {useraddress.state}, {useraddress.zipCode}, {useraddress.country}
              <br />
              Phone no: {useraddress.phoneNo}
              <h3> {useraddress?.user?.name}</h3>
              <h3>Role: {useraddress?.user?.role}</h3>
            </p>
            <div
              className=''
              onClick={() => {
                handleCopy()
              }}
            >
              <Image
                src={
                  copied ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'
                }
                width={18}
                height={18}
                className='copy-button copy-success-icon'
              />
            </div>
          </div>
          {session?.user?.id === useraddress?.user?.id &&
            pathName === '/me/userprofilepage' && (
              <div className='user-actions'>
                {' '}
                <p className='user-action' onClick={handleEdit}>
                  Edit
                </p>
                <p className='user-action-delete' onClick={handleDelete}>
                  Delete
                </p>
              </div>
            )}
        </figcaption>
      </figure>
    </div>
  )
}

export default UserAddresses
