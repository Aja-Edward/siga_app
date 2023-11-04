'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import FreebieDetail from '@components/FreebieDetail'

const FreebieDetailPage = ({ params }) => {
  const id = params.id
  const [freebie, setFreebie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFreebieDetail = async () => {
      const response = await fetch(`/api/team/serviceprovider/${id}`)
      const freebie = await response.json()
      console.log('freebie', freebie)

      setFreebie(freebie)
      setLoading(false)
    }

    fetchFreebieDetail()
  }, [id])

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto',
        }}
      >
        <Image width={100} height={100} src='/assets/images/loading.gif' />
      </div>
    )
  }
  return (
    <section>
      {loading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '1000px',
            width: '100vh',
          }}
        >
          <Image width={50} height={50} src='/assets/images/loading.gif' />
        </div>
      )}
      <FreebieDetail freebie={freebie} loading={loading} />
    </section>
  )
}

export default FreebieDetailPage
