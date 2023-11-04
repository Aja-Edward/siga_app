import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const FreebieItems = ({ freebie }) => {
  console.log(freebie)
  return (
    <div className='card'>
      <Link href={`/about/team/freebie/${freebie.slug}`}>
        <Image
          src={
            freebie?.user.avatar
              ? freebie?.user.avatar.url
              : '/assets/images/SIGAguitarlesson.png'
          }
          alt={freebie.topic}
          width={200}
          height={350}
          className='product_image rounded shadow'
        />
      </Link>
      <div className='service_info'>
        <Link href={`/about/team/freebie/${freebie.slug}`}>
          <h2 className='service_title'>{freebie.topic}</h2>
        </Link>
        <Link href={`/about/team/freebie/${freebie.slug}`}>
          <button className='service_btn'>Learn more</button>
        </Link>
      </div>
    </div>
  )
}

export default FreebieItems
