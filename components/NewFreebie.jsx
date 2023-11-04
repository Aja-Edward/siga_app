'use client'

import { useContext, useState } from 'react'
import Sidebar from '@components/Sidebar'
import Link from 'next/link'
import AuthContext from '@context/AuthContext'
import Image from 'next/image'
import freebieImage from '@public/assets/images/SIGAguitarlesson.png'

const AddressForm = ({ type }) => {
  const { addNewFreebie, freebie, setFreebie, submitting } =
    useContext(AuthContext)

  const submitHandler = (e) => {
    e.preventDefault()
    const newFreebie = {
      freebie,
    }
    addNewFreebie(newFreebie)
  }

  return (
    <>
      <section className='addressform-section'>
        <div className='addressform-container'>
          <div className='addressform-wrapper'>
            <main className='addressform-main-wrapper'>
              <div
                style={{ maxWidth: '480px' }}
                className='addressform-div-wrapper'
              >
                <form onSubmit={submitHandler}>
                  <h2 className='addressform-title'>
                    {type} Free Music Lesson
                  </h2>

                  <div className='addressform-label-container'>
                    <label
                      style={{
                        display: 'block',
                        marginBottom: '4px',
                        marginTop: '5px',
                      }}
                    >
                      Topic
                      <span style={{ color: 'red', fontSize: '1rem' }}>*</span>
                    </label>
                    <input
                      className='addressform-input'
                      type='text'
                      placeholder='Lesson topic'
                      value={freebie.topic}
                      onChange={(e) =>
                        setFreebie({ ...freebie, topic: e.target.value })
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
                        Slug
                        <span style={{ color: 'red', fontSize: '1rem' }}>
                          *
                        </span>
                      </label>
                      <input
                        className='addressform-input'
                        type='text'
                        placeholder='Type your slug'
                        value={freebie.slug}
                        onChange={(e) =>
                          setFreebie({ ...freebie, slug: e.target.value })
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
                        1st Sub Heading
                        <span style={{ color: 'red', fontSize: '1rem' }}>
                          *
                        </span>
                      </label>
                      <input
                        className='addressform-input'
                        type='text'
                        placeholder='Type 1st heading here'
                        value={freebie.fsubtopic}
                        onChange={(e) =>
                          setFreebie({ ...freebie, fsubtopic: e.target.value })
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
                        1st Paragraph
                        <span style={{ color: 'red', fontSize: '1rem' }}>
                          *
                        </span>
                      </label>
                      <textarea
                        className='addressform-input'
                        cols={3}
                        rows={4}
                        type='text'
                        placeholder='1st Paragraph'
                        value={freebie.firstdescription}
                        onChange={(e) =>
                          setFreebie({
                            ...freebie,
                            firstdescription: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>

                    <div className='mb-4 md:col-span-1'>
                      <label
                        style={{
                          display: 'block',
                          marginBottom: '4px',
                          marginTop: '5px',
                        }}
                      >
                        2nd Heading (optional)
                      </label>
                      <input
                        className='addressform-input'
                        type='text'
                        placeholder='Type your 2nd heading'
                        value={freebie.ssubtopic}
                        onChange={(e) =>
                          setFreebie({ ...freebie, ssubtopic: e.target.value })
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
                      2nd Paragraph (optional)
                    </label>
                    <textarea
                      className='addressform-input'
                      cols={3}
                      rows={4}
                      type='text'
                      placeholder='Type your 2nd Paragraph'
                      value={freebie.seconddescription}
                      onChange={(e) =>
                        setFreebie({
                          ...freebie,
                          seconddescription: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div className='mb-4 md:col-span-1'>
                    <label
                      style={{
                        display: 'block',
                        marginBottom: '4px',
                        marginTop: '5px',
                      }}
                    >
                      3rd Heading (optional)
                    </label>
                    <input
                      className='addressform-input'
                      type='text'
                      placeholder='Type your 3rd heading'
                      value={freebie.tsubtopic}
                      onChange={(e) =>
                        setFreebie({ ...freebie, tsubtopic: e.target.value })
                      }
                    />
                  </div>
                  <div className='mb-4 md:col-span-2'>
                    <label
                      style={{
                        display: 'block',
                        marginBottom: '4px',
                        marginTop: '5px',
                      }}
                    >
                      3rd Paragraph (optional)
                    </label>
                    <textarea
                      className='addressform-input'
                      cols={3}
                      rows={4}
                      type='text'
                      placeholder='Type your 3rd Paragraph'
                      value={freebie.thirddescription}
                      onChange={(e) =>
                        setFreebie({
                          ...freebie,
                          thirddescription: e.target.value,
                        })
                      }
                    ></textarea>
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
                      {submitting ? `${type} lesson...` : type}
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
