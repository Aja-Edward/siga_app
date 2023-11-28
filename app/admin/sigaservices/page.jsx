'use client'

import axios from 'axios'
import { useState, useEffect } from 'react'
import ServiceList from '@components/servicesfolder/ServiceList'
import { useSession } from 'next-auth/react'
import { redirect, useRouter, useSearchParams } from 'next/navigation'

const ServiceListPage = () => {
    const [allSigaServices, setAllSigaServices] = useState([])
  const router = useRouter()
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login?callbackUrl=/admin/sigaservices')
    },
  })

  useEffect(() => {
    const fetchServiceLists = async () => {
      try {
        const { data } = await axios.get('/api/ourservices', {
          cache: 'no-store',
        })
        setAllSigaServices(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchServiceLists()
  }, [])

  const handleServiceUpdate = (slug) => {
    router.push(`/sigaservice/update?slug=${slug}`)

    console.log('clicked')
  }

  const handleDelete = async (slug) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this service?'
    )
   
    console.log('clicked me now', slug)
    if (hasConfirmed) {
      try {
        await axios.delete(`/api/ourservices/${slug}`)
        const updatedServices = allSigaServices.filter(
          (service) => service.slug !== slug
        )
        setAllSigaServices(updatedServices)
        alert("Service Deleted Successfully")
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <section>
      {session && (
        <ServiceList
          allSigaServices={allSigaServices}
          handleServiceUpdate={handleServiceUpdate}
          handleDelete={handleDelete}
        />
      )}
    </section>
  )
}

export default ServiceListPage
