'use client'

import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useContext, useState } from 'react'
import AuthContext from '@context/AuthContext'
import Image from 'next/image'

const UserInfo = ({
  singleUserInfo,
  description,
  handleUserUpdate,
  handleUserDelete,
}) => {
  const [expanded, setExpanded] = useState(false)

  const { user } = useContext(AuthContext)

  // const { updateUser } = useContext(AuthContext)
  const pathName = usePathname()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login?callbackUrl=/me/userprofilepage')
    },
  })

  return (
    <section className='user-info-container'>
      <figure className='section_figure'>
        <div className='user-avatar'>
          <Image
            className='user-avatar-img'
            src={
              user?.avatar ? user.avatar.url : '/assets/images/defaultimage.png'
            }
            alt={user?.name}
            width={260}
            height={260}
          />
        </div>
        <figcaption className='user-details'>
          <h5 className='user-name' style={{ marginBottom: '0.5rem' }}>
            {user?.name}
          </h5>
          <p className='user-email' style={{ marginBottom: '0.7rem' }}>
            <b style={{ marginBottom: '0.5rem' }}>Email:</b> {user?.email} |
            <br />
            <b>Joined On: </b>
            {user?.createdAt.substring(0, 16)}
          </p>
          <h3 className='usertitle'>{user?.title}</h3>
          <p className='user-description'>
            {expanded
              ? user?.description
              : user?.description?.substring(0, 600)}

            {user?.description && user?.description.length > 600 && (
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? 'Show less' : 'Show more'}
              </span>
            )}
          </p>

          <h1 className='user-role'>Role: {user?.role}</h1>

          <p className='user-description'>{description}</p>
          {session?.user.id ||
            (pathName === '/me/userprofilepage' && (
              <div className='user-actions'>
                {' '}
                <p className='user-action' onClick={handleUserUpdate}>
                  Edit
                </p>
                <p className='user-action-delete' onClick={handleUserDelete}>
                  Delete
                </p>
              </div>
            ))}
        </figcaption>
      </figure>
    </section>
  )
}

export default UserInfo
