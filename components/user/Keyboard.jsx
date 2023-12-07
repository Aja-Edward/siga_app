'use client'
import { useState } from 'react'

const Keyboard = (props) => {
  const [data, setData] = useState(props.data || {})
  const { handleInputBlur, handleChange: parentHandleChange } = props
  console.log(data)
  const keyboardOptions = {
    keyboardone: ['Pianist', 'Organist', 'Keyboardist'],
    keyboardtwo: ['Pianist', 'Organist', 'Keyboardist'],
    keyboardthree: ['Pianist', 'Organist', 'Keyboardist'],
  }

  const [selectedOptions, setSelectedOptions] = useState({
    keyboardone: '',
    keyboardtwo: '',
    keyboardthree: '',
  })

  const [availableOptions, setAvailableOptions] = useState({
    keyboardone: keyboardOptions.keyboardone,
    keyboardtwo: keyboardOptions.keyboardtwo,
    keyboardthree: keyboardOptions.keyboardthree,
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
      <h1>Choose keyboard option</h1>
      <form className='keyboard-form'>
        <div className='form-group'>
          <select
            id='keyboardone'
            placeholder='Keyboard...'
            name='keyboardone'
            value={data.keyboardone || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              keyboard option <span style={{ color: 'red' }}>(required*)</span>
            </option>
            {availableOptions.keyboardone
              .filter((option) => !selectedOptions.keyboardtwo.includes(option))
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='keyboardoneqty'
            name='keyboardoneqty'
            value={data.keyboardoneqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('keyboardoneqty')}
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
            id='keyboardtwo'
            placeholder='keyboard...'
            name='keyboardtwo'
            value={data.keyboardtwo || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              keyboard 2 (optional)
            </option>
            {availableOptions.keyboardone
              .filter((option) => !selectedOptions.keyboardone.includes(option))
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='keyboardtwoqty'
            name='keyboardtwoqty'
            value={data.keyboardtwoqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('keyboardtwoqty')}
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
            id='keyboardthree'
            placeholder='keyboard...'
            name='keyboardthree'
            value={data.keyboardthree || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              keyboard 3 (optional)
            </option>
            {availableOptions.keyboardthree
              .filter((option) => !selectedOptions.keyboardtwo.includes(option))
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='keyboardthreeqty'
            name='keyboardthreeqty'
            value={data.keyboardthreeqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('keyboardthreeqty')}
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

export default Keyboard
