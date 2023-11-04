'use client'

import Link from 'next/link'
import Image from 'next/image'
import Searchbar from './Searchbar'
import { useContext, useState, useEffect } from 'react'
import CartContext from '@context/CartContext'
import AuthContext from '@context/AuthContext'
import { useSession, signIn, signOut, getProviders } from 'next-auth/react'
import AdminDropDown from '@components/AdminDropDown'
import AdminUser from '@components/AdminUser'
import UserDropDown from './UserDropDown'
import { usePathname } from 'next/navigation'
import SigaLogo from '@public/assets/images/SIGA247logowhite.svg'

const Nav = () => {
  const pathname = usePathname()
  const [providers, setProviders] = useState(null)
  const { user, setUser } = useContext(AuthContext)

  const { data } = useSession()

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setUpProviders()
    if (data) {
      setUser(data?.user)
    }
  }, [data])

  const { cart } = useContext(CartContext)
  const cartItems = cart?.cartItems

  return (
    <nav className='nav-container'>
      {pathname !== '/' && (
        <div className='logo-div'>
          <Link href={'/'}>
            <Image
              src={SigaLogo}
              alt='Siga Logo'
              width={200}
              height={200}
              style={{
                height: '70%',
                width: '100%',
                marginRight: '5px',
              }}
            />
          </Link>
        </div>
      )}
      <Link href={'/about/team/freebie'} className='freebies'>
        Take advantage of our freebies
      </Link>
      <div className='link-div'>
        {!user ? (
          <Link className='nav_link' href='/login'>
            <button className='login'>SIGN IN</button>
          </Link>
        ) : user?.role === 'admin' ? (
          <div className='admin_dropdown_div'>
            <div>
              <AdminDropDown />
            </div>
            <div>
              <AdminUser user={user} />
            </div>
          </div>
        ) : (
          <div className='user_maincontainer'>
            <div className='userandadmin_container'>
              <UserDropDown user={user} />
            </div>
          </div>
        )}
        {data?.user && user?.role !== 'admin' && (
          <div className='wishlist_link'>
            <Link
              href={
                user?.role === 'admin' ? '/wishlist' : '/wishlist/user-wishlist'
              }
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                width: '100%',
                alignItems: 'center',
              }}
            >
              <Image
                src={'/assets/icons/addtofavorite.svg'}
                width={20}
                height={20}
                alt='wish list image'
              />
              <span>
                (<b>{cartItems?.length || 0}</b>)
              </span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav
