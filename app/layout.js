import '@styles/globals.css'
import { Josefin_Sans } from 'next/font/google'
import Image from 'next/image'
import Nav from '@components/Nav'
import { GlobalContextProvider } from './GlobalContextProvider'
import ContactInfo from '@components/ContactInfo'
import sigalogo from '@public/assets/images/SIGA247logowhite.svg'

const josefin_sans = Josefin_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'SIGA Music Event | Live Performances, Equipment Tutoring & More',
  description:
    'Discover SIGA, the ultimate music event web app offering live performances, expert equipment tutoring, and a vibrant community. ',
  Keywords:
    'SIGA, music event app, live performances, equipment tutoring, music education, community, musician tools',
  Category: 'Music Events | Music Education',
}

export default function RootLayout({ children }) {

  
  return (
    <html lang='en'>
      <body className={josefin_sans.className}>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <div className='main'>
          {/* <div className='gradient' /> */}
        </div>

        <main className='app'>
          <GlobalContextProvider>
            <Nav />
            {children}
          </GlobalContextProvider>
        </main>
        <footer className='footer'>
          <div className='footerdetails'>
            <div className='socialcontactinfo'>
              <ContactInfo />
            </div>
            <div className='companylogo'>
              <Image width={100} height={50} src={sigalogo} alt='Siga logo' />
            </div>
          </div>
          <div style={{ fontSize: '0.7rem', marginTop: '0.7rem' }}>
            Copyright &copy; 2023 SIGA
            <span style={{ color: 'rgb(59, 200, 230)' }}>247</span>. All rights
            reserved
          </div>
        </footer>
      </body>
    </html>
  )
}
