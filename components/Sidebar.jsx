'use client'

import Link from 'next/link'
import { useSession, signIn, getProviders } from 'next-auth/react'
import { useContext, useState, useEffect } from 'react'
import AuthContext from '@context/AuthContext'
import Image from 'next/image'
import Spinner from './Spinner'
import loadingImg from '@public/assets/images/loading.gif'
import { signOut } from 'next-auth/react'

const Sidebar = ({ openSidebar, sidebarStyles }) => {
  const [providers, setProviders] = useState(null)
  const { user, setUser } = useContext(AuthContext)

  const { data } = useSession()

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response)
      console.log(response)
    }
    setUpProviders()
    if (data) {
      setUser(data?.user)
    }
  }, [data])

  const logoutHandler = () => {
    signOut()
  }

  return (
    <aside
      className='main_sidebar_component'
      style={sidebarStyles}
      data-toggle={openSidebar ? 'true' : 'false'}
    >
      {data?.user ? (
        <div
          style={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 100,
            color: '#ffffff',
          }}
        >
          <h1>Welcome</h1>
          <h3>{user?.name}</h3>

          <div className='sidebar-container'>
            <hr />
            {user?.role === 'admin' ? (
              <>
                <span>
                  <Link
                    href='/admin/sigaservices/new'
                    className='sidebar_service_link'
                  >
                    New Service
                    <span style={{ color: 'red', fontWeight: 500 }}>
                      (Admin)
                    </span>
                  </Link>
                </span>

                <span>
                  {' '}
                  <Link
                    href='/admin/sigaservices'
                    className='sidebar_service_link'
                  >
                    All Services{' '}
                    <span style={{ color: 'red', fontWeight: 500 }}>
                      (Admin)
                    </span>
                  </Link>
                </span>

                <span>
                  {' '}
                  <Link
                    href='/admin/wishlists'
                    className='sidebar_service_link'
                  >
                    All Wishes{' '}
                    <span style={{ color: 'red', fontWeight: 500 }}>
                      (Admin)
                    </span>
                  </Link>
                </span>

                <span>
                  {' '}
                  <Link href='/admin/users' className='sidebar_service_link'>
                    All Users{' '}
                    <span style={{ color: 'red', fontWeight: 500 }}>
                      (Admin)
                    </span>
                  </Link>
                </span>

                <hr />
                <span>
                  {' '}
                  <Link
                    href='/me/userprofilepage'
                    className='sidebar_service_link'
                  >
                    Your Profile
                  </Link>
                </span>
                <span>
                  {' '}
                  <Link href='/me/orders' className='sidebar_service_link'>
                    Wish List
                  </Link>
                </span>
                <span>
                  {' '}
                  <Link
                    href={user && `/me/update?id=${user.id}`}
                    className='sidebar_service_link'
                  >
                    Update Profile
                  </Link>
                </span>

                <span>
                  {' '}
                  <Link
                    href='/me/update_password'
                    className='sidebar_service_link'
                  >
                    Update Password
                  </Link>
                </span>
              </>
            ) : (
              <>
                <span>
                  {' '}
                  <Link
                    href='/me/userprofilepage'
                    className='sidebar_service_link'
                    style={{ border: '2px solid #3bc8e6' }}
                  >
                    Your Profile
                  </Link>
                </span>
                <span>
                  {' '}
                  <Link href='/wishlist' className='sidebar_service_link'>
                    Wish List
                  </Link>
                </span>
                <span>
                  {' '}
                  <Link href={`/me/update`} className='sidebar_service_link'>
                    Update Profile
                  </Link>
                </span>
                <span>
                  {user?.role === 'service provider' && (
                    <Link
                      href={user && `/about/team/update_team`}
                      className='sidebar_service_link'
                      style={{ color: 'greenyellow' }}
                    >
                      Team Update
                    </Link>
                  )}
                  <Link
                    href='/me/update_password'
                    className='sidebar_service_link'
                  >
                    Update Password
                  </Link>
                </span>
              </>
            )}

            <span style={{ listStyle: 'none' }}>
              {' '}
              <button
                className='sidebar-list-btn'
                style={{}}
                onClick={logoutHandler}
              >
                Logout
              </button>
            </span>
          </div>
        </div>
      ) : (
        <div style={{ height: '300px' }}>
          <Spinner />
          Waiting for you to login to show this content
        </div>
      )}
    </aside>
  )
}

export default Sidebar
