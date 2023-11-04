import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AboutImage from '@public/assets/images/siga247.png'

const AboutPage = () => {
  return (
    <div className='about-session-container'>
      <section>
        <div className='about-big-text'>
          <h1>ABOUT</h1>
          <Image
            src={AboutImage}
            width={200}
            height={200}
            alt='siga about image'
          />
        </div>
        <div className='about-content'>
          <p>
            SIGA247 is Nigeria's most sort-after and Professional brand for all
            your desires in musical services. It aims at bridging the gap
            between your thoughts/ musical yearnings, and the long time taken to
            searching for Professional artistes and vendors. Hence we provide an
            immediate and prompt response to your requests sent from the comfort
            of your home.
          </p>
          <p>
            At SIGA247 we know that planning for that special day, moment or
            event can sometimes be very demanding and exhausting. Recognizing
            the importance of good music in all of these, we fill in the gap for
            searching or choosing your desired music genre, style, artistes,
            choice/combination of instruments etc., all by a click.
          </p>
          <p>
            Simply login to SIGA247, enter the details of your event and make
            your selections, or simply click on the <strong>advise Key</strong>{' '}
            to get quality recommendations from us.
          </p>
          <p>
            SIGA247 also gives you the opportunity to make your own selection;
            choose instruments and vocal combinations that suits your taste.
          </p>
          <p>
            With SIGA247, you do not have to bother about the competence,
            professionalism, experience or spontaneity of your service provider.
            All SIGA247 artistes are thoroughly screened and confirmed before
            admission. They are certified, competent professionals that have
            been well profiled and carefully examined for your assurance and
            confidence.
          </p>
          <p>
            Take a moment to view our <strong>Service Provider Section </strong>
            to meet our artistes and their profiles.
          </p>
          <p>
            Simplicity, Innovative and Excellence. These three words define
            SIGA247.
          </p>
          <Link
            className='about-link-btn'
            href={'/me/message'}
            style={{
              padding: '10px',
              border: '2px solid #ffffff',
              borderRadius: '10px',
            }}
          >
            Book a service now.
          </Link>
        </div>
      </section>
      <div className='team-contactbtn'>
        <Link href={'/about/team'}>
          <button>Service Provider Section</button>
        </Link>
      </div>
    </div>
  )
}

export default AboutPage
