'use client'

import React from 'react'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import SigaLogo from '@public/assets/images/SIGA247logowhite.svg'
import { FiLogOut } from 'react-icons/fi'

import { datas } from './Data'

import Link from 'next/link'

const SidebarData = ({ toggle }) => {
  const router = useRouter()
  const logoutHandler = async () => {
    await signOut()
    router.push('/login')
  }
  const { data: session, status } = useSession()

  console.log(session)

  const sidebarStyles = {
    backgroundColor: toggle ? 'transparent' : '',
    transition: 'all 2.3s ease',
  }
  const sidebarIconStyles = {
    display: toggle ? 'block' : '',
    transition: 'all 2.3s ease',
  }

  return (
    <>
      <div
        className='sidebarDatacontainer'
        style={sidebarStyles}
        data-toggle={toggle ? 'true' : 'false'}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '3.5rem',
            minHeight: '3.5rem',
            padding: '3px',
            borderRadius: '50%',
            backgroundColor: 'none',
          }}
        >
          <Image
            src={SigaLogo}
            alt='Siga Logo'
            width={100}
            height={100}
            style={{
              width: '90%',
              height: '90%',
            }}
          />
        </div>
      </div>
      <div>
        {datas.map((data) => {
          return (
            <div className='datamaincontainer'>
              <div
                key={data.id}
                className={`${
                  data.id === 1 ? 'active' : 'sidebarData-container'
                }`}
              >
                <Link href={data.url} className='sidebarData-container-link'>
                  <span className='sibarData-icon'>{data.icon} </span>
                  <span
                    className='sidebarData-text'
                    style={sidebarIconStyles}
                    data-toggle={toggle ? 'true' : 'false'}
                  >
                    {data.text}
                  </span>
                </Link>
              </div>
            </div>
          )
        })}
        <button
          className='sidebarData-container-link sidebarData-logout-btn'
          onClick={logoutHandler}
        >
          <span className='sibarData-icon'>
            <FiLogOut />
          </span>
          <span
            className='sidebarData-text'
            style={sidebarIconStyles}
            data-toggle={toggle ? 'true' : 'false'}
          >
            Logout
          </span>
        </button>
      </div>
    </>
  )
}

export default SidebarData
