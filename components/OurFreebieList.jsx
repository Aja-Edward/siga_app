'use client'

import Link from 'next/link'
import { DeleteFreebieIcons, EditFreebieIcons } from '@components/Icons'
import { useRouter } from 'next/navigation'

const OurFreebieList = ({
  allFreebies,
  handleFreebieUpdate,
  handleFreebieDelete,
}) => {
  const router = useRouter()
  console.log(allFreebies)
  return (
    <section className='servicelist_container'>
      <div className='servicelist_heading'>
        <Link href={'/'}>GO HOME</Link>
        <div>
          <h1>Free Lessons</h1>
        </div>
        <Link href={'/about/team/freebie/new'}>
          <button>Create Service +</button>
        </Link>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>PROVIDER</th>
              <th>TOPIC</th>
              <th>SLUG</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allFreebies.map((allFreebie) => {
              const freebieSlugToDelete = allFreebie.slug
              return (
                <tr key={allFreebie?._id}>
                  <td>{allFreebie.user.name}</td> <td>{allFreebie.topic}</td>
                  <td>{allFreebie.slug}</td>
                  <td className='edit-icon-container'>
                    <EditFreebieIcons
                      className='editicons'
                      handleFreebieUpdate={() =>
                        handleFreebieUpdate &&
                        handleFreebieUpdate(allFreebie.slug)
                      }
                    />{' '}
                  </td>
                  <td className='delete-icon-container'>
                    <DeleteFreebieIcons
                      className='trashicon'
                      handleFreebieDelete={() =>
                        handleFreebieDelete &&
                        handleFreebieDelete(freebieSlugToDelete)
                      }
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default OurFreebieList
