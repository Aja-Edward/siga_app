'use client'

import { useState } from 'react'
import { BiChevronLeft } from 'react-icons/bi'
import SidebarData from './SidebarData'
import SigaLogo from '@public/assets/icons/SIGAlogo.svg'
import Image from 'next/image'
import { GiHamburgerMenu } from 'react-icons/gi'
import { TiTimes } from 'react-icons/ti'

const HomescreenSideBar = () => {
  const [toggle, setToggle] = useState(false)
  const [openSidebar, setOpenSidebar] = useState(false)

  const sidebarStyles = {
    width: toggle ? '15rem' : '5.8rem',
    display: openSidebar ? 'block' : '',
    transition: 'all 0.3s ease',
  }
  const sidebarIconStyles = {
    transform: toggle ? 'rotateY(180deg)' : 'rotateY(0)',
    transition: 'all 0.3s ease',
  }

  const showSidebarStyles = {
    display: openSidebar ? 'none' : '',
    transition: 'all 0.2s ease',
  }

  const showSidebarStylesTimes = {
    display: openSidebar ? 'block' : '',
  }

  return (
    <>
      <div className='toggleburger-container'>
        <GiHamburgerMenu
          className='togglebar'
          onClick={() => setOpenSidebar(!openSidebar)}
          style={showSidebarStyles}
        />
        <TiTimes
          className='toggletimes'
          onClick={() => setOpenSidebar(!openSidebar)}
          style={showSidebarStylesTimes}
        />
      </div>
      <div
        className='homesidebar-container'
        style={sidebarStyles}
        data-toggle={toggle ? 'true' : 'false'}
      >
        <div
          className='homeSidebarToggleIcon'
          onClick={() => {
            setToggle(!toggle)
          }}
        >
          <BiChevronLeft
            style={sidebarIconStyles}
            data-toggle={toggle ? 'true' : 'false'}
            className={`bichevronleft ${toggle ? 'flipped' : ''}`}
          />
        </div>
        <SidebarData toggle={toggle} />
      </div>
    </>
  )
}

export default HomescreenSideBar
