'use client'

import Link from 'next/link'

import { useState, useRef, useEffect } from 'react'
import BreadCrums from '@components/BreadCrums'

const FreebieDetail = ({ freebie }) => {
  //   const service = data.find((x) => x.slug === slug)

  const breadcrums = [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: `${freebie?.topic?.substring(0, 100)}...`,
      url: `/about/team/freebie/${freebie.slug}`,
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
          <div className='servicedetail_description_container'>
            <div className='freebie-title'>
              <h1>{freebie?.topic} </h1>
            </div>
            <div className='freebie-description-body'>
              <h3>{freebie?.fsubtopic} </h3>
              <p>{freebie?.firstdescription} </p>
              <h3>{freebie?.ssubtopic}</h3>
              <p>{freebie?.seconddescription}</p>
              <h3> {freebie.tsubtopic}</h3>
              <p>{freebie.thirddescription}</p>
            </div>

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

export default FreebieDetail
