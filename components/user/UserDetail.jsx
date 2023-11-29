import { EditUserIcons } from '@components/Icons'
import Image from 'next/image'

const UserDetail = ({
  allUsers,
  addressData,
  singleUserInfo,
  description,
  handleUserUpdate,
  //   handleUserDelete,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className='singleuserinfo'>
      {allUsers.map((singleUser, index) => (
        <div className='singleuserdetails' key={singleUser._id}>
          <ul>
            <div className='image_container'>
              <Image
                src={
                  singleUser?.avatar
                    ? singleUser.avatar.url
                    : '/assets/images/defaultavatar.jpg'
                }
                width={50}
                height={50}
                style={{ borderRadius: '50%' }}
              />
            </div>
            <h3>User Info</h3>
            <li>Name: {singleUser.name.substring(0, 20)}</li>
            <li>Email: {singleUser.email.substring(0, 20)}</li>
            <li>Tel: {singleUser.phone}</li>
            <li>Role: {singleUser.role.substring(0, 20)}</li>
            <li>Title: {singleUser.title.substring(0, 20)}</li>
            <li>Description: {singleUser.description.substring(0, 20)}</li>
            <li>ID: {singleUser._id.substring(0, 20)}</li>
            <p
              style={{
                fontFamily: 'inter',
                padding: '20px 30px',

                fontSize: 'small',
                cursor: 'pointer',

                color: 'green',
              }}
              className='editicons'
            >
              <EditUserIcons
                backgroundColor=''
                handleUserUpdate={() =>
                  handleUserUpdate && handleUserUpdate(singleUser._id)
                }
              />
            </p>
          </ul>

          {addressData[index] && (
            <div className='addressdetail'>
              <hr />
              <ul>
                <h4>Address:</h4>
                <li>Street: {addressData[index].street}</li>
                <li>City: {addressData[index].city}</li>
                <li>Country: {addressData[index].country}</li>
                <li>ZipCode: {addressData[index].zipCode}</li>
                <h3>Contact Person's Number</h3>
                <li>Tel: {addressData[index].phoneNo}</li>
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default UserDetail
