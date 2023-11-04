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
              {singleUser.avatar && (
                <Image
                  src={singleUser?.avatar?.url}
                  width={50}
                  height={50}
                  style={{ borderRadius: '50%' }}
                />
              )}
            </div>
            <h3>User Info</h3>
            <li>Name: {singleUser.name}</li>
            <li>Email: {singleUser.email}</li>
            <li>Tel: {singleUser.phone}</li>
            <li>Role: {singleUser.role}</li>
            <li>Title: {singleUser.title}</li>
            <li>Description: {singleUser.description.substring(0, 100)}</li>
            <li>ID: {singleUser._id}</li>
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
