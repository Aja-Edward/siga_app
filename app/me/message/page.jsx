import SendMessageForm from '@components/user/SendMessageForm'
import Socials from '@components/Socials'

const ContactPage = () => {
  return (
    <section>
      <div className='contactuswrapper'>
        <h2>
          Contact Siga<span>247</span>
        </h2>
        <p>
          Stay updated with our latest news, promotions, and industry insights
          by connecting with us on our social media platforms. Join our growing
          community and be a part of the Siga247 family.
        </p>
        <div className='contactustitle'>
          <div className='sendformdiv'>
            <SendMessageForm />
          </div>
          <div className='socialicons'>
            <Socials />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactPage
