'use client'

import Sidebar from '@components/Sidebar'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import BreadCrums from '@components/BreadCrums'
import { GiHamburgerMenu } from 'react-icons/gi'
import { TiTimes } from 'react-icons/ti'

export default function UserLayout({ children }) {
  const [openSidebar, setOpenSidebar] = useState(false)
  const pathname = usePathname()

  const breadcrums = [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: `${pathname}`,
      url: `${pathname}`,
    },
  ]

  const sidebarStyles = {
    display: openSidebar ? 'block' : '',
    transition: 'all 1.3s ease',
  }

  const showSidebarStyles = {
    display: openSidebar ? 'none' : '',
    transition: 'all 1.1s ease',
  }

  const showSidebarStylesTimes = {
    display: openSidebar ? 'block' : '',
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <BreadCrums breadcrums={breadcrums} />
      <div className='togglesibarburger-container-user'>
        <GiHamburgerMenu
          className='togglebarIcon'
          onClick={() => setOpenSidebar(!openSidebar)}
          style={showSidebarStyles}
        />
        <TiTimes
          className='toggletimesIcon'
          onClick={() => setOpenSidebar(!openSidebar)}
          style={showSidebarStylesTimes}
        />
      </div>
      <section
        className='sidebarmain-container'
        style={{ flex: '1', display: 'flex' }}
      >
        <div className='sidebar_container'>
          <Sidebar openSidebar={openSidebar} sidebarStyles={sidebarStyles} />
        </div>
        <main
          className='sidebar_elements'
          style={{ flex: '1', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}
        >
          <article>{children}</article>
        </main>
      </section>
    </div>
  )
}
