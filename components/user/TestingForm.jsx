import React, { useState } from 'react'

const DynamicForm = () => {
  const [color, setColor] = useState('white')
  const [colorInput, setColorInput] = useState('')
  const [event, setEvent] = useState('birthday')
  const [musicType, setMusicType] = useState('online')
  const [date, setDate] = useState('')

  const showColorInput = () => {
    setColorInput(color === 'others' ? '' : colorInput)
  }

  const showEventDetails = () => {
    setMusicType('online') // Reset music type when changing events
  }

  const submitForm = (e) => {
    e.preventDefault()
    // Add your form submission logic here
    alert('Form submitted!')
  }

  return (
    <form onSubmit={submitForm}>
      <label htmlFor='color'>Select Color:</label>
      <select
        id='color'
        value={color}
        onChange={(e) => setColor(e.target.value)}
        onBlur={showColorInput}
      >
        <option value='white'>White</option>
        <option value='red'>Red</option>
        <option value='blue'>Blue</option>
        <option value='others'>Others (Specify)</option>
      </select>
      {color === 'others' && (
        <input
          type='text'
          placeholder='Specify color'
          value={colorInput}
          onChange={(e) => setColorInput(e.target.value)}
        />
      )}

      <br />

      <label htmlFor='event'>Select Event:</label>
      <select
        id='event'
        value={event}
        onChange={(e) => setEvent(e.target.value)}
        onBlur={showEventDetails}
      >
        <option value='birthday'>Birthday</option>
        <option value='luncheon'>Luncheon</option>
        <option value='anniversary'>Anniversary</option>
        <option value='music'>Music Class</option>
      </select>

      {event === 'music' && (
        <div>
          <label htmlFor='musicType'>Select Music Type:</label>
          <select
            id='musicType'
            value={musicType}
            onChange={(e) => setMusicType(e.target.value)}
          >
            <option value='online'>Online Class</option>
            <option value='offline'>Offline Class</option>
          </select>
        </div>
      )}

      <br />

      <label htmlFor='date'>Select Date:</label>
      <input
        type='date'
        id='date'
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <br />

      <button type='submit'>Submit</button>
    </form>
  )
}

export default DynamicForm
