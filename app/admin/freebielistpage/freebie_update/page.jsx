'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter, redirect } from 'next/navigation'
import EditFreebieForm from '@components/EditFreebieForm'

const EditFreebiePage = () => {
  const searchParams = useSearchParams()
  const freebieSlug = searchParams.get('slug')
  const router = useRouter()

  const [submitting, setSubmitting] = useState(false)
  const [freebie, setFreebie] = useState({
    topic: '',
    slug: '',
    fsubtopic: '',
    firstdescription: '',
    ssubtopic: '',
    seconddescription: '',
    tsubtopic: '',
    thirddescription: '',
  })

  const updateFreebie = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    if (!freebieSlug) return alert('Free lesson ID not Found!')

    try {
      const response = await fetch(`/api/team/serviceprovider/${freebieSlug}`, {
        method: 'PATCH',
        body: JSON.stringify({
          topic: freebie.topic,
          slug: freebie.slug,
          fsubtopic: freebie.fsubtopic,
          firstdescription: freebie.firstdescription,
          ssubtopic: freebie.ssubtopic,
          seconddescription: freebie.seconddescription,
          tsubtopic: freebie.tsubtopic,
          thirddescription: freebie.thirddescription,
        }),
      })

      console.log('Response:', response)

      if (response.ok) {
        alert('Freebie updated successfully!')
        router.push('/about/team/freebie')
      }
    } catch (error) {
      console.log(error)
      console.error('Error:', error)
      console.error('Error Stack:', error.stack)
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    const getFreebieDetail = async () => {
      const response = await fetch(`/api/team/serviceprovider/${freebieSlug}`, {
        cache: 'no-store',
      })
      const data = await response.json()

      setFreebie({
        topic: data.topic,
        slug: data.slug,
        fsubtopic: data.fsubtopic,
        firstdescription: data.firstdescription,
        ssubtopic: data.ssubtopic,
        seconddescription: data.seconddescription,
        tsubtopic: data.tsubtopic,
        thirddescription: data.thirddescription,
      })
    }
    getFreebieDetail()
  }, [freebieSlug])

  return (
    <div>
      <EditFreebieForm
        type='Edit'
        freebie={freebie}
        setFreebie={setFreebie}
        handleSubmit={updateFreebie}
        submitting={submitting}
        setSubmitting={setSubmitting}
      />
    </div>
  )
}

export default EditFreebiePage
