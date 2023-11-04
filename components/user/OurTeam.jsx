import Image from 'next/image'
import Kpalap from '@public/assets/images/joy.png'
import Link from 'next/link'
import Spinner from '@components/Spinner'

const OurTeam = ({ team, isLoading }) => {
  console.log(team)
  
  return (
    <>
      {team?.role === 'service provider' ? (
        <div className='team-profiles'>
          <div className='team-profile'>
            <Link href={`/about/team/${team._id}`}>
              <Image
                src={team.avatar ? team?.avatar?.url : Kpalap}
                height={200}
                width={200}
                alt={''}
                className='team-profime-img'
              />
            </Link>
            <h3 className='team-profile-username'>{team?.name}</h3>
            <h5>{team.title}</h5>

            <p>
              {' '}
              {team.description.substring(0, 100)}...
              <Link href={`/about/team/${team._id}`}> Learn more...</Link>
            </p>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default OurTeam
