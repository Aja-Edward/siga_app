'use client'

import { useContext, useState } from 'react'
import Sidebar from '@components/Sidebar'
import Link from 'next/link'
import { countries } from 'countries-list'
import AuthContext from '@context/AuthContext'
import Image from 'next/image'
import addressImage from '@public/assets/images/register_img.png'

const AddressForm = ({ type }) => {
  const {
    error,
    addNewAddress,
    clearError,
    address,
    setAddress,
    submitting,
    setSubmitting,
    countriesList,
  } = useContext(AuthContext)

  const submitHandler = (e) => {
    e.preventDefault()
    const newAddress = {
      address,
    }
    addNewAddress(newAddress)
  }

  return (
    <>
      <section className='addressform-section'>
        <div className='addressform-container'>
          <div className='addressform-wrapper'>
            {/* <Sidebar /> */}
            <Image
              src={addressImage}
              alt='user address'
              width={100}
              height={100}
            />
            <main className='addressform-main-wrapper'>
              <div
                style={{ maxWidth: '480px' }}
                className='addressform-div-wrapper'
              >
                <form onSubmit={submitHandler}>
                  <h2 className='addressform-title'>{type} Address</h2>

                  <div className='addressform-label-container'>
                    <label
                      style={{
                        display: 'block',
                        marginBottom: '4px',
                        marginTop: '5px',
                      }}
                    >
                      Street
                      <span style={{ color: 'red', fontSize: '1rem' }}>*</span>
                    </label>
                    <input
                      className='addressform-input'
                      type='text'
                      placeholder='Type your address'
                      value={address.street}
                      onChange={(e) =>
                        setAddress({ ...address, street: e.target.value })
                      }
                    />
                  </div>

                  <div className='grid md:grid-cols-2 gap-x-3'>
                    <div className='mb-4 md:col-span-1'>
                      <label
                        style={{
                          display: 'block',
                          marginBottom: '4px',
                          marginTop: '5px',
                        }}
                      >
                        City
                        <span style={{ color: 'red', fontSize: '1rem' }}>
                          *
                        </span>
                      </label>
                      <input
                        className='addressform-input'
                        type='text'
                        placeholder='Type your city'
                        value={address.city}
                        // onChange={(e) => setCity(e.target.value)}
                        onChange={(e) =>
                          setAddress({ ...address, city: e.target.value })
                        }
                      />
                    </div>

                    <div className='mb-4 md:col-span-1'>
                      <label
                        style={{
                          display: 'block',
                          marginBottom: '4px',
                          marginTop: '5px',
                        }}
                      >
                        State
                        <span style={{ color: 'red', fontSize: '1rem' }}>
                          *
                        </span>
                      </label>
                      <input
                        className='addressform-input'
                        type='text'
                        placeholder='Type state here'
                        value={address.state}
                        // onChange={(e) => setState(e.target.value)}
                        onChange={(e) =>
                          setAddress({ ...address, state: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className='grid md:grid-cols-2 gap-x-2'>
                    <div className='mb-4 md:col-span-1'>
                      <label
                        style={{
                          display: 'block',
                          marginBottom: '4px',
                          marginTop: '5px',
                        }}
                      >
                        ZIP code
                        <span style={{ color: 'red', fontSize: '1rem' }}>
                          *
                        </span>
                      </label>
                      <input
                        className='addressform-input'
                        type='number'
                        placeholder='Type zip code here'
                        value={address.zipCode}
                        // onChange={(e) => setZipCode(e.target.value)}
                        onChange={(e) =>
                          setAddress({ ...address, zipCode: e.target.value })
                        }
                      />
                    </div>

                    <div className='mb-4 md:col-span-1'>
                      <label
                        style={{
                          display: 'block',
                          marginBottom: '4px',
                          marginTop: '5px',
                        }}
                      >
                        Phone No
                        <span style={{ color: 'red', fontSize: '1rem' }}>
                          *
                        </span>
                      </label>
                      <input
                        className='addressform-input'
                        type='number'
                        placeholder='Type phone no here'
                        value={address.phoneNo}
                        // onChange={(e) => setPhoneNo(e.target.value)}
                        onChange={(e) =>
                          setAddress({ ...address, phoneNo: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className='mb-4 md:col-span-2'>
                    <label
                      style={{
                        display: 'block',
                        marginBottom: '4px',
                        marginTop: '5px',
                      }}
                    >
                      Country
                      <span style={{ color: 'red', fontSize: '1rem' }}>
                        *
                      </span>{' '}
                    </label>
                    <select
                      className='addressform-input'
                      value={address.country}
                      // onChange={(e) => setCountry(e.target.value)}
                      onChange={(e) =>
                        setAddress({ ...address, country: e.target.value })
                      }
                    >
                      {countriesList.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      marginBottom: '5px',
                      marginTop: '7px',
                     
                    }}
                  >
                    <Link
                      href={'/'}
                      style={{
                        color: 'gray',
                        fontWeight: 500,
                        fontSize: 'small',
                        marginRight: '20px',
                      }}
                    >
                      Cancel
                    </Link>
                    <button
                      type='submit'
                      className='addressform-btn'
                      disabbled={submitting}
                    >
                      {submitting ? `${type}...` : type}
                    </button>
                  </div>
                </form>
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  )
}

export default AddressForm
