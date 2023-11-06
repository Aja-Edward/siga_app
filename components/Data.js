import { RxDashboard } from 'react-icons/rx'
import { MdInsights } from 'react-icons/md'
import { RiCouponLine } from 'react-icons/ri'
import { FiUser, FiLogOut } from 'react-icons/fi'
import { AiOutlineMessage } from 'react-icons/ai'
import { ImProfile } from 'react-icons/im'
import { BsWallet2 } from 'react-icons/bs'
import { RiWhatsappLine } from 'react-icons/ri'
import { RiTeamLine } from 'react-icons/ri'
import { SiGnuprivacyguard } from 'react-icons/si'

export const datas = [
  {
    id: 1,
    url: '/',
    icon: <RxDashboard />,
    text: 'Dashboard',
  },
  {
    id: 2,
    url: '/about',
    icon: <MdInsights />,
    text: 'About Us',
  },
  {
    id: 3,
    url: '/about/team/freebie',
    icon: <RiCouponLine />,
    text: 'Freebies',
  },
  {
    id: 4,
    url: 'https://wa.me/+2348063770187?text=Hello%20I%20am%20interested%20in%20your%20services',
    icon: <RiWhatsappLine />,
    text: 'WhatsApp',
  },
  {
    id: 5,
    url: '/me/message',
    icon: <AiOutlineMessage />,
    text: 'Contact Us',
  },
  {
    id: 6,
    url: '/privacy',
    icon: <SiGnuprivacyguard />,
    text: 'Privacy',
  },
  {
    id: 7,
    url: '/me/userprofilepage',
    icon: <ImProfile />,
    text: 'Profile',
  },
  {
    id: 8,
    url: '/about/team',
    icon: <RiTeamLine />,
    text: 'Our Team',
  },
]
