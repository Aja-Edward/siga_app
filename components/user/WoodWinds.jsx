'use client'
import { useState } from 'react'

const WoodWinds = (props) => {
  const [data, setData] = useState(props.data || {})
  const { handleInputBlur, handleChange: parentHandleChange } = props
  console.log(data)
  const woodwindOptions = {
    woodwindone: [
      'Flutist',
      'Oboist',
      'Piccolo player',
      'Recordist',
      'Clarinetist',
      'Saxophonist',
      'Bassonist',
    ],
    woodwindtwo: [
      'Flutist',
      'Oboist',
      'Piccolo player',
      'Recordist',
      'Clarinetist',
      'Saxophonist',
      'Bassonist',
    ],
    woodwindthree: [
      'Flutist',
      'Oboist',
      'Piccolo player',
      'Recordist',
      'Clarinetist',
      'Saxophonist',
      'Bassonist',
    ],
    woodwindfour: [
      'Flutist',
      'Oboist',
      'Piccolo player',
      'Recordist',
      'Clarinetist',
      'Saxophonist',
      'Bassonist',
    ],
    woodwindfive: [
      'Flutist',
      'Oboist',
      'Piccolo player',
      'Recordist',
      'Clarinetist',
      'Saxophonist',
      'Bassonist',
    ],
    woodwindsix: [
      'Flutist',
      'Oboist',
      'Piccolo player',
      'Recordist',
      'Clarinetist',
      'Saxophonist',
      'Bassonist',
    ],
    woodwindseven: [
      'Flutist',
      'Oboist',
      'Piccolo player',
      'Recordist',
      'Clarinetist',
      'Saxophonist',
      'Bassonist',
    ],
  }

  const [selectedOptions, setSelectedOptions] = useState({
    woodwindone: '',
    woodwindtwo: '',
    woodwindthree: '',
    woodwindfour: '',
    woodwindfive: '',
    woodwindsix: '',
    woodwindseven: '',
  })

  const [availableOptions, setAvailableOptions] = useState({
    woodwindone: woodwindOptions.woodwindone,
    woodwindtwo: woodwindOptions.woodwindtwo,
    woodwindthree: woodwindOptions.woodwindthree,
    woodwindfour: woodwindOptions.woodwindfour,
    woodwindfive: woodwindOptions.woodwindfive,
    woodwindsix: woodwindOptions.woodwindsix,
    woodwindseven: woodwindOptions.woodwindseven,
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
      <h1>Woodwind options</h1>
      <form action='' className='keyboard-form'>
        <div className='form-group'>
          <select
            id='woodwindone'
            placeholder='woodwindone...'
            name='woodwindone'
            value={data.woodwindone || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              Select a woodwind{' '}
              <span style={{ color: 'red' }}>(required*)</span>
            </option>
            {availableOptions.woodwindone
              .filter((option) => !selectedOptions.woodwindtwo.includes(option))
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='woodwindoneqty'
            name='woodwindoneqty'
            value={data.woodwindoneqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('woodwindoneqty')}
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
            id='woodwindtwo'
            placeholder='woodwindtwo...'
            name='woodwindtwo'
            value={data.woodwindtwo || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              woodwind 2 (optional)
            </option>
            {availableOptions.woodwindtwo
              .filter((option) => !selectedOptions.woodwindone.includes(option))
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='woodwindtwoqty'
            name='woodwindtwoqty'
            value={data.woodwindtwoqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('woodwindtwoqty')}
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
            id='woodwindthree'
            placeholder='woodwindthree...'
            name='woodwindthree'
            value={data.woodwindthree || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              Woodwind 3 (optional)
            </option>
            {availableOptions.woodwindthree
              .filter((option) => !selectedOptions.woodwindtwo.includes(option))
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='woodwindthreeqty'
            name='woodwindthreeqty'
            value={data.woodwindthreeqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('woodwindthreeqty')}
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
            id='woodwindfour'
            placeholder='woodwindfour...'
            name='woodwindfour'
            value={data.woodwindfour || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              Woodwind 4 (optional)
            </option>
            {availableOptions.woodwindfour
              .filter(
                (option) => !selectedOptions.woodwindthree.includes(option)
              )
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='woodwindfourqty'
            name='woodwindfourqty'
            value={data.woodwindfourqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('woodwindfourqty')}
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
            id='woodwindfive'
            placeholder='woodwindfive...'
            name='woodwindfive'
            value={data.woodwindfive || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              Woodwind 5 (optional)
            </option>
            {availableOptions.woodwindfive
              .filter(
                (option) => !selectedOptions.woodwindfour.includes(option)
              )
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='woodwindfiveqty'
            name='woodwindfiveqty'
            value={data.woodwindfiveqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('woodwindfiveqty')}
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
            id='woodwindsix'
            placeholder='woodwindsix...'
            name='woodwindsix'
            value={data.woodwindsix || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              Woodwind 6 (optional)
            </option>
            {availableOptions.woodwindsix
              .filter(
                (option) => !selectedOptions.woodwindfive.includes(option)
              )
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='woodwindsixqty'
            name='woodwindsixqty'
            value={data.woodwindsixqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('woodwindsixqty')}
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
            id='woodwindseven'
            placeholder='woodwindseven...'
            name='woodwindseven'
            value={data.woodwindseven || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              Woodwind 7 (optional)
            </option>
            {availableOptions.woodwindseven
              .filter((option) => !selectedOptions.woodwindsix.includes(option))
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='woodwindsevenqty'
            name='woodwindsevenqty'
            value={data.woodwindsevenqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('woodwindsevenqty')}
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

export default WoodWinds
