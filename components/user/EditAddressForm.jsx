import Sidebar from '@components/Sidebar'
import Link from 'next/link'

const EditAddressForm = ({
  type,
  address,
  setAddress,
  handleSubmit,
  countriesList,
  submitting,
  description,
  setSubmitting,
}) => {
  return (
    <>
      <section className='Editaddressform-container'>
        <div className='Editaddressform-wrapper'>
          <div className='Editaddressform'>
            <Sidebar />
            <main
              style={{ maxWidth: '480px' }}
              className='updatepassword-container'
            >
              <div style={{ maxWidth: '480px' }} className=''>
                <form onSubmit={handleSubmit}>
                  <h2
                    className='updatepassword-form'
                    style={{ color: 'white' }}
                  >
                    {type} Address
                  </h2>
                  <p style={{ color: 'white' }}>
                    {' '}
                    {type}
                    {description}
                  </p>
                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>
                      {' '}
                      Street <span style={{ color: 'red' }}>*</span>{' '}
                    </label>
                    <input
                      className='editaddress-input'
                      name='street'
                      id='street'
                      type='text'
                      placeholder='Type your address'
                      value={address.street}
                      onChange={(e) =>
                        setAddress({ ...address, street: e.target.value })
                      }
                    />
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>
                      {' '}
                      City<span style={{ color: 'red' }}>*</span>{' '}
                    </label>
                    <input
                      className='editaddress-input'
                      type='text'
                      name='city'
                      id='city'
                      placeholder='Type your city'
                      value={address.city}
                      // onChange={(e) => setCity(e.target.value)}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                    />
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>
                      {' '}
                      State<span style={{ color: 'red' }}>*</span>{' '}
                    </label>
                    <input
                      className='editaddress-input'
                      name='state'
                      id='state'
                      type='text'
                      placeholder='Type state here'
                      value={address.state}
                      // onChange={(e) => setState(e.target.value)}
                      onChange={(e) =>
                        setAddress({ ...address, state: e.target.value })
                      }
                    />
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>
                      {' '}
                      ZIP code<span style={{ color: 'red' }}>*</span>{' '}
                    </label>
                    <input
                      className='editaddress-input'
                      name='zipCode'
                      id='zipCode'
                      type='number'
                      placeholder='Type zip code here'
                      value={address.zipCode}
                      // onChange={(e) => setZipCode(e.target.value)}
                      onChange={(e) =>
                        setAddress({ ...address, zipCode: e.target.value })
                      }
                    />
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>
                      {' '}
                      Phone No<span style={{ color: 'red' }}>*</span>{' '}
                    </label>
                    <input
                      className='editaddress-input'
                      name='phoneNo'
                      id='phoneNo'
                      type='number'
                      placeholder='Type phone no here'
                      value={address.phoneNo}
                      // onChange={(e) => setPhoneNo(e.target.value)}
                      onChange={(e) =>
                        setAddress({ ...address, phoneNo: e.target.value })
                      }
                    />
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>
                      {' '}
                      Country<span style={{ color: 'red' }}>*</span>{' '}
                    </label>
                    <select
                      name='country'
                      id='country'
                      placeholder='select'
                      required
                      type='select'
                      value={address.country}
                      // onChange={(e) => setCountry(e.target.value)}
                      onChange={(e) =>
                        setAddress({ ...address, country: e.target.value })
                      }
                    >
                      {countriesList.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='updatepassword-btn-container'>
                    <Link
                      href={'/me/userprofilepage'}
                      style={{
                        color: 'gray',
                        fontWeight: 500,
                        fontSize: 'small',
                        marginRight: '20px',
                      }}
                    >
                      Cancel
                    </Link>
                    <button
                      type='submit'
                      style={{ cursor: 'pointer' }}
                      disabled={submitting}
                    >
                      {submitting ? `${type}...` : type}
                    </button>
                  </div>
                </form>
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  )
}

export default EditAddressForm
