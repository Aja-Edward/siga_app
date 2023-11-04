'use client'

import axios from 'axios'
import { useState, useEffect } from 'react'
import OurFreebieList from '@components/OurFreebieList'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

const OurFreebieListPage = () => {
  const [allFreebies, setAllFreebies] = useState([])
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    const fetchFreebieLists = async () => {
      try {
        const { data } = await axios.get('/api/team/serviceprovider')
        setAllFreebies(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchFreebieLists()
  }, [])

  const handleFreebieUpdate = (slug) => {
    router.push(`/admin/freebielistpage/freebie_update?slug=${slug}`)

    console.log('clicked')
  }

  const handleFreebieDelete = async (slug) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this free music lesson?'
    )

    console.log('clicked me now', slug)
    if (hasConfirmed) {
      try {
        await axios.delete(`/api/team/serviceprovider/${slug}`)
        const updatedFreebie = allFreebies?.filter(
          (freebie) => freebie.slug !== slug
        )
        setAllFreebies(updatedFreebie)
        alert('Freebie deleted successfully')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <section>
      {session && (
        <div>
          <OurFreebieList
            allFreebies={allFreebies}
            handleFreebieUpdate={handleFreebieUpdate}
            handleFreebieDelete={handleFreebieDelete}
          />
        </div>
      )}
    </section>
  )
}

export default OurFreebieListPage
