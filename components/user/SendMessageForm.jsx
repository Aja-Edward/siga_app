'use client'

import { useState } from 'react'
import Spinner from '@components/Spinner'
import { useRouter } from 'next/navigation'

const SendMessageForm = () => {
  const initialValues = {
    email: '',
    name: '',
    subject: '',
    date: '',
    time: '',
    description: '',
  }
  const [formValues, setFormValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [openSidebar, setOpenSidebar] = useState(false)

  const router = useRouter()
  console.log(formValues)
  console.log(isLoading)

  const { email, name, subject, date, time, description } = formValues

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }
  const handleInputBlur = (fieldName) =>
    setTouched((prev) => ({ ...prev, [fieldName]: true }))

  const sendMessage = async () => {
    try {
      const response = await fetch('/api/message', {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      alert('Cannot send your message as', error)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await sendMessage(formValues)
    } catch (error) {
      setIsLoading(false)
      console.error(error.message)
    }
    console.log(e.target)
  }


  return (
    <div className='email' maxWidth='450px'>
      <form action='' className='email_form'>
        <div className='email_header'>New Message</div>
        <div className='email_body'>
          <div
            className='form-group'
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <input
              type='text'
              id='name'
              placeholder='Name'
              required
              name='name'
              value={formValues.name}
              onChange={handleChange}
              onBlur={() => handleInputBlur('name')}
              className={
                touched.name && !formValues.name
                  ? 'isInvalidInput'
                  : 'isValidInput'
              }
            />
            {touched.name && !formValues.name ? (
              <small style={{ color: 'red' }}>required</small>
            ) : null}
          </div>
          <div
            className=' form-group'
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <input
              type='email'
              id='email'
              placeholder='Email'
              required
              name='email'
              value={formValues.email}
              onChange={handleChange}
              onBlur={() => handleInputBlur('email')}
              className={
                touched.email && !formValues.email
                  ? 'isInvalidInput'
                  : 'isValidInput'
              }
            />

            {touched.email && !formValues.email ? (
              <small style={{ color: 'red' }}>required</small>
            ) : null}
          </div>

          <div
            className='form-group'
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <select
              className='service-select'
              id='subject'
              name='subject'
              value={formValues.subject}
              onChange={handleChange}
              onBlur={() => handleInputBlur('subject')}
            >
              <option value=''>SELECT SERVICE</option>
              <option value='birthday'>Birthday</option>
              <option value='luncheon'>Luncheon</option>
              <option value='anniversary'>Anniversary</option>
              <option value='church service'>Church service</option>
              <option value='music exam'>Music Exam</option>
              <option value='tribute'>Tribute</option>
              <option value='festival'>Festival </option>
              <option value='award night'>Award Night </option>
              <option value='cocktail'>Cocktail</option>
              <option value='film shoot'>Film shoot</option>
              <option value='marriage'>Marriage</option>
              <option value='rehearsal'>Rehearsal</option>
              <option value='concert'>Concert</option>
              <option value='music lesson'>Music Lesson</option>
              <option value='buy an instrument'>Buy an instrument</option>
              <option value='repair/servicing'>Repair/servicing</option>
              <option value='other'>Other Specify</option>
            </select>{' '}
            <br />
            {touched.subject && !formValues.subject ? (
              <small style={{ color: 'red' }}>required</small>
            ) : null}
          </div>
          <div className='select-instrument'>
            <div
              className='form-group'
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <label className='mobile-label'>Date</label>
              <input
                type='date'
                id='date'
                placeholder='date'
                required
                name='date'
                value={formValues.date}
                onChange={handleChange}
                onBlur={() => handleInputBlur('date')}
              />
              {touched.date && !formValues.date ? (
                <small style={{ color: 'red' }}>required</small>
              ) : null}
            </div>
            <div
              className='form-group'
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <label className='mobile-label'>Time</label>
              <input
                type='time'
                id='time'
                placeholder='time'
                required
                name='time'
                value={formValues.time}
                onChange={handleChange}
                onBlur={() => handleInputBlur('time')}
              />
              {touched.time && !formValues.time ? (
                <small style={{ color: 'red' }}>required</small>
              ) : null}
            </div>
          </div>
          <div className='form-group'>
            <textarea
              rows='4'
              id='description'
              placeholder='Any other thing you want us to know? describe here.'
              required
              value={formValues.description}
              name='description'
              onChange={handleChange}
              onBlur={() => handleInputBlur('description')}
            ></textarea>
          </div>
        </div>
        <div className='email_footer'>
          <button
            type='submit'
            disabled={
              !formValues.name || !formValues.email || !formValues.subject
            }
            onClick={onSubmit}
          >
            {isLoading ? (
              <>
                <Spinner /> Sending...
              </>
            ) : (
              'Send'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default SendMessageForm
