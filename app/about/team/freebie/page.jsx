'use client'

import { useState, useEffect, useRef } from 'react'
import FreebieList from '@components/FreebieList'
import Spinner from '@components/Spinner'

const OurFreebiePage = () => {
  const freebieListRef = useRef(null)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFreebies = async () => {
      const response = await fetch('/api/team/serviceprovider')
      const data = await response.json()
      setData(data)
      setIsLoading(false)
    }
    fetchFreebies()
  }, [])
  console.log(data)
  return (
    <section className='homepage'>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '1000px',
            width: '100vh',
          }}
        >
          <Spinner /> Loading Please Wait...
        </div>
      ) : (
        <div className='sigaserviceitem_container' ref={freebieListRef}>
          <FreebieList data={data} />
        </div>
      )}
    </section>
  )
}

export default OurFreebiePage
