import { useState } from 'react'

const UserNameEmailService = (props) => {
  // const [data, setData] = useState(props.data || {})
  const { data, handleChange } = props
  console.log(data)

  const [touched, setTouched] = useState({})
  const [othersInput, setOthersInput] = useState('')

  const handleInputBlur = (fieldName) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }))
  }

  return (
    <div className='email' maxWidth='450px'>
      <h1>Brief Detail</h1>
      <form action='' className='email_form'>
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
              placeholder='Username...'
              required
              name='name'
              value={data.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={() => handleInputBlur('name')}
              className={
                touched.name && !data.name ? 'isInvalidInput' : 'isValidInput'
              }
            />
            {touched.name && !data.name ? (
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
              placeholder='Email...'
              required
              name='email'
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleInputBlur('email')}
              className={
                touched.email && !data.email ? 'isInvalidInput' : 'isValidInput'
              }
            />

            {touched.email && !data.email ? (
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
              value={data.subject}
              onChange={(e) => {
                handleChange('subject', e.target.value)
              }}
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
              <option value='others'>Others (Specify)</option>
            </select>{' '}
            {data.subject === 'others' && (
              <input
                type='text'
                id='othersspecify'
                placeholder='Specify service here'
                name='othersspecify'
                value={data.othersspecify}
                onChange={(e) => handleChange('othersspecify', e.target.value)}
              />
            )}
            {data.subject === 'music lesson' && (
              <select
                id='lessonlocation'
                name='lessonlocation'
                value={data.lessonlocation}
                onChange={(e) => handleChange('lessonlocation', e.target.value)}
              >
                <option value='' disabled>
                  SELECT Location
                </option>
                <option value='online'>Online</option>
                <option value='offline'>Offline</option>
              </select>
            )}
            <br />
            {touched.subject && !data.subject ? (
              <small style={{ color: 'red' }}>required</small>
            ) : null}
          </div>
          <div className='form-group'>
            <select
              className='instrument-select'
              id='genre'
              name='genre'
              value={data.genre}
              onChange={(e) => handleChange('genre', e.target.value)}
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
        </div>
      </form>
    </div>
  )
}

export default UserNameEmailService
