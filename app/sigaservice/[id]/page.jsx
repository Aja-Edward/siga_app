'use client'

import React, { useEffect, useState } from 'react'
import ServiceDetail from '@components/servicesfolder/ServiceDetail'
import ReviewServiceForm from '@components/user/ReviewServiceForm'
import Image from 'next/image'

const ServiceDetailPage = ({ params }) => {
  const id = params.id
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServiceDetails = async () => {
      const response = await fetch(`/api/ourservices/${id}`, {
        cache: 'no-store',
      })
      const service = await response.json()
      console.log('service', service)

      setService(service)
      setLoading(false)
    }

    fetchServiceDetails()
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
        <div>
          <Image width={50} height={50} src='/assets/images/loading.gif' />
        </div>
      )}
      <ServiceDetail service={service} loading={loading} />
      <ReviewServiceForm service={service} />
    </section>
  )
}

export default ServiceDetailPage
