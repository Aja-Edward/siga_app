'use client'

import { useEffect, useState } from 'react'
import TeamItems from '@components/user/TeamItems'
import Spinner from '@components/Spinner'

const TeamPage = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const fetchServiceProviders = async () => {
      const response = await fetch(`/api/userlist`, { cache: 'no-store' })
      const data = await response.json()
      setData(data)
      setIsLoading(false)
    }
    fetchServiceProviders()
  }, [])

  return (
    <div>
      <h1 className='team-heading'>
        <span>meet</span>Our Team
      </h1>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px',
            color: '#fff',
          }}
        >
          {' '}
          <Spinner /> Loading service providers ...
        </div>
      ) : (
        <TeamItems data={data} isLoading={isLoading} />
      )}
    </div>
  )
}

export default TeamPage
