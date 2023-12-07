'use client'
import { useState } from 'react'

const Vocals = (props) => {
  const [data, setData] = useState(props.data || {})
  const { handleInputBlur, handleChange: parentHandleChange } = props

  console.log(data)
  const vocalOptions = {
    vocalone: ['Lead Singer', 'Backup', 'Soprano', 'Alto', 'Tenor', 'Bass'],
    vocaltwo: ['Lead Singer', 'Backup', 'Soprano', 'Alto', 'Tenor', 'Bass'],
    vocalthree: ['Lead Singer', 'Backup', 'Soprano', 'Alto', 'Tenor', 'Bass'],
    vocalfour: ['Lead Singer', 'Backup', 'Soprano', 'Alto', 'Tenor', 'Bass'],
    vocalfive: ['Lead Singer', 'Backup', 'Soprano', 'Alto', 'Tenor', 'Bass'],
    vocalsix: ['Lead Singer', 'Backup', 'Soprano', 'Alto', 'Tenor', 'Bass'],
  }

  const [selectedOptions, setSelectedOptions] = useState({
    vocalone: '',
    vocaltwo: '',
    vocalthree: '',
    vocalfour: '',
    vocalfive: '',
    vocalsix: '',
  })

  const [availableOptions, setAvailableOptions] = useState({
    vocalone: vocalOptions.vocalone,
    vocaltwo: vocalOptions.vocaltwo,
    vocalthree: vocalOptions.vocalthree,
    vocalfour: vocalOptions.vocalfour,
    vocalfive: vocalOptions.vocalfive,
    vocalsix: vocalOptions.vocalsix,
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
      <h1>Check our Vocalist options</h1>
      <form action='' className='keyboard-form'>
        <div className='form-group'>
          <select
            id='vocalone'
            placeholder='vocalone...'
            name='vocalone'
            value={data.vocalone || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              Vocalist 1 <span style={{ color: 'red' }}>(required*)</span>
            </option>
            {availableOptions.vocalone
              .filter((option) => !selectedOptions.vocaltwo.includes(option))
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='vocaloneqty'
            name='vocaloneqty'
            value={data.vocaloneqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('vocaloneqty')}
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
            id='vocaltwo'
            placeholder='vocaltwo...'
            name='vocaltwo'
            value={data.vocaltwo || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              Vocalist 2 (optional)
            </option>
            {availableOptions.vocaltwo
              .filter((option) => !selectedOptions.vocalone.includes(option))
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='vocaltwoqty'
            name='vocaltwoqty'
            value={data.vocaltwoqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('vocaltwoqty')}
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
            id='vocalthree'
            placeholder='vocalthree...'
            name='vocalthree'
            value={data.vocalthree || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              Vocalist 3 (optional)
            </option>
            {availableOptions.vocalthree
              .filter((option) => !selectedOptions.vocaltwo.includes(option))
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='vocalthreeqty'
            name='vocalthreeqty'
            value={data.vocalthreeqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('vocalthreeqty')}
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
            id='vocalfour'
            placeholder='vocalfour...'
            name='vocalfour'
            value={data.vocalfour || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              Vocalist 4 (optional)
            </option>
            {availableOptions.vocalfour
              .filter((option) => !selectedOptions.vocalthree.includes(option))
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='vocalfourqty'
            name='vocalfourqty'
            value={data.vocalfourqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('vocalfourqty')}
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
            id='vocalfive'
            placeholder='vocalfive...'
            name='vocalfive'
            value={data.vocalfive || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              Vocalist 5 (optional)
            </option>
            {availableOptions.vocalfive
              .filter((option) => !selectedOptions.vocalfour.includes(option))
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='vocalfiveqty'
            name='vocalfiveqty'
            value={data.vocalfiveqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('vocalfiveqty')}
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
            id='vocalsix'
            placeholder='vocalsix...'
            name='vocalsix'
            value={data.vocalsix || ''}
            onChange={handleChange}
            className='select-instrument'
          >
            <option value='' disabled hidden>
              Vocalist 6 (optional)
            </option>
            {availableOptions.vocalsix
              .filter((option) => !selectedOptions.vocalfive.includes(option))
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            id='vocalsixqty'
            name='vocalsixqty'
            value={data.vocalsixqty}
            onChange={handleChange}
            onBlur={() => handleInputBlur('vocalsixqty')}
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

export default Vocals
