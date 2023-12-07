'use client'
import { useState } from 'react'

const BrassWinds = (props) => {
  const [data, setData] = useState(props.data || {})
  const { handleInputBlur, handleChange:parentHandleChange } = props
  console.log(data)
  const brasswindOptions = {
    brasswindone: [
      'Trumpeter',
      'Trombonist',
      'Tuba player',
      'Euphonium player',
      'French horn player',
    ],
    brasswindtwo: [
      'Trumpeter',
      'Trombonist',
      'Tuba player',
      'Euphonium player',
      'French horn player',
    ],
    brasswindthree: [
      'Trumpeter',
      'Trombonist',
      'Tuba player',
      'Euphonium player',
      'French horn player',
    ],
    brasswindfour: [
      'Trumpeter',
      'Trombonist',
      'Tuba player',
      'Euphonium player',
      'French horn player',
    ],
    brasswindfive: [
      'Trumpeter',
      'Trombonist',
      'Tuba player',
      'Euphonium player',
      'French horn player',
    ],
  }

  const [selectedOptions, setSelectedOptions] = useState({
    brasswindone: '',
    brasswindtwo: '',
    brasswindthree: '',
    brasswindfour: '',
    brasswindfive: '',
  })

  const [availableOptions, setAvailableOptions] = useState({
    brasswindone: brasswindOptions.brasswindone,
    brasswindtwo: brasswindOptions.brasswindtwo,
    brasswindthree: brasswindOptions.brasswindthree,
    brasswindfour: brasswindOptions.brasswindfour,
    brasswindfive: brasswindOptions.brasswindfive,
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
      <h1>Brasswind Options</h1>
      <form action='' className='keyboard-form'>
        <div className='form-group'>
          <select
            id='brasswindone'
            placeholder='brasswindone...'
            name='brasswindone'
            value={data.brasswindone || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              Brasswind <span style={{ color: 'red' }}>(required*)</span>
            </option>
            {availableOptions.brasswindone
              .filter(
                (option) => !selectedOptions.brasswindtwo.includes(option)
              )
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='brasswindoneqty'
            name='brasswindoneqty'
            value={data.brasswindoneqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('brasswindoneqty')}
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
            id='brasswindtwo'
            placeholder='brasswindtwo...'
            name='brasswindtwo'
            value={data.brasswindtwo || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              Brasswind 2 (optional)
            </option>
            {availableOptions.brasswindtwo
              .filter(
                (option) => !selectedOptions.brasswindone.includes(option)
              )
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='brasswindtwoqty'
            name='brasswindtwoqty'
            value={data.brasswindtwoqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('brasswindtwoqty')}
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
            id='brasswindthree'
            placeholder='brasswindthree...'
            name='brasswindthree'
            value={data.brasswindthree || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              Brasswind 3 (optional)
            </option>
            {availableOptions.brasswindthree
              .filter(
                (option) => !selectedOptions.brasswindtwo.includes(option)
              )
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='brasswindthreeqty'
            name='brasswindthreeqty'
            value={data.brasswindthreeqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('brasswindthreeqty')}
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
            id='brasswindfour'
            placeholder='brasswindfour...'
            name='brasswindfour'
            value={data.brasswindfour || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              Brasswind 4 (optional)
            </option>
            {availableOptions.brasswindfour
              .filter(
                (option) => !selectedOptions.brasswindthree.includes(option)
              )
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='brasswindfourqty'
            name='brasswindfourqty'
            value={data.brasswindfourqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('brasswindfourqty')}
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
            id='brasswindfive'
            placeholder='brasswindfive...'
            name='brasswindfive'
            value={data.brasswindfive || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              Brasswind 5 (optional)
            </option>
            {availableOptions.brasswindfive
              .filter(
                (option) => !selectedOptions.brasswindfour.includes(option)
              )
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='brasswindfiveqty'
            name='brasswindfiveqty'
            value={data.brasswindfiveqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('brasswindfiveqty')}
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

export default BrassWinds
