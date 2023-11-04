'use client'

import { useState, useEffect, useRef } from 'react'
import { Aclonica } from 'next/font/google'

import Image from 'next/image'
import Link from 'next/link'
import Searchbar from '@components/Searchbar'
import { FaLongArrowAltDown } from 'react-icons/fa'
import Listservices from '@components/servicesfolder/Listservices'
import HomescreenSideBar from '@components/HomescreenSideBar'
import SigaLogo from '@public/assets/images/SIGA247logowhite.svg'
import Loader from '@public/assets/icons/loader.svg'
import AudioPlayer from '@components/Audiocontent/AudioPlayer'
// import audiosource from '@public/assets/audio/christiansongs/chiomaandmercyokemmuo.mp3'
import { BsTelephone } from 'react-icons/bs'
import { GiArchiveRegister } from 'react-icons/gi'

import { useSession } from 'next-auth/react'

const aclonica = Aclonica({
  weight: ['400'],
  subsets: ['latin'],
})

const Homepage = () => {
  const serviceListRef = useRef(null)
  const { data: session } = useSession()
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch(`/api/ourservices`)
      const data = await response.json()
      setData(data)
      setIsLoading(false)
    }
    fetchServices()
  }, [])

  console.log(data)

  return (
    <section className='homepage'>
      <div className='mysearchbarpositiondiv'>
        <Searchbar getSearchResults={(results) => setData(results)} />
      </div>
      <div className='banner_container'>
        <div className='homescreensidebar-container'>
          <HomescreenSideBar />
        </div>

        <div className='image-container'>
          <Image
            src='/assets/images/banner.png'
            alt='banner display'
            width={500}
            height={500}
          />
        </div>
        <div className='text-container'>
          <h1>
            <Image
              src={SigaLogo}
              alt='Siga Logo'
              width={100}
              height={100}
              style={{
                width: '70%',
                height: '85%',
                marginBottom: '1rem',
              }}
            />
          </h1>
          <p
            // className={aclonica.className}
            style={{
              color: '#777777',
              fontSize: '1rem',
              fontWeight: 400,
              lineHeight: '1.5rem',
            }}
          >
            Discover the harmony of your dreams at our music event performance &
            instrument tutoring services. Unleash your inner maestro with expert
            guidance and captivating performances. Join us for an unforgettable
            musical journey today!...
          </p>

          <div className='homepage_btn_wrapper'>
            {!session?.user ? (
              <Link href={`/register`}>
                <button
                  className='homepage_action_registerbtn'
                  style={{ cursor: 'pointer' }}
                >
                  <span>Register</span> <GiArchiveRegister />
                </button>
              </Link>
            ) : (
              <Link href={``}>
                <button
                  style={{ cursor: 'pointer' }}
                  className='homepage_action_registerbtn'
                  onClick={() => {
                    if (serviceListRef.current) {
                      serviceListRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      })
                    }
                  }}
                >
                  <span>Service</span> <FaLongArrowAltDown />
                </button>
              </Link>
            )}

            <Link href={'/me/message'}>
              <button
                className='homepage_action_searchbtn'
                style={{ cursor: 'pointer' }}
              >
                {/* Spinner */} <span>Contact </span>
                <BsTelephone style={{ color: '#ffffff', fontWeight: 800 }} />
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className='audio-container'>
        <AudioPlayer />
      </div>
      <p className='boundary' style={{ textAlign: 'center' }}>
        {isLoading ? 'loading wait...' : 'Service loaded'}
      </p>
      {isLoading ? (
        <div
          style={{ margin: '0 auto', display: 'flex', justifyCotent: 'center' }}
        >
          <Image
            src={Loader}
            width={100}
            height={100}
            alt={'siga service loader'}
          />
        </div>
      ) : (
        <div className='sigaserviceitem_container' ref={serviceListRef}>
          <Listservices key={data._id} data={data} />
        </div>
      )}
    </section>
  )
}

export default Homepage
