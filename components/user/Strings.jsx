'use client'
import { useState } from 'react'

const Strings = (props) => {
  const [data, setData] = useState(props.data || {})
  const { handleInputBlur, handleChange:parentHandleChange } = props
  console.log(data)
  const stringOptions = {
    stringone: [
      'Violinist',
      'Violist',
      'Cellist',
      'Guitarist (Rhythm)',
      'Guitarist (Bass)',
      'Double Basses',
    ],
    stringtwo: [
      'Violinist',
      'Violist',
      'Cellist',
      'Guitarist (Rhythm)',
      'Guitarist (Bass)',
      'Double Basses',
    ],
    stringthree: [
      'Violinist',
      'Violist',
      'Cellist',
      'Guitarist (Rhythm)',
      'Guitarist (Bass)',
      'Double Basses',
    ],
    stringfour: [
      'Violinist',
      'Violist',
      'Cellist',
      'Guitarist (Rhythm)',
      'Guitarist (Bass)',
      'Double Basses',
    ],
    stringfive: [
      'Violinist',
      'Violist',
      'Cellist',
      'Guitarist (Rhythm)',
      'Guitarist (Bass)',
      'Double Basses',
    ],
    stringsix: [
      'Violinist',
      'Violist',
      'Cellist',
      'Guitarist (Rhythm)',
      'Guitarist (Bass)',
      'Double Basses',
    ],
  }

  const [selectedOptions, setSelectedOptions] = useState({
    stringone: '',
    stringtwo: '',
    stringthree: '',
    stringfour: '',
    stringfive: '',
    stringsix: '',
  })

  const [availableOptions, setAvailableOptions] = useState({
    stringone: stringOptions.stringone,
    stringtwo: stringOptions.stringtwo,
    stringthree: stringOptions.stringthree,
    stringfour: stringOptions.stringfour,
    stringfive: stringOptions.stringfive,
    stringsix: stringOptions.stringsix,
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
      <h1> String Options</h1>
      <form action='' className='keyboard-form'>
        <div className='form-group'>
          <select
            id='stringone'
            placeholder='stringone...'
            name='stringone'
            value={data.stringone || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              String option <span style={{ color: 'red' }}>(required*)</span>
            </option>
            {availableOptions.stringone
              .filter((option) => !selectedOptions.stringtwo.includes(option))
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='stringoneqty'
            name='stringoneqty'
            value={data.stringoneqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('stringoneqty')}
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
            id='stringtwo'
            placeholder='stringtwo...'
            name='stringtwo'
            value={data.stringtwo || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              String 2 (optional)
            </option>
            {availableOptions.stringtwo
              .filter((option) => !selectedOptions.stringone.includes(option))
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='stringtwoqty'
            name='stringtwoqty'
            value={data.stringtwoqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('stringtwoqty')}
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
            id='stringthree'
            placeholder='stringthree...'
            name='stringthree'
            value={data.stringthree || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              String 3 (optional)
            </option>
            {availableOptions.stringthree
              .filter((option) => !selectedOptions.stringtwo.includes(option))
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='stringthreeqty'
            name='stringthreeqty'
            value={data.stringthreeqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('stringthreeqty')}
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
            id='stringfour'
            placeholder='stringfour...'
            name='stringfour'
            value={data.stringfour || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              String 4 (optional)
            </option>
            {availableOptions.stringfour
              .filter((option) => !selectedOptions.stringthree.includes(option))
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='stringfourqty'
            name='stringfourqty'
            value={data.stringfourqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('stringfourqty')}
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
            id='stringfive'
            placeholder='stringfive...'
            name='stringfive'
            value={data.stringfive || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              String 5 (optional)
            </option>
            {availableOptions.stringfive
              .filter((option) => !selectedOptions.stringfour.includes(option))
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='stringfiveqty'
            name='stringfiveqty'
            value={data.stringfiveqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('stringfiveqty')}
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
            id='stringsix'
            placeholder='stringsix...'
            name='stringsix'
            value={data.stringsix || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              String 6 (optional)
            </option>
            {availableOptions.stringsix
              .filter((option) => !selectedOptions.stringfive.includes(option))
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='stringsixqty'
            name='stringsixqty'
            value={data.stringsixqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('stringsixqty')}
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
