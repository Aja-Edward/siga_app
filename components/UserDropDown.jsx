import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { Fragment } from 'react'
import Image from 'next/image'

export default function UserDropDown() {
  // const { user } = useContext(AuthContext)
  const { data: session } = useSession()
  console.log(session?.user)
  const logoutHandler = () => {
    signOut()
  }
  return (
    <div className='userdropdown_top_container' style={{ zIndex: 10 }}>
      <Menu as='div' className='topcontainer_user_wrapper'>
        <div className='userimage_name_wrapper'>
          <Menu.Button className='admindropdown-btn'>
            <Image
              style={{ borderRadius: '50%' }}
              src={
                session?.user
                  ? session?.user?.avatar?.url
                  : '/assets/images/defaultimage.png'
              }
              height={30}
              width={30}
              alt='user image'
            />
            <div className='session-user-name'>
              {session?.user && session?.user?.name}
            </div>
            {/* {session?.user && session?.user?.name.substring(0, 9)} */}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='dropdown-element'>
            <div className='dropdown-element-wrapper '>
              <Menu.Item>
                <Link href={'/me'} className='dropdown-element-btn'>
                  <Image
                    style={{ borderRadius: '50%' }}
                    src={
                      session?.user
                        ? session?.user?.avatar?.url
                        : '/assets/images/defaultimage.png'
                    }
                    height={30}
                    width={30}
                    alt='user image'
                  />
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href={'/me/userprofilepage'}>
                  <button className='dropdown-element-btn'>Profile</button>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <button
                  className='dropdown-element-btn'
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
