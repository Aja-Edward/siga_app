'use client'
import { useState } from 'react'

const Strings = (props) => {
  const [data, setData] = useState(props.data || {})
  const { handleInputBlur, handleChange: parentHandleChange } = props
  console.log(data)
  const percussionOptions = {
    percussionone: [
      'Drummer',
      'Timpanist',
      'Talking Drummer',
      'Konga Player',
      'Omele Player',
      'Bata Player',
    ],
    percussiontwo: [
      'Drummer',
      'Timpanist',
      'Talking Drummer',
      'Konga Player',
      'Omele Player',
      'Bata Player',
    ],
    percussionthree: [
      'Drummer',
      'Timpanist',
      'Talking Drummer',
      'Konga Player',
      'Omele Player',
      'Bata Player',
    ],
    percussionfour: [
      'Drummer',
      'Timpanist',
      'Talking Drummer',
      'Konga Player',
      'Omele Player',
      'Bata Player',
    ],
    percussionfive: [
      'Drummer',
      'Timpanist',
      'Talking Drummer',
      'Konga Player',
      'Omele Player',
      'Bata Player',
    ],
    percussionsix: [
      'Drummer',
      'Timpanist',
      'Talking Drummer',
      'Konga Player',
      'Omele Player',
      'Bata Player',
    ],
  }

  const [selectedOptions, setSelectedOptions] = useState({
    percussionone: '',
    percussiontwo: '',
    percussionthree: '',
    percussionfour: '',
    percussionfive: '',
    percussionsix: '',
  })

  const [availableOptions, setAvailableOptions] = useState({
    percussionone: percussionOptions.percussionone,
    percussiontwo: percussionOptions.percussiontwo,
    percussionthree: percussionOptions.percussionthree,
    percussionfour: percussionOptions.percussionfour,
    percussionfive: percussionOptions.percussionfive,
    percussionsix: percussionOptions.percussionsix,
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    // Keep track of selected options

    setSelectedOptions((prevSelected) => ({
      ...prevSelected,
      [name]: value,
    }))

    // Update available options based on the past selection
    setAvailableOptions((prevOptions) => {
      const updatedOptions = { ...prevOptions }

      // Remove the selected value from the options of the current select
      //   updatedOptions[name] = keyboardOptions[name].filter(
      //     (option) => option !== value
      //   )

      return updatedOptions
    })

    parentHandleChange(name, value)

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const generateQuantityOptions = () => {
    const quantityOptions = []
    for (let i = 0; i <= 9; i++) {
      quantityOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      )
    }
    return quantityOptions
  }

  return (
    <div className='email' maxWidth='450'>
      <h1>Percussion Options</h1>
      <form action='' className='keyboard-form'>
        <div className='form-group'>
          <select
            id='percussionone'
            placeholder='percussionone...'
            name='percussionone'
            value={data.percussionone || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              Percussion <span style={{ color: 'red' }}>(required*)</span>
            </option>
            {availableOptions.percussionone
              .filter(
                (option) => !selectedOptions.percussiontwo.includes(option)
              )
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='percussiononeqty'
            name='percussiononeqty'
            value={data.percussiononeqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('percussiononeqty')}
            className='select-number'
          >
            <option value='' disabled hidden>
              qty
            </option>
            {generateQuantityOptions()}
          </select>
        </div>
        <div className='form-group'>
          <select
            id='percussiontwo'
            placeholder='percussiontwo...'
            name='percussiontwo'
            value={data.percussiontwo || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              Percussion 2 (optional)
            </option>
            {availableOptions.percussiontwo
              .filter(
                (option) => !selectedOptions.percussionone.includes(option)
              )
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='percussiontwoqty'
            name='percussiontwoqty'
            value={data.percussiontwoqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('percussiontwoqty')}
            className='select-number'
          >
            <option value='' disabled hidden>
              qty
            </option>
            {generateQuantityOptions()}
          </select>
        </div>
        <div className='form-group'>
          <select
            id='percussionthree'
            placeholder='percussionthree...'
            name='percussionthree'
            value={data.percussionthree || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              Percussion 3 (optional)
            </option>
            {availableOptions.percussionthree
              .filter(
                (option) => !selectedOptions.percussiontwo.includes(option)
              )
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='percussionthreeqty'
            name='percussionthreeqty'
            value={data.percussionthreeqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('percussionthreeqty')}
            className='select-number'
          >
            <option value='' disabled hidden>
              qty
            </option>
            {generateQuantityOptions()}
          </select>
        </div>
        <div className='form-group'>
          <select
            id='percussionfour'
            placeholder='percussionfour...'
            name='percussionfour'
            value={data.percussionfour || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              Percussion 4 (optional)
            </option>
            {availableOptions.percussionfour
              .filter(
                (option) => !selectedOptions.percussionthree.includes(option)
              )
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='percussionfourqty'
            name='percussionfourqty'
            value={data.percussionfourqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('percussionfourqty')}
            className='select-number'
          >
            <option value='' disabled hidden>
              qty
            </option>
            {generateQuantityOptions()}
          </select>
        </div>
        <div className='form-group'>
          <select
            id='percussionfive'
            placeholder='percussionfive...'
            name='percussionfive'
            value={data.percussionfive || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              Percussion 5 (optional)
            </option>
            {availableOptions.percussionfive
              .filter(
                (option) => !selectedOptions.percussionfour.includes(option)
              )
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='percussionfiveqty'
            name='percussionfiveqty'
            value={data.percussionfiveqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('percussionfiveqty')}
            className='select-number'
          >
            <option value='' disabled hidden>
              qty
            </option>
            {generateQuantityOptions()}
          </select>
        </div>
        <div className='form-group'>
          <select
            id='percussionsix'
            placeholder='percussionsix...'
            name='percussionsix'
            value={data.percussionsix || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              Percussion 6 (optional)
            </option>
            {availableOptions.percussionsix
              .filter(
                (option) => !selectedOptions.percussionfive.includes(option)
              )
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='percussionsixqty'
            name='percussionsixqty'
            value={data.percussionsixqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('percussionsixqty')}
            className='select-number'
          >
            <option value='' disabled hidden>
              qty
            </option>
            {generateQuantityOptions()}
          </select>
        </div>
      </form>
    </div>
  )
}

export default Strings
