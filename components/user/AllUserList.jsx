import Link from 'next/link'
import { useContext } from 'react'
import AuthContext from '@context/AuthContext'
import { useSession } from 'next-auth/react'
import UserDetail from '@components/user/UserDetail'
import Image from 'next/image'
import guitaman from '@public/assets/images/guitaman.jpg'
import UserInfoLoading from '@public/assets/images/loading.gif'

const AllUserList = ({
  allUsers,
  deleteData,
  name,
  singleUserAddress,
  handleEdit,
  addressData,
  singleUserInfo,
  userId,
  description,
  handleUserUpdate,
  handleDelete,
}) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login?callbackUrl=/me')
    },
  })
  const { user, loading } = useContext(AuthContext)

  return (
    <section className='userlist_container'>
      <div className='userlist_heading'>
        <Link href={'/'}>GO HOME</Link>
        <div className='singleuserlist'>
          <h1>Users' List</h1>
        </div>
        <Link href={'/register'}>
          <button>Register User</button>
        </Link>
      </div>
      <div
        style={{
          backgroundImage: `url(${guitaman.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundFit: 'fit',
          backgroundPosition: 'center',
        }}
      >
        <div className='singleuserimage'>
          <Image
            style={{ borderRadius: '50%' }}
            src={
              user?.avatar
                ? user.avatar.url
                : '/assets/images/SIGA247logowhite.svg'
            }
            width={100}
            height={100}
            alt={user?.name}
          />
        </div>
      </div>
      {loading && (
        <div>
          <Image
            src={UserInfoLoading}
            width={100}
            height={100}
            alt='loading image'
          />
        </div>
      )}

      {session && (
        <div className='singleuserinfo'>
          <UserDetail
            addressData={addressData}
            allUsers={allUsers}
            singleUserInfo={singleUserInfo}
            handleUserUpdate={handleUserUpdate}
            description={description}
            singleUserAddress={singleUserAddress}
            handleEdit={() => handleEdit && handleEdit(singleUserAddress)}
            handleDelete={() => handleDelete && handleDelete(singleUserAddress)}
          />
        </div>
      )}
    </section>
  )
}

export default AllUserList
