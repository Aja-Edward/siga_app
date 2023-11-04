'use client'

import Link from 'next/link'
import { useContext, useState, useRef, useEffect } from 'react'
import Image from 'next/image'

import BreadCrums from '@components/BreadCrums'

const TeamDetail = ({ team, loading }) => {
  const [expanded, setExpanded] = useState(false)
  const imgRef = useRef(null)

  const setImagePreview = (url) => {
    imgRef.current.src = url
  }

  const breadcrums = [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: `${team?.name?.substring(0, 100)}...`,
      url: `/about/team/${team._id}`,
    },
  ]

  return (
    <> 
      <BreadCrums breadcrums={breadcrums} />
      <section className='sigaservice_container'>
        <div className='backtoservice_link_container'>
          <Link href='/' className='backtoservice_link'></Link>
        </div>
        <div className='single_service_image_container'>
          <aside>
            <div className='single_service_image'>
              <Image
                ref={imgRef}
                src={team?.avatar ? team?.avatar.url : ''}
                alt={team.avatar}
                width='650'
                height='430'
                className='mysingle_image'
              />
            </div>
            <div className='single_small_service_image'>
              {team?.images?.map((img) => (
                <a onClick={() => setImagePreview(img?.url)}>
                  <Image
                    src={img.url}
                    alt={service.name}
                    width='40'
                    height='40'
                    className='mysingle_small_image'
                  />
                </a>
              ))}
            </div>
          </aside>
          <div className='servicedetail_description_container'>
            <ul>
              <li>
                <h1>{team.name} </h1>
              </li>
              <li> {team.title}</li>
              ***************************************
              <li className='description-text'>
                {expanded
                  ? team.description
                  : team.description.substring(0, 600)}
                ...
                {team.description.length > 500 && (
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => setExpanded(!expanded)}
                  >
                    {expanded ? 'Show less' : 'Show more'}
                  </span>
                )}
              </li>
            </ul>
            <div className='calltoaction_btn_container'>
              <Link href={'/me/message'}>
                <button className='action_btn'>Contact Us</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default TeamDetail
