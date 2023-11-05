import React from 'react'
import { IoLocationOutline } from 'react-icons/io5'
import { MdOutlineMailOutline } from 'react-icons/md'
import { BsTelephone } from 'react-icons/bs'

const ContactInfo = () => {
  return (
    <div className='contactinfocontainer'>
      <div className='contactinfo'>
        <div className='box'>
          <div className='icon'>
            <IoLocationOutline />
          </div>
          <div className='text'>
            <h3>Office:</h3>
            <p>
              65B Chief Idowu Rufai Avenue, Ago Palace way, Lagos
            </p>
          </div>
        </div>
        <div className='box'>
          <div className='icon'>
            <MdOutlineMailOutline />
          </div>
          <div className='text'>
            <h3>Email:</h3>
            <p>siga247service@gmail.com</p>
          </div>
        </div>
        <div className='box'>
          <div className='icon'>
            <BsTelephone />
          </div>
          <div className='text'>
            <h3>Phone no: </h3>
            <p>(+234) 80 637 70187</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactInfo
