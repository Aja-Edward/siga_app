import { IoLogoFacebook, IoLogoInstagram, IoLogoYoutube } from 'react-icons/io5'
import { RxLinkedinLogo } from 'react-icons/rx'
import { RiWhatsappLine } from 'react-icons/ri'
import { Twitterxicon } from './Icons'

const Socials = () => {
  const socialLinks = {
    instagram: 'https://instagram.com/siga247concepts?igshid=NGVhN2U2NjQ0Yg==',
    facebook: 'https://www.facebook.com/profile.php?id=61552226675775',
    linkedin: '',
    twitter: 'https://twitter.com/signaturemuz?t=9XExhVEeWPGCD73stZOlVQ&s=09',
    youtube: 'https://www.youtube.com/@AccompanimentKPB5',
    whatsapp: 'https://wa.me/+2348063770187',
  }
  return (
    <div className='socials-container'>
      <div className='icon'>
        <a
          href={socialLinks.instagram}
          target='_blank'
          rel='noopener noreferrer'
        >
          <IoLogoInstagram />
        </a>
      </div>
      <div className='icon'>
        <a
          href={socialLinks.facebook}
          target='_blank'
          rel='noopener noreferrer'
        >
          <IoLogoFacebook />
        </a>
      </div>
      <div className='icon'>
        <a
          href={socialLinks.linkedin}
          target='_blank'
          rel='noopener noreferrer'
        >
          <RxLinkedinLogo />
        </a>
      </div>
      <div className='icon'>
        <a href={socialLinks.twitter} target='_blank' rel='noopener noreferrer'>
          <Twitterxicon />
        </a>
      </div>
      <div className='icon'>
        <a href={socialLinks.youtube} target='_blank' rel='noopener noreferrer'>
          <IoLogoYoutube />
        </a>
      </div>
      <div className='icon'>
        <a
          href={socialLinks.whatsapp}
          target='_blank'
          rel='noopener noreferrer'
        >
          <RiWhatsappLine />
        </a>
      </div>
    </div>
  )
}

export default Socials
