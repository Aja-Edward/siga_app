import OurTeam from '@components/user/OurTeam'
import Spinner from '@components/Spinner'

const TeamItems = ({ data, isLoading }) => {
  return (
    <section className='team-container' style={{}}>
      {data?.map((team) => (
        <>
          <OurTeam key={team._data} team={team} isLoading={isLoading} />
        </>
      ))}
    </section>
  )
}

export default TeamItems
