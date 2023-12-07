import { useState } from 'react'

const InstrumentDateTimeDesc = (props) => {
  const [data, setData] = useState(props.data || {})
  const {handleChange:parentHandleChange}= props
  console.log(data)
  console.log(data.time)
  console.log(data.date)
  console.log(data.description)
  console.log(data.instrumentgroup)

  const [touched, setTouched] = useState({})

  const handleInputBlur = (fieldName) =>
    setTouched((prev) => ({ ...prev, [fieldName]: true }))

  const handleChange = (e) => {
    const { name, value } = e.target

    console.log(`Updating state for ${name} to ${value}`)

    // Update the state in the parent component
    parentHandleChange(name, value)

    setData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
   
  }

  return (
    <div className='email' maxWidth='450px'>
      <form action='' className='email_form'>
        <div className='email_body'>
          <div className='form-group'>
            <select
              className='instrument-select'
              id='instrumentgroup'
              name='instrumentgroup'
              value={data.instrumentgroup}
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
              <label className='mobile-label'>Date</label>
              <input
                type='date'
                id='date'
                placeholder='date'
                required
                name='date'
                value={data.date}
                onChange={handleChange}
                onBlur={() => handleInputBlur('date')}
              />
              {touched.date && !data.date ? (
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
                value={data.time}
                onChange={handleChange}
                onBlur={() => handleInputBlur('time')}
              />
              {touched.time && !data.time ? (
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
              value={data.description}
              name='description'
              onChange={handleChange}
              onBlur={() => handleInputBlur('description')}
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  )
}

export default InstrumentDateTimeDesc
