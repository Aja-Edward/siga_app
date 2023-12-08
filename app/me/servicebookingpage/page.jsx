import ServiceBookingForm from '@components/user/ServiceBookingForm'
import Socials from '@components/Socials'

const ServiceBookingPage = () => {
  return (
    <div className='contactuswrapper'>
      <h2>
        Book Siga<span>247</span>
      </h2>
      <p>
        Discover the ease of adventure with Siga247. Book your next musical
        experience effortlessly and embrace a world of convenience and
        excitement, available 24/7...
      </p>
      <div className='contactustitle'>
        <div className='sendformdiv'>
          <ServiceBookingForm />
        </div>
        <div className='socialicons'>
          <Socials />
        </div>
      </div>
    </div>
  )
}

export default ServiceBookingPage
