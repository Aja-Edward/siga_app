'use client'

import { useState } from 'react'
import Spinner from '@components/Spinner'
import { useRouter } from 'next/navigation'

const SendMessageForm = () => {
  const initialValues = {
    email: '',
    name: '',
    subject: '',
    genre: '',
    keyboards: '',
    keyboardsqty: '0',
    vocals: '',
    vocalsqty: '0',
    woodwinds: '',
    woodwindsqty: '0',
    strings: '',
    stringsqty: '0',
    brasswinds: '',
    brasswindsqty: '0',
    percussion: '',
    percussionqty: '0',
    instrumentgroup: '',
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

  const {
    email,
    name,
    subject,
    genre,
    keyboards,
    vocals,
    woodwinds,
    strings,
    brasswinds,
    percussion,
    instrumentgroup,
    date,
    time,
    description,
  } = formValues

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
  const artistFieldStyle = {
    display: openSidebar ? 'none' : '',
  }

  return (
    <div className='email' maxWidth='450px'>
      <form action='' className='email_form'>
        <div className='email_header'>New Message</div>
        <div className='email_body'>
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
          <div className='message-toggle-btn'>
            <button onClick={() => setOpenSidebar(!openSidebar)}>
              ARTIST/INSTRUMENT
            </button>
            <button onClick={() => setOpenSidebar(!openSidebar)}>
              SEEK ADVISE
            </button>
          </div>
          <div className='form-group' style={artistFieldStyle}>
            <select
              className='instrument-select'
              id='genre'
              name='genre'
              value={formValues.genre}
              onChange={handleChange}
              onBlur={() => handleInputBlur('genre')}
            >
              <option value=''>GENRE</option>
              <option value='contemporarygospel'>Contemporary Gospel</option>
              <option value='choral/classica'>Choral/classica</option>
              <option value='traditional/folk'>Traditional/folk</option>
              <option value='jazz/blues'>Jazz/blues</option>
              <option value='generalsecular'>General secular</option>
              <option value='othersspecify)'>Others (specify)</option>
            </select>
          </div>
          <div className='artist-instrument' style={artistFieldStyle}>
            <div className='double-form-group' style={{ display: 'flex' }}>
              <div className='form-group'>
                <select
                  id='keyboards'
                  name='keyboards'
                  value={formValues.keyboards}
                  onChange={handleChange}
                  className='select-instrument'
                >
                  <option value=''>KEYBOARDS OPTIONS</option>
                  <option value='pianist'>Pianist</option>
                  <option value='guitarist'>Organist</option>
                  <option value='bandmen'>Keyboardist</option>
                </select>
                <select
                  id='keyboardsqty'
                  name='keyboardsqty'
                  value={formValues.keyboardsqty}
                  onChange={handleChange}
                  onBlur={() => handleInputBlur('keyboardqty')}
                  className='select-number'
                >
                  <option value=''>qty</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                </select>
              </div>
              <div className='form-group'>
                <select
                  id='vocals'
                  name='vocals'
                  value={formValues.vocals}
                  onChange={handleChange}
                  onBlur={() => handleInputBlur('vocals')}
                  className='select-instrument'
                >
                  <option value=''>VOCALS</option>
                  <option value='lead singer'>Lead Singer</option>
                  <option value='backups'>backups</option>
                  <option value='soprano'>Soprano</option>
                  <option value='alto'>Alto</option>
                  <option value='tenor'>Tenor</option>
                  <option value='bass'>Bass</option>
                  <option value='duet'>Duet</option>
                  <option value='trio'>Trio</option>
                  <option value='quartet'>Quartet</option>
                  <option value='quintet'>Quintet</option>
                  <option value='sextet'>Sextet</option>
                  <option value='choir'>Choir</option>
                  <option value='acapella'>Acapella</option>
                </select>

                <select
                  id='vocalsqty'
                  name='vocalsqty'
                  value={formValues.vocalsqty}
                  onChange={handleChange}
                  onBlur={() => handleInputBlur('vocalsqty')}
                  className='select-number'
                >
                  <option value=''>qty</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                </select>
              </div>
            </div>
            <div className='double-form-group' style={{ display: 'flex' }}>
              <div className='form-group'>
                <select
                  id='woodwinds'
                  name='woodwinds'
                  value={formValues.woodwinds}
                  onChange={handleChange}
                  onBlur={() => handleInputBlur('woodwinds')}
                  className='select-instrument'
                >
                  <option value=''>WOODWINDS</option>
                  <option value='flutist'>Flutist</option>
                  <option value='oboist'>Oboist</option>
                  <option value='piccolo player'>Piccolo player</option>
                  <option value='recordist'>Recordist</option>
                  <option value='clarinetist'>Clarinetist</option>
                  <option value='saxophonist'>Saxophonist </option>
                  <option value='bassoonist'>Bassoonist </option>
                </select>

                <select
                  id='woodwindsqty'
                  name='woodwindsqty'
                  value={formValues.woodwindsqty}
                  onChange={handleChange}
                  onBlur={() => handleInputBlur('woodwindsqty')}
                  className='select-number'
                >
                  <option value=''>qty</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                </select>
              </div>
              <div className='form-group'>
                <select
                  id='strings'
                  name='strings'
                  value={formValues.strings}
                  onChange={handleChange}
                  onBlur={() => handleInputBlur('strings')}
                  className='select-instrument'
                >
                  <option value=''>STRINGS</option>
                  <option value='violinist'>Violinist</option>
                  <option value='violist'>Violist</option>
                  <option value='cellist'>Cellist</option>
                  <option value='guitarist'>Guitarist (Rhythm)</option>
                  <option value='guitaristbass'>Guitarist (Bass)</option>
                  <option value='bassist'>Double Bassist</option>
                </select>

                <select
                  id='stringsqty'
                  name='stringsqty'
                  value={formValues.stringsqty}
                  onChange={handleChange}
                  onBlur={() => handleInputBlur('stringsqty')}
                  className='select-number'
                >
                  <option value=''>qty</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                </select>
              </div>
            </div>
            <div className='double-form-group' style={{ display: 'flex' }}>
              <div className='form-group'>
                <select
                  id='brasswinds'
                  name='brasswinds'
                  value={formValues.brasswinds}
                  onChange={handleChange}
                  onBlur={() => handleInputBlur('brasswinds')}
                  className='select-instrument'
                >
                  <option value=''>BRASS WINDS</option>
                  <option value='trumpeter'>Trumpeter</option>
                  <option value='trombonist'>Trombonist</option>
                  <option value='tuba'>Tuba player</option>
                  <option value='euphonium'>Euphonium player</option>
                  <option value='french horn'>French horn player</option>
                </select>

                <select
                  id='brasswindsqty'
                  name='brasswindsqty'
                  value={formValues.brasswindsqty}
                  onChange={handleChange}
                  onBlur={() => handleInputBlur('brasswindsqty')}
                  className='select-number'
                >
                  <option value=''>qty</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                </select>
              </div>

              <div className='form-group'>
                <select
                  id='percussion'
                  name='percussion'
                  value={formValues.percussion}
                  onChange={handleChange}
                  onBlur={() => handleInputBlur('percussion')}
                  className='select-instrument'
                >
                  <option value=''>PERCUSSION</option>
                  <option value='drummer'>Drummer</option>
                  <option value='timpanist'>Timpanist</option>
                  <option value='talkingdrum'>Talking Drummer</option>
                  <option value='konga'>Konga Player</option>
                  <option value='omele'>Omele Player</option>
                  <option value='bata'>Bata Player</option>
                </select>

                <select
                  id='percussionqty'
                  name='percussionqty'
                  value={formValues.percussionqty}
                  onChange={handleChange}
                  onBlur={() => handleInputBlur('percussionqty')}
                  className='select-number'
                >
                  <option value=''>qty</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                </select>
              </div>
            </div>
          </div>
          <div className='form-group' style={artistFieldStyle}>
            <select
              className='instrument-select'
              id='instrumentgroup'
              name='instrumentgroup'
              value={formValues.instrumentgroup}
              onChange={handleChange}
              onBlur={() => handleInputBlur('instrumentgroup')}
            >
              <option value=''>INSTRUMENTAL GROUPS</option>
              <option value='duet'>Duet</option>
              <option value='trio'>Trio</option>
              <option value='quartet'>Quartet</option>
              <option value='quintet'>Quintet</option>
              <option value='sextet'>Sextet</option>
              <option value='orchestra'>Orchestra</option>
              <option value='stageband'>Stage Band</option>
              <option value='dj'>DJ</option>
              <option value='onemanband'>One-man Band</option>
            </select>
          </div>

          <div className='select-instrument'>
            <div
              className='form-group'
              style={{ display: 'flex', flexDirection: 'column' }}
            >
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
