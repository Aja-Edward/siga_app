'use client'

import { useState, useEffect } from 'react'
import TeamDetail from '@components/user/TeamDetails'
import Image from 'next/image'
import Spinner from '@components/Spinner'

const TeamDetailPage = ({ params }) => {
  const id = params.id

  const [team, setTeam] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTeamDetails = async () => {
      const response = await fetch(`/api/users/${id}`)
      const team = await response.json()
      console.log('Service from where to get Team', team)
      setTeam(team)
      setLoading(false)
    }
    fetchTeamDetails()
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
    <div>
     

      <TeamDetail team={team} loading={loading} />
    </div>
  )
}

export default TeamDetailPage
