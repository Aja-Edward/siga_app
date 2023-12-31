'use client'
import { useState } from 'react'
import UserNameEmailService from './UserNameEmailService'
import Keyboard from './Keyboard'
import Vocals from './Vocals'
import WoodWinds from './WoodWinds'
import Strings from './Strings'
import BrassWinds from './BrassWinds'
import Percussion from './Percussion'
import InstrumentDateTimeDesc from './InstrumentDateTimeDesc'
import Spinner from '@components/Spinner'
import { useRouter } from 'next/navigation'

const ServiceBookingForm = () => {
  const [data, setData] = useState({
    email: '',
    name: '',
    subject: '',
    lessonlocation: '',
    otherservicespecify: '',
    genre: '',
    othergenrespecify: '',
    keyboardone: '',
    keyboardoneqty: '',
    keyboardtwo: '',
    keyboardtwoqty: '',
    keyboardthree: '',
    keyboardthreeqty: '',
    vocalone: '',
    vocaloneqty: '',
    vocaltwo: '',
    vocaltwoqty: '',
    vocalthree: '',
    vocalthreeqty: '',
    vocalfour: '',
    vocalfourqty: '',
    vocalfive: '',
    vocalfiveqty: '',
    vocalsix: '',
    vocalsixqty: '',
    woodwindone: '',
    woodwindoneqty: '',
    woodwindtwo: '',
    woodwindtwoqty: '',
    woodwindthree: '',
    woodwindthreeqty: '',
    woodwindfour: '',
    woodwindfourqty: '',
    woodwindfive: '',
    woodwindfiveqty: '',
    woodwindsix: '',
    woodwindsixqty: '',
    woodwindseven: '',
    woodwindsevenqty: '',
    stringone: '',
    stringoneqty: '',
    stringtwo: '',
    stringtwoqty: '',
    stringthree: '',
    stringthreeqty: '',
    stringfour: '',
    stringfourqty: '',
    stringfive: '',
    stringfiveqty: '',
    stringsix: '',
    stringsixqty: '',
    brasswindone: '',
    brasswindoneqty: '',
    brasswindtwo: '',
    brasswindtwoqty: '',
    brasswindthree: '',
    brasswindthreeqty: '',
    brasswindfour: '',
    brasswindfourqty: '',
    brasswindfive: '',
    brasswindfiveqty: '',
    percussionone: '',
    percussiononeqty: '',
    percussiontwo: '',
    percussiontwoqty: '',
    percussionthree: '',
    percussionthreeqty: '',
    percussionfour: '',
    percussionfourqty: '',
    percussionfive: '',
    percussionfiveqty: '',
    percussionsix: '',
    percussionsixqty: '',
    instrumentgroup: '',
    date: '',
    time: '',
    description: '',
  })

  const [touched, setTouched] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (fieldName, value) => {
    console.log(`Updating state for ${fieldName} to ${value}`)
    setData((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }))
  }

  const handleInputBlur = (fieldName) =>
    setTouched((prev) => ({ ...prev, [fieldName]: true }))

  const router = useRouter()

  const sendMessage = async () => {
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      if (response.ok) {
        router.push('/')
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.error || response.statusText)
      }
    } catch (error) {
      setErrorMessage(error.message)
      console.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await sendMessage(data)
    } catch (error) {
      setIsLoading(false)
      console.error(error.message)
    }
    console.log(e.target)
  }

  const formElements = [
    <UserNameEmailService data={data} handleChange={handleChange} />,
    <Keyboard
      data={data}
      handleInputBlur={handleInputBlur}
      handleChange={(name, value) => handleChange(name, value)}
    />,
    <Vocals
      data={data}
      handleInputBlur={handleInputBlur}
      handleChange={(name, value) => handleChange(name, value)}
    />,
    <WoodWinds
      data={data}
      handleInputBlur={handleInputBlur}
      handleChange={(name, value) => handleChange(name, value)}
    />,
    <Strings
      data={data}
      handleInputBlur={handleInputBlur}
      handleChange={(name, value) => handleChange(name, value)}
    />,
    <BrassWinds
      data={data}
      handleInputBlur={handleInputBlur}
      handleChange={(name, value) => handleChange(name, value)}
    />,
    <Percussion
      data={data}
      handleInputBlur={handleInputBlur}
      handleChange={(name, value) => handleChange(name, value)}
    />,
    <InstrumentDateTimeDesc
      data={data}
      handleInputBlur={handleInputBlur}
      handleChange={(name, value) => handleChange(name, value)}
    />,
  ]

  return (
    <div className='servicebookingmain-container'>
      {errorMessage && (
        <div
          style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}
        >
          {errorMessage}
        </div>
      )}

      <div>{formElements[activeTab]}</div>
      <div className='servicebookingform-container'>
        <button
          disabled={activeTab === 0 ? 'disabled' : ''}
          onClick={() => setActiveTab((prev) => prev - 1)}
          className='bookingform-bk-btn'
          // style={{
          //   opacity: activeTab === formElements.length - 1 ? 0.5 : 1,
          //   backgroundColor:
          //     activeTab === formElements.length - 1 ? '#4a5568' : null,
          //   cursor: 'pointer',
          // }}
        >
          Back
        </button>
        <button
          disabled={activeTab === formElements.length - 1 ? 'disabled' : ''}
          onClick={() => setActiveTab((prev) => prev + 1)}
          className='bookingform-bk-btn'
          style={{
            opacity: activeTab === formElements.length - 1 ? 0.5 : 1,
            backgroundColor:
              activeTab === formElements.length - 1 ? '#4a5568' : null,
            cursor: 'pointer',
          }}
        >
          Next
        </button>
        {activeTab === formElements.length - 1 ? (
          <button
            className='bookingform-bk-btn '
            type='submit'
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
        ) : null}
      </div>
    </div>
  )
}

export default ServiceBookingForm
