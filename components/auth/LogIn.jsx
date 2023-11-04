'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { parseCallbackUrl } from '@helpers/helpers'
import { TiTimes } from 'react-icons/ti'

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const params = useSearchParams()
  const callBackUrl = params.get('callbackUrl')

  // const { data: session } = useSession()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const data = await signIn('credentials', {
        email,
        password,
        callbackUrl: callBackUrl ? parseCallbackUrl(callBackUrl) : '/',
        redirect: false,
      })
      console.log(data)
      if (data.error) {
        toast.error(error)
      } else {
        toast.success('Login successfully')
        router.push('/')
      }
    } catch (error) {
      // Handle any potential error from the signIn function
      console.error(error)
      toast.error('Invalid Email or Password')
    }
  }
  return (
    <div className='form-container'>
      <div className='times-container'>
        <Link href={'/'} className='times-container-link'>
          <TiTimes />
        </Link>
      </div>
      <div className='form-image'>
        <Image
          src='/assets/images/register_img.png'
          width={400}
          height={400}
          alt='register image'
          className='register-image'
        />
      </div>
      <form onSubmit={submitHandler}>
        <h1>SignIn</h1>
        <input
          type='email'
          name='email'
          placeholder='Enter Your Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          name='password'
          minLength={6}
          placeholder='Enter Your Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit' value='login'>
          Sign In
        </button>{' '}
        <br />
        <span>
          <span>Don't Have An Account? </span>
          <Link href='/register' className='myformlink'>
            Register Account
          </Link>
        </span>
      </form>
    </div>
  )
}

export default Login
